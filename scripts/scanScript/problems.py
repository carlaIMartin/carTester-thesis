import obd
import pymongo
import datetime
from bson import ObjectId
from obd.utils import bytes_to_int
from obd.protocols import ECU
from obd import OBDCommand
import sys

def determineIfError(command, responseValue):
    
    if command == "RPM" and responseValue == 0:
        return True
    elif command == "EGR_ERROR" and responseValue >= 27.0:
        return True
    elif command == "FUEL_INJECT_TIMING" and responseValue > 2000:
        return True
    elif (command == "MONITOR_HEATED_CATALYST_B1") and responseValue == 0:
        return True
    elif (command == "MONITOR_MISFIRE_CYLINDER_2"):
        return True
    elif ( command == "ENGINE_LOAD" and responseValue < 80):
        return True
    elif (command=="COOLANT_TEMP" and responseValue < 195):
        return True 
    # elif (command == "SHORT_FUEL_TRIM_1" and responseValue >= 10 or responseValue <= -10):
    #     return True
    # elif (command == "LONG_FUEL_TRIM_1" and responseValue > 10 or responseValue <= -10):
    #     return True
    # elif (command == "SHORT_FUEL_TRIM_2" and responseValue >= 10 or responseValue <= -10):
    #     return True
    # elif (command == "LONG_FUEL_TRIM_2" and responseValue > 10 or responseValue <= -10):
        # return True
    elif command == "FUEL_PRESSURE" and responseValue < 30000:
        return True
    elif command == "INTAKE_PRESSURE" and responseValue < 100:
        return True
    elif(command == "RPM" and responseValue > 6000):
        return True
    elif(command == "TIMING_ADVANCE" and responseValue < 5 and responseValue > 20):
        return True      
    if command == "INTAKE_TEMP" and -40 <= responseValue <= 125:
        return True
    elif command == "MAF" and 0 <= responseValue <= 200:
        return True
    elif command == "THROTTLE_POS" and 0 <= responseValue <= 100:
        return True
    elif command == "RUN_TIME" and 0 <= responseValue <= 86400:  
        return True
    elif command == "DISTANCE_SINCE_DTC_CLEAR" and 0 <= responseValue <= 65535:
        return True
    elif command == "evapVaporPressure" and -8 <= responseValue <= 10:
        return True
    elif command == "BAROMETRIC_PRESSURE" and 80 <= responseValue <= 120:  
        return True
    elif command == "O2_S1_WR_CURRENT" and -2 <= responseValue <= 2:  
        return True
    elif command == "CATALYST_TEMP_B1S1" and 200 <= responseValue <= 900: 
        return True
    elif command == "PIDS_C" and 0 <= responseValue <= 255:
        return True
    elif command == "CONTROL_MODULE_VOLTAGE" and 9 <= responseValue <= 16: 
        return True
    elif command == "ABSOLUTE_LOAD" and 0 <= responseValue <= 100:
        return True
    elif command == "COMMANDED_EQUIV_RATIO" and 0.8 <= responseValue <= 1.2:
        return True
    elif command == "RELATIVE_THROTTLE_POS" and 0 <= responseValue <= 100:
        return True
    elif command == "THROTTLE_ACTUATOR" and 0 <= responseValue <= 100:
        return True
    elif command == "TIME_SINCE_DTC_CLEARED" and 0 <= responseValue <= 65535:
        return True
    elif command == "FUEL_INJECT_TIMING" and -360 <= responseValue <= 360:  
        return True
    elif command == "egr_err" and -100 <= responseValue <= 100:  
        return True
    elif command == "heatedCatatlyst" and 0 <= responseValue <= 900:  
        return True
    elif command == "intakePressure" and 20 <= responseValue <= 250: 
        return True
    elif command == "DISTANCE_W_MIL" and 0 <= responseValue <= 65535:
        return True
    elif command == "FUEL_RAIL_PRESSURE_VAC" and 0 <= responseValue <= 4000: 
        return True
    elif command == "fuelRailPressureDirect" and 0 <= responseValue <= 25000:  
        return True
    elif command == "o2_b1s1" and 0 <= responseValue <= 1:  
        return True
    elif command == "o2_b1s2" and 0 <= responseValue <= 1:  
        return True
    elif command == "o2_b1s3" and 0 <= responseValue <= 1:  
        return True
    elif command == "o2_b1s4" and 0 <= responseValue <= 1:  
        return True
    elif command == "o2_b2s1" and 0 <= responseValue <= 1:  
        return True
    elif command == "o2_b2s2" and 0 <= responseValue <= 1:  
        return True
    elif command == "o2_b2s3" and 0 <= responseValue <= 1:  
        return True
    elif command == "o2_b2s4" and 0 <= responseValue <= 1:  
        return True
    elif command == "COMMANDED_EGR" and 0 <= responseValue <= 100:  
        return True
    elif command == "EVAPORATIVE_PURGE" and 0 <= responseValue <= 100:  
        return True
    elif command == "ambientAirTemp" and -40 <= responseValue <= 50:  
        return True
    elif command == "acceleratorPosB" and 0 <= responseValue <= 100:  
        return True
    elif command == "acceleratorPosD" and 0 <= responseValue <= 100:  
        return True
    elif command == "acceleratorPosE" and 0 <= responseValue <= 100:  
        return True
    elif command == "RUN_TIME_MIL" and 0 <= responseValue <= 86400:  
        return True
     
    else:
        return False
    