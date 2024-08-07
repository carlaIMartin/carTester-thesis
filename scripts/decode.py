import obd 
from obd import OBDCommand, Unit
from obd.protocols import ECU
from obd.utils import bytes_to_int


# WORKSSSSSSS
def rpm(messages):
    """ decoder for RPM messages """
    d = messages[0].data 
    d = d[2:] 
    v = bytes_to_int(d) / 4.0  
    return v  

c = OBDCommand("RPM", \
               "RPM", \
               b"010C", \
               4, \
               rpm, \
               ECU.ENGINE, \
               True)

print(c)

port = 'COM4'
connection = obd.OBD(portstr=port, baudrate=38400, protocol=None)

print(connection.query(c, force =True))

print(obd.commands.FUEL_STATUS)