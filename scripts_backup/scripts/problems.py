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
    
    
    else:
        return False
    