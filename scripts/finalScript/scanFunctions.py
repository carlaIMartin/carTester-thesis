import obd
import pymongo
import datetime
from bson import ObjectId
from obd.utils import bytes_to_int
from obd.protocols import ECU
from obd import OBDCommand



# Function - inserting the data into MongoDB


def insert_into_mongodb(data, collection):
    try:
        result = collection.insert_one(data)
        print(f"Inserted document with ID: {result.inserted_id}")
    except Exception as e:
        print(f"Error inserting data into MongoDB: {e}")

# Function - clear the collection every time we run the script

def clear_mongodb_collection(collection):
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
    decoder = v
    return decoder  



# FUNCTION TO QUERY WORKING QUERIES 

def query_obd_parameter(parameter, connection):
    try:
        response = connection.query(parameter)
        if response.is_null():
            return f"{parameter.name}: No data"
        return f"{parameter.name}: {response.value}"    
    except Exception as e:
        return f"Error querying {parameter.name}: {e}"


# FUNCTION TO FIND THE COMMAND TYPE

def findCommandType(command):
    if(command == "SPEED" or command == "COOLANT_TEMP" or command == "INTAKE_TEMP" or command == "O2_B1S2"):
        command_type="mech"
    elif(command == "RPM"):
        command_type="Sensors"
    elif(command == "EGR_ERROR" or command == "FUEL_INJECT_TIMING" or command == "MONITOR_HEATED_CATALYST_B1" or command == "MONITOR_MISFIRE_CYLINDER_2"):
        command_type="ECU"
    else:
        command_type="Unknown"
    return command_type