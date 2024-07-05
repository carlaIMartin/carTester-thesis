import obd

# Connect to the OBD-II port
port = 'COM5'
connection = obd.OBD(portstr=port, baudrate=38400, protocol=None)

# Check if the connection was successful
if not connection.is_connected():
    print("Failed to connect to the vehicle's OBD-II port")
else:
    # Retrieve the diagnostic trouble codes
    dtc_command = obd.commands.GET_DTC
    dtcs = connection.query(dtc_command)

    # Check if the query returned a valid response
    
    if dtcs.value:
        print("Diagnostic Trouble Codes:")
        for dtc in dtcs.value:
            print(f"Code: {dtc.code}, Description: {dtc.description}")
    else:
        print("No DTCs found")


    # Optionally, you can also retrieve other car parameters here using similar methods
    # For example, to get the current RPM:
    rpm_command = obd.commands.RPM
    rpm = connection.query(rpm_command)
    if rpm.value:
        print(f"Current RPM: {rpm.value}")

# Close the connection
connection.close()
