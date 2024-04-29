import obd
import pymongo
import datetime
from bson import ObjectId
from obd.utils import bytes_to_int
from obd.protocols import ECU
from obd import OBDCommand
import sys

def decoder(messages):
    """ decoder for RPM messages """
    d = messages[0].data 
    d = d[2:] 
    v = bytes_to_int(d) / 4.0  
    return v  

def defineCommands() :
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

    o2_b1s1 = OBDCommand("O2_B1S1", \
                    "O2 B1S1", \
                    b"013C", \
                    2, \
                    decoder, \
                    ECU.ENGINE, \
                    True)
    o2_b1s2 = OBDCommand("O2_B1S2", \
                    "O2 B1S2", \
                    b"013D", \
                    2, \
                    decoder, \
                    ECU.ENGINE, \
                    True)

    o2_b1s3 = OBDCommand("O2_B1S3", \
                    "O2 B1S3", \
                    b"013E", \
                    2, \
                    decoder, \
                    ECU.ENGINE, \
                    True)
    o2_b1s4 = OBDCommand("O2_B1S4", \
                    "O2 B1S4", \
                    b"013F", \
                    2, \
                    decoder, \
                    ECU.ENGINE, \
                    True)
    o2_b2s1 = OBDCommand("O2_B2S1", \
                    "O2 B2S1", \
                    b"0140", \
                    2, \
                    decoder, \
                    ECU.ENGINE, \
                    True)
    o2_b2s2 = OBDCommand("O2_B2S2", \
                    "O2 B2S2", \
                    b"0141", \
                    2, \
                    decoder, \
                    ECU.ENGINE, \
                    True)
    o2_b2s3 = OBDCommand("O2_B2S3", \
                    "O2 B2S3", \
                    b"0142", \
                    2, \
                    decoder, \
                    ECU.ENGINE, \
                    True)
    o2_b2s4 = OBDCommand("O2_B2S4", \
                    "O2 B2S4", \
                    b"0143", \
                    2, \
                    decoder, \
                    ECU.ENGINE, \
                    True)

    evapVaporPressure = OBDCommand("EVAP_VAPOR_PRESSURE", \
                    "EVAP VAPOR PRESSURE", \
                    b"013D", \
                    2, \
                    decoder, \
                    ECU.ENGINE, \
                    True)

    ambientAirTemp = OBDCommand("AMBIANT_AIR_TEMP", \
                    "AMBIANT AIR TEMP", \
                    b"0146", \
                    1, \
                    decoder, \
                    ECU.ENGINE, \
                    True)

    acceleratorPosB = OBDCommand("ACCELERATOR_POS_B", \
                    "ACCELERATOR POS B", \
                    b"0148", \
                    1, \
                    decoder, \
                    ECU.ENGINE, \
                    True)

    acceleratorPosD = OBDCommand("ACCELERATOR_POS_D", \
                    "ACCELERATOR POS D", \
                    b"0149", \
                    1, \
                    decoder, \
                    ECU.ENGINE, \
                    True)

    acceleratorPosE = OBDCommand("ACCELERATOR_POS_E", \
                    "ACCELERATOR POS E", \
                    b"014A", \
                    1, \
                    decoder, \
                    ECU.ENGINE, \
                    True)
    
    
    parameters_to_query = [
            
            #obd.commands.EGR_ERROR,
            #obd.commands.EGR_ERROR,    #SO, IF I DEFINED A COMMAND, THE NEW OLD STARTS WORKING TOO BUT INCORRECTLY 
            #obd.commands.FUEL_INJECT_TIMING,
            # fuel_inject_timing,
            obd.commands.MONITOR_MISFIRE_CYLINDER_2,
            obd.commands.ENGINE_LOAD,
            obd.commands.COOLANT_TEMP,
            obd.commands.SHORT_FUEL_TRIM_1,
            obd.commands.LONG_FUEL_TRIM_1,
            shortFuelTrim2,
            longFuelTrim2,
            #obd.commands.FUEL_PRESSURE,
            fuelPressure,
            #obd.commands.INTAKE_PRESSURE,
            obd.commands.RPM,
            obd.commands.SPEED,
            obd.commands.TIMING_ADVANCE,
            obd.commands.INTAKE_TEMP,
            obd.commands.MAF,
            obd.commands.THROTTLE_POS,
            obd.commands.RUN_TIME,
            #obd.commands.FUEL_RAIL_PRESSURE_DIRECT,
            #obd.commands.EGR_ERROR,
            #obd.commands.COMMANDED_EVAPORATIVE_PURGE,
            
            #obd.commands.COMMANDED_THROTTLE,
            obd.commands.DISTANCE_SINCE_DTC_CLEAR,
            # obd.commands.EVAP_VAPOR_PRESSURE,
            evapVaporPressure,
            obd.commands.BAROMETRIC_PRESSURE,
            obd.commands.O2_S1_WR_CURRENT,
            obd.commands.CATALYST_TEMP_B1S1,
            obd.commands.PIDS_C,
            obd.commands.CONTROL_MODULE_VOLTAGE,
            obd.commands.ABSOLUTE_LOAD,
            obd.commands.COMMANDED_EQUIV_RATIO,
            obd.commands.RELATIVE_THROTTLE_POS,
            obd.commands.THROTTLE_ACTUATOR,
            obd.commands.TIME_SINCE_DTC_CLEARED,
            obd.commands.FUEL_INJECT_TIMING,
            egr_err,
            heatedCatatlyst,
            intakePressure,
            obd.commands.DISTANCE_W_MIL,
            obd.commands.FUEL_RAIL_PRESSURE_VAC,
            fuelRailPressureDirect,
            # obd.commands.O2_B1S1,
            o2_b1s1,
            # obd.commands.O2_B1S2,
            o2_b1s2,
            # obd.commands.O2_B1S3,
            o2_b1s3,
            # obd.commands.O2_B1S4,
            o2_b1s4,
            # obd.commands.O2_B2S1,
            o2_b2s1,
            # obd.commands.O2_B2S2,
            o2_b2s2,
            # obd.commands.O2_B2S3,
            o2_b2s3,
            # obd.commands.O2_B2S4,
            o2_b2s4,
            # obd.commands.FUEL_RAIL_PRESSURE_VAC,
            obd.commands.COMMANDED_EGR,
            obd.commands.EVAPORATIVE_PURGE,
            # obd.commands.AMBIANT_AIR_TEMP,
            ambientAirTemp,
            # obd.commands.THROTTLE_POS_B,
            acceleratorPosB,
            # obd.commands.ACCELERATOR_POS_D,
            acceleratorPosD,
            # obd.commands.ACCELERATOR_POS_E,
            acceleratorPosE,
            obd.commands.RUN_TIME_MIL,

    ]

    return parameters_to_query


