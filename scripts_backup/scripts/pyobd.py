import obd

def query_obd_parameter(parameter):
    try:
        response = connection.query(parameter)
        if response.is_null():
            return f"{parameter.name}: No data"
        return f"{parameter.name}: {response.value}"
    except Exception as e:
        return f"Error querying {parameter.name}: {e}"

# Replace 'COM3' with the actual communication port used by your ELM327 emulator
port = 'COM4'
baudrate = 38400  # Replace with the configured baud rate

try:
    connection = obd.OBD(portstr=port, baudrate=baudrate, protocol=None)
    if connection.is_connected():
        print(f"Connected to {port} at {baudrate} baud")

        # Query and print some OBD-II parameters
        parameters_to_query = [
            obd.commands.SPEED,
            obd.commands.RPM,
            obd.commands.COOLANT_TEMP,
        ]

        for parameter in parameters_to_query:
            print(query_obd_parameter(parameter))

        # Disconnect from the OBD-II interface
        connection.close()

    else:
        print(f"Failed to connect to {port}")
except Exception as e:
    print(f"Error: {e}")
