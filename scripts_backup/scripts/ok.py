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


heatedCatatlyst = OBDCommand("MONITOR_HEATED_CATALYST_B1", \
                "MONITOR_HEATED_CATALYST_B1", \
                b"06a0", \
                0, \
                decoder, \
                ECU.ENGINE, \
                True)

shortFuelTrim2 = OBDCommand("SHORT_FUEL_TRIM_2", \
               "SHORT TERM FUEL TRIM 2", \
               b"0108", \
               1, \
               decoder, \
               ECU.ENGINE, \
               True)

longFuelTrim2 = OBDCommand("LONG_FUEL_TRIM_2", \
                "LONG TERM FUEL TRIM 2", \
                b"0109", \
                1, \
                decoder, \
                ECU.ENGINE, \
                True)

fuelPressure = OBDCommand("FUEL_PRESSURE", \
                "FUEL PRESSURE", \
                b"010A", \
                1, \
                decoder, \
                ECU.ENGINE, \
                True)

intakePressure = OBDCommand("INTAKE_PRESSURE", \
                "INTAKE PRESSURE", \
                b"010B", \
                1, \
                decoder, \
                ECU.ENGINE, \
                True)

fuelRailPressureDirect = OBDCommand("FUEL_RAIL_PRESSURE_DIRECT", \
                "FUEL RAIL PRESSURE DIRECT", \
                b"0122", \
                2, \
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
connection.supported_commands.add(heatedCatatlyst)
connection.supported_commands.add(shortFuelTrim2)
connection.supported_commands.add(longFuelTrim2)
connection.supported_commands.add(fuelPressure)
connection.supported_commands.add(intakePressure)
connection.supported_commands.add(fuelRailPressureDirect)
#connection.supported_commands.add(obd.commands.MONITOR_MISFIRE_CYLINDER_2)


print(query_obd_parameter(shortFuelTrim2))

#PRINTING COMMANDS 
#print(query_obd_parameter(egr_err))
print(query_obd_parameter(catalyst_temp))



 ############ --------------------- GATHERING DATA FUNCTIONALITY ----------------- ###############

try:
   
    if connection.is_connected():
        print(f"Connected to {port}")

        # clear_mongodb_collection()

        
        parameters_to_query = [
            
            
            egr_err,
            #obd.commands.EGR_ERROR,
            #obd.commands.EGR_ERROR,    #SO, IF I DEFINED A COMMAND, THE NEW OLD STARTS WORKING TOO BUT INCORRECTLY 
            #obd.commands.FUEL_INJECT_TIMING,
            fuel_inject_timing,
            heatedCatatlyst,
            obd.commands.MONITOR_MISFIRE_CYLINDER_2,

            obd.commands.FUEL_STATUS,
            obd.commands.ENGINE_LOAD,
            obd.commands.COOLANT_TEMP,
            obd.commands.SHORT_FUEL_TRIM_1,
            obd.commands.LONG_FUEL_TRIM_1,
            shortFuelTrim2,
            longFuelTrim2,
            #obd.commands.FUEL_PRESSURE,
            fuelPressure,
            #obd.commands.INTAKE_PRESSURE,
            intakePressure,
            obd.commands.RPM,
            obd.commands.SPEED,
            obd.commands.TIMING_ADVANCE,
            obd.commands.INTAKE_TEMP,
            obd.commands.MAF,
            obd.commands.THROTTLE_POS,
            obd.commands.RUN_TIME,
            obd.commands.DISTANCE_W_MIL,
            obd.commands.FUEL_RAIL_PRESSURE_VAC,
            #obd.commands.FUEL_RAIL_PRESSURE_DIRECT,
            fuelRailPressureDirect,
            obd.commands.O2_B1S1,
            obd.commands.O2_B1S2,
            obd.commands.O2_B1S3,
            obd.commands.O2_B1S4,
            obd.commands.O2_B2S1,
            obd.commands.O2_B2S2,
            obd.commands.O2_B2S3,
            obd.commands.O2_B2S4,
            obd.commands.OBD_COMPLIANCE,
            obd.commands.O2_SENSORS,
            obd.commands.FUEL_RAIL_PRESSURE_VAC,
            obd.commands.FUEL_RAIL_PRESSURE_DIRECT,
            obd.commands.COMMANDED_EGR,
            #obd.commands.EGR_ERROR,
            #obd.commands.COMMANDED_EVAPORATIVE_PURGE,
            obd.commands.EVAPORATIVE_PURGE,
            #obd.commands.COMMANDED_THROTTLE,
            obd.commands.DISTANCE_SINCE_DTC_CLEAR,
            obd.commands.EVAP_VAPOR_PRESSURE,
            obd.commands.BAROMETRIC_PRESSURE,
            obd.commands.O2_S1_WR_CURRENT,
            obd.commands.CATALYST_TEMP_B1S1,
            obd.commands.PIDS_C,
            obd.commands.CONTROL_MODULE_VOLTAGE,
            obd.commands.ABSOLUTE_LOAD,
            obd.commands.COMMANDED_EQUIV_RATIO,
            obd.commands.RELATIVE_THROTTLE_POS,
            obd.commands.AMBIANT_AIR_TEMP,
            obd.commands.THROTTLE_POS_B,
            obd.commands.ACCELERATOR_POS_D,
            obd.commands.ACCELERATOR_POS_E,
            obd.commands.THROTTLE_ACTUATOR,
            obd.commands.RUN_TIME_MIL,
            obd.commands.TIME_SINCE_DTC_CLEARED,
            obd.commands.FUEL_TYPE,
            obd.commands.FUEL_INJECT_TIMING
            
            
            # for command in commands:
            #     obd.commands.command




            
        ]

        # parameters_to_query=[]

        # commands = [ FUEL_STATUS, ENGINE_LOAD, COOLANT_TEMP, SHORT_FUEL_TRIM_1, LONG_FUEL_TRIM_1, SHORT_FUEL_TRIM_2, LONG_FUEL_TRIM_2, FUEL_PRESSURE, INTAKE_PRESSURE, RPM, SPEED, TIMING_ADVANCE, INTAKE_TEMP, MAF, THROTTLE_POS, AIR_STATUS, O2_SENSORS, O2_B1S1, O2_B1S2, O2_B1S3, O2_B1S4, O2_B2S1, O2_B2S2, O2_B2S3, O2_B2S4, OBD_COMPLIANCE, O2_SENSORS_ALT, AUX_INPUT_STATUS, RUN_TIME, PIDS_B, DISTANCE_W_MIL, FUEL_RAIL_PRESSURE_VAC, FUEL_RAIL_PRESSURE_DIRECT, O2_S1_WR_VOLTAGE, O2_S2_WR_VOLTAGE, O2_S3_WR_VOLTAGE, O2_S4_WR_VOLTAGE, O2_S5_WR_VOLTAGE, O2_S6_WR_VOLTAGE, O2_S7_WR_VOLTAGE, O2_S8_WR_VOLTAGE, COMMANDED_EGR, EGR_ERROR, EVAPORATIVE_PURGE, FUEL_LEVEL, WARMUPS_SINCE_DTC_CLEAR, DISTANCE_SINCE_DTC_CLEAR, EVAP_VAPOR_PRESSURE, BAROMETRIC_PRESSURE, O2_S1_WR_CURRENT, O2_S2_WR_CURRENT, O2_S3_WR_CURRENT, O2_S4_WR_CURRENT, O2_S5_WR_CURRENT, O2_S6_WR_CURRENT, O2_S7_WR_CURRENT, O2_S8_WR_CURRENT, CATALYST_TEMP_B1S1, CATALYST_TEMP_B2S1, CATALYST_TEMP_B1S2, CATALYST_TEMP_B2S2, PIDS_C, STATUS_DRIVE_CYCLE, CONTROL_MODULE_VOLTAGE, ABSOLUTE_LOAD, COMMANDED_EQUIV_RATIO, RELATIVE_THROTTLE_POS, AMBIANT_AIR_TEMP, THROTTLE_POS_B, THROTTLE_POS_C, ACCELERATOR_POS_D, ACCELERATOR_POS_E, ACCELERATOR_POS_F, THROTTLE_ACTUATOR, RUN_TIME_MIL, TIME_SINCE_DTC_CLEARED, unsupported, MAX_MAF, FUEL_TYPE, ETHANOL_PERCENT, EVAP_VAPOR_PRESSURE_ABS, EVAP_VAPOR_PRESSURE_ALT, SHORT_O2_TRIM_B1, LONG_O2_TRIM_B1, SHORT_O2_TRIM_B2, LONG_O2_TRIM_B2, FUEL_RAIL_PRESSURE_ABS, RELATIVE_ACCEL_POS, HYBRID_BATTERY_REMAINING, OIL_TEMP, FUEL_INJECT_TIMING, FUEL_RATE]

        # for command in commands:
        #         parameters_to_query.append(obd.commands.command)


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



