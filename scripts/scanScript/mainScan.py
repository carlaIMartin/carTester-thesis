import obd
import pymongo
import datetime
from bson import ObjectId
from obd.utils import bytes_to_int
from obd.protocols import ECU
from obd import OBDCommand
import sys
from problems import determineIfError
from commands import defineCommands


# WORKSSSSSSS

# ------------------------ MONGODB -------------------------

# DATABASE INITIALIZATION + FUNCTION TO ADD IN DB 

client = pymongo.MongoClient("mongodb+srv://martincarla05:root@cardoctor.cbn2jcl.mongodb.net/")
db = client["ecu_codes"]
collection = db["codes"]

# Function - inserting the data into MongoDB

def insert_into_mongodb(data):
    try:
        result = collection.insert_one(data)
        print(f"Inserted document with ID: {result.inserted_id}")
    except Exception as e:
        print(f"Error inserting data into MongoDB: {e}")

# Function - clear the collection every time we run the script

def clear_mongodb_collection():
    try:
        result = collection.delete_many({})
        print(f"Cleared {result.deleted_count} documents from the collection.")
    except Exception as e:
        print(f"Error clearing MongoDB collection: {e}")




# ---------------------------- OBD FUNCTIONS --------------------------------

#FUNCTION TO DECODE THE HEX ERROR CODES 

def decoder(messages):
    """ decoder for RPM messages """
    d = messages[0].data 
    d = d[2:] 
    v = bytes_to_int(d) / 4.0  
    return v  

# FUNCTION TO QUERY WORKING QUERIES 

def query_obd_parameter(parameter):
    try:
        response = connection.query(parameter)
        if response.is_null():
            return f"{parameter.name}: No data"
        return f"{parameter.name}: {response.value}"    
    except Exception as e:
        return f"Error querying {parameter.name}: {e}"


# FUNCTION TO FIND THE COMMAND TYPE

def findCommandType(command):
    if(command == "SPEED" or command == "FUEL_INJECT_TIMING"  or command == "O2_B1S2"):
        command_type="Cluster"
    elif(command == "RPM"):
        command_type="Sensors"
    elif(command == "EGR_ERROR" or command == "COOLANT_TEMP" or command == "MONITOR_HEATED_CATALYST_B1" or command == "MONITOR_MISFIRE_CYLINDER_2"):
        command_type="ECU"
    elif(command == "INTAKE_TEMP"):
        command_type="Engine"
    else:
        command_type="Unknown"
    return command_type


    


port = 'COM5'
connection = obd.OBD(portstr=port, baudrate=38400, protocol=None)

 ############ --------------------- GATHERING DATA FUNCTIONALITY ----------------- ###############

try:
   
    if connection.is_connected():
        print(f"Connected to {port}")

        # clear_mongodb_collection()

        
        parameters_to_query=defineCommands()

        for parameter in parameters_to_query:
            connection.supported_commands.add(parameter)


        # ----------------------- ADDING DATA TO DATABASE -----------------------

        # The username field will be called in the future from the user's session (rest api gets the username from the frontend scan button hook)
        for parameter in parameters_to_query:
            response=connection.query(parameter)
            print( findCommandType(parameter.name) )
            responseValue = response.value.magnitude if isinstance(response.value, obd.Unit.Quantity) else response.value

            if not response.is_null():
                data = {
                        "_id": ObjectId(),  
                        "command": parameter.name,
                        "response_code": responseValue,
                        "description": parameter.desc,
                        "type": findCommandType(parameter.name),
                        #"unit": getattr(parameter, 'units', ''),  
                        "timestamp": datetime.datetime.utcnow(),
                        "problem": determineIfError(parameter.name, responseValue),
                        "username": sys.argv[1]
                    }
                insert_into_mongodb(data)
                


        #NOW IF I MODIFY FROM PYTHON THE RESPONSE IT GETS NO DATA HERE 

        for parameter in parameters_to_query:
            print(query_obd_parameter(parameter))

        
        connection.close()

    else:
        print(f"Failed to connect to {port}")
except Exception as e:
    print(f"Error: {e}")



