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
import time
import schema_checks


# helpers + utils

def get_serial_number():
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
    except Exception as e:
        cpu_serial = ERROR_STR
        return (cpu_serial, e)
    return (cpu_serial, None)


def read_serial():
    '''
    Reads serial input using the RPi's GPIO library.
    Returns the data read from gpio pins if any (and converts it to json).
    Otherwise, returns None.

    If a read error occurs (ie. due to bad setup), throws an exception.
    '''
    # TODO: Implement me (will need to use serial and josn.loads)
    pass


def get_time():
    '''
    Gets the current time from the time module and returns the int-cast.
    '''
    return int(time.time())


# globals
ERROR_STR = "ERROR00000000000"
POLLING_INTERVAL = 0.1  # number of seconds between GPIO polls
UPDATE_INTERVAL = 15    # number of seconds between backend updates

# main script loop


def main():
    serial_res = get_serial_number()
    if (serial_res[0] == ERROR_STR):
        print("ERROR: could not get RPi serial number")
        print(serial_res[1])
        return
    WORKSPACE_ID = int(serial_res[0])

    # url pointing to web app backend POST endpoint
    BACKEND = 'http://localhost:8000'  # TODO: replace with real url

    # list of chair statuses
    chairs = {}

    # time of last backend update
    last_update = get_time()

    # main loop
    while True:
        # first, sleep for a little bit and check if its time to send an update
        time.sleep(POLLING_INTERVAL)
        curr_time = get_time()
        if (curr_time >= last_update + UPDATE_INTERVAL):
            # TODO: push to backend url
            last_update = curr_time

        data = read_serial()  # converted string to json data
        if data == None:
            continue
        try:
            schema_checks.validate_chair_data(data)
        except:
            print("ERROR: could not validate chair data:")
            print(data)
            continue

        # at this point, we have valid json data from the chair
        workspace_id = data['workspace_id']
        chair_id = data['chair_id']
        old = data['old']
        new = data['new']
        if workspace_id == WORKSPACE_ID:
            continue
        if chair_id in chairs and chairs[chair_id] != old:
            print("Warning: chair id " + chair_id + " had a differing status.")
            print("RPi: " + chairs[chair_id] + ", Chair: " + old)
        elif chair_id not in chairs:
            print("Note: Adding chair id " + chair_id + " to workspace state")
        chairs[chair_id] = new


main()
