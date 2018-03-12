import serial
import requests

ser = serial.Serial('/dev/ttyUSB0',9600,timeout=None) 
url =  "http://153.126.189.254/lux/insertdata"

while True:
  line = ser.readline()
  lux = line.strip().decode('utf-8')
  requests.get(url + "?lux=" + lux);
ser.close()   
