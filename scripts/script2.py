import obd

# Replace 'COMX' with the actual communication port used by your ELM327 emulator
port = 'COM4'
connection = obd.OBD(portstr=port, baudrate=38400, protocol=None)

# Custom PID
custom_pid = "012D"

# Query the value of the custom PID
response = connection.query(obd.custom(custom_pid))
print(f"PID {custom_pid} value:", response.value)

if connection.is_connected():
    print(f"Connected to {port}")
else:
    print(f"Failed to connect to {port}")
    exit()
