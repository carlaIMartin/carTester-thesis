import obd
import pymongo
import datetime
from bson import ObjectId
from obd.utils import bytes_to_int
from obd.protocols import ECU
from obd import OBDCommand
from scanFunctions import *

port = 'COM5'
connection = obd.OBD(portstr=port, baudrate=38400, protocol=None)
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


# ----------------------------ADDING CUSTOM COMMANDS TO SUPPORTED COMMANDS  ----------------------------
#connection.supported_commands.add(obd.commands.EGR_ERROR)
connection.supported_commands.add(catalyst_temp)
connection.supported_commands.add(egr_err)
connection.supported_commands.add(fuel_inject_timing)
connection.supported_commands.add(obd.commands.MONITOR_MISFIRE_CYLINDER_2)
#connection.supported_commands.add(obd.commands.MONITOR_MISFIRE_CYLINDER_2)