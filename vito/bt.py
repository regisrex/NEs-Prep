import serial  # Import serial library for Bluetooth communication

# Initialize Bluetooth serial communication
bluetooth_port = '/dev/cu.usbmodem141401'  # Replace with your Bluetooth COM port
baud_rate = 9600  # Standard baud rate for Bluetooth modules
bluetooth = None

try:
    bluetooth = serial.Serial(bluetooth_port, baud_rate)
    print(f"Successfully connected to Bluetooth on {bluetooth_port}")
except serial.SerialException as e:
    print(f"Failed to connect to Bluetooth on {bluetooth_port}: {e}")
.