import obd
import pymongo
import datetime
from bson import ObjectId
from obd.utils import bytes_to_int
from obd.protocols import ECU
from obd import OBDCommand
import sys


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

def determineIfError(command):
    if(command == "RPM"):
        return True
    elif (command == "EGR_ERROR"):
        return True
    elif (command == "FUEL_INJECT_TIMING"):
        return True
    else:
        return False

# --------------------DECLARATION OF ALL NEEDED COMMAANDS (TO BE CUSTOM)------------------

catalyst_temp = OBDCommand("CATALYST_TEMP", \
               "CATALYST TEMP", \
               b"0631", \
               4, \
               decoder, \
               ECU.ENGINE, \
               True)

egr_err = OBDCommand("EGR_ERROR", \
               "EGR_ERROR", \
               b"012D", \
               3, \
               decoder, \
               ECU.ENGINE, \
               True)

fuel_inject_timing = OBDCommand("FUEL_INJECT_TIMING", \
               "FUEL_INJECT_TIMING", \
               b"015D", \
               4, \
               decoder, \
               ECU.ENGINE, \
               True)

misfire = OBDCommand("MONITOR_MISFIRE_CYLINDER_2", \
               "MONITOR_MISFIRE_CYLINDER_2", \
               b"06a2", \
               0, \
               decoder, \
               ECU.ENGINE, \
               True)


#print(catalyst_temp)


port = 'COM5'
connection = obd.OBD(portstr=port, baudrate=38400, protocol=None)

#print(connection.query(catalyst_temp, force =True))
#print(connection.query(egr_err, force=True))

# ----------------------------ADDING CUSTOM COMMANDS TO SUPPORTED COMMANDS  ----------------------------
#connection.supported_commands.add(obd.commands.EGR_ERROR)
connection.supported_commands.add(catalyst_temp)
connection.supported_commands.add(egr_err)
connection.supported_commands.add(fuel_inject_timing)
connection.supported_commands.add(obd.commands.MONITOR_MISFIRE_CYLINDER_2)
#connection.supported_commands.add(obd.commands.MONITOR_MISFIRE_CYLINDER_2)


#PRINTING COMMANDS 
#print(query_obd_parameter(egr_err))
print(query_obd_parameter(catalyst_temp))

 ############ --------------------- GATHERING DATA FUNCTIONALITY ----------------- ###############

try:
   
    if connection.is_connected():
        print(f"Connected to {port}")

        # clear_mongodb_collection()

        
        parameters_to_query = [
            obd.commands.SPEED,
            obd.commands.RPM,
            obd.commands.COOLANT_TEMP,
            egr_err,
            #obd.commands.EGR_ERROR,
            #obd.commands.EGR_ERROR,    #SO, IF I DEFINED A COMMAND, THE NEW OLD STARTS WORKING TOO BUT INCORRECTLY 
            #obd.commands.FUEL_INJECT_TIMING,
            fuel_inject_timing,
            obd.commands.MONITOR_HEATED_CATALYST_B1,
            obd.commands.MONITOR_MISFIRE_CYLINDER_2,
            obd.commands.O2_B1S2,
            obd.commands.INTAKE_TEMP
            
        ]

        # ----------------------- ADDING DATA TO DATABASE -----------------------

        # The username field will be called in the future from the user's session (rest api gets the username from the frontend scan button hook)
        for parameter in parameters_to_query:
            response=connection.query(parameter)
            print( findCommandType(parameter.name) )
            if not response.is_null():
                data = {
                        "_id": ObjectId(),  
                        "command": parameter.name,
                        "response_code": response.value.magnitude if isinstance(response.value, obd.Unit.Quantity) else response.value,
                        "description": parameter.desc,
                        "type": findCommandType(parameter.name),
                        #"unit": getattr(parameter, 'units', ''),  
                        "timestamp": datetime.datetime.utcnow(),
                        "problem": determineIfError(parameter.name),
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



