'''
Main Script (Data Hub):

Reads data from GPIO pins, updates workspace state, and pushes data.
This should be running indefinitely on the RPi.
'''

# imports

# communications
# TODO: Uncomment for RPi
# import RPI.GPIO as GPIO
# import requests

# data parsing
import json
import schema_checks


# helpers + utils

def get_serial():
  '''
  Get the current RPi's unique 16bit serial number.
  https://www.raspberrypi-spy.co.uk/2012/09/getting-your-raspberry-pi-serial-number-using-python/
  '''
  cpu_serial = "0000000000000000"
  try:
    f = open('/proc/cpuinfo', 'r')
    for line in f:
      if line[0:6] == 'Serial':
        cpu_serial = line[10:26]
    f.close()
  except:
    cpu_serial = "ERROR00000000000"
  return cpu_serial


# globals

# use RPi's unique serial number as workspace ID
WORKSPACE_STR = get_serial()

# url pointing to web app backend POST endpoint
BACKEND = 'http://localhost:8000' # TODO: replace with real url

# list of chair statuses
chairs = {}


# main script loop

def main():
  while True:
    pass

main()