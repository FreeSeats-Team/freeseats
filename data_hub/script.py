'''
Main Script (Data Hub):

Reads data from GPIO pins, updates workspace state, and pushes data.
This should be running indefinitely on the RPi.
'''

# imports -------------------------------------------------

# communications
import RPi.GPIO as GPIO
import serial
import requests

# data parsing
import json
import time
import schema_checks


# globals -------------------------------------------------

ERROR_STR = "ERROR00000000000"
POLLING_INTERVAL = 0.5  # number of seconds between GPIO polls
UPDATE_INTERVAL = 2    # number of seconds between backend updates
NUM_MSG_PARTS = 3       # number of parts in chair-to-hub message
WORKSPACE_ID = 'labdev_1' # lab development datahub 1

ser = serial.Serial(
    port='/dev/ttyS0',
    baudrate=9600,
    parity=serial.PARITY_NONE,
    stopbits=serial.STOPBITS_ONE,
    bytesize=serial.EIGHTBITS,
    timeout=1
)


# helpers + utils -------------------------------------------------

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

    If a read error occurs (ie. due to bad setup), undefined behavior.
    '''
    x = str(ser.readline(), 'UTF-8').strip()
    if x != '':
        print(x);
    parts = x.split(', ')
    if len(parts) == 1:
        # case of empty read
        return None
    if len(parts) != NUM_MSG_PARTS: 
        print('Num Parts dont match: ', len(parts), 'vs', NUM_MSG_PARTS)
        return None
    status = False
    if parts[1] == 'OCCUPIED':
        status = True
    elif parts[1] == 'EMPTY':
        status = False
    else:
        print('Unknown Status ', parts[1])
        return None
    data = {
        #'workspace_id': parts[0],
        'workspace_id': WORKSPACE_ID,
        'seat': parts[0],
        'old': not status,
        'new': status,
    }
    print('Serial Data:', data)
    return data


def get_time():
    '''
    Gets the current time from the time module and returns the int-cast.
    '''
    seconds = int(time.time())
    return seconds


def format_state(state):
    '''
    Formats locally-saved state for POST request update.
    '''
    seats = []
    for seat in state['seats'].keys():
        formatted_seat = {
            '_id': seat,
            'occupied': state['seats'][seat]
        }
        seats.append(formatted_seat)
    payload = {
        'hub_id': state['workspace_id'],
        'seats': seats
    }
    schema_checks.validate_workspace_data(payload)
    return payload


def send_state(state, url):
    '''
    Sends the current chair state to the backend endpoint.
    The format should be in accordance with the workspace schema json.
    '''
    payload = format_state(state)
    print('Sending state:')
    print(payload)
    res = requests.post(url, json=payload)
    if res.status_code == 400 or res.status_code == 404:
        print(res)
        print(res.content)
        raise Exception("send_state failed to push to", url)


def update_state(state, data, my_id, backend):
    '''
    Validates chair data and updates state to reflect that.
    Returns the updated version of the workspace state.
    '''
    try:
        schema_checks.validate_chair_data(data)
    except:
        print("ERROR: could not validate chair data:")
        print(data)
        return state

    # at this point, we have valid json data from the chair
    new_state = state
    workspace_id = data['workspace_id']
    seat = data['seat']
    old = data['old']
    new = data['new']
    seats = state['seats']
    if workspace_id != my_id:
        print("Mismatched workspace ids ", workspace_id, my_id)
        return state
    if seat in seats and seats[seat] != old:
        print("Warning: chair id " + seat +
              " had a differing status.")
        print("RPi: " + str(seats[seat]) + ", Chair: " + str(old))
    elif seat not in seats:
        print("Note: Adding chair id " +
              seat + " to workspace state")
        payload = {
                'hub_id': my_id,
                'seats': [
                    {
                        '_id': seat,
                        'occupied': new
                    }
                ]
        }
        #res = requests.post(backend, json=payload)
        #if res.status_code == 400:
        #    print(res)
        #    print(res.content)
        #    raise Exception("update_state failed to create new seat ", backend)
    new_state['seats'][seat] = new
    print(new_state)
    return new_state



# main script loop -------------------------------------------------

def main():
    serial_res = get_serial_number()
    #WORKSPACE_ID = serial_res[0]
    #if (WORKSPACE_ID == ERROR_STR):
    #    print("ERROR: could not get RPi serial number")
    #    print(serial_res[1])
    #    return
    print('WORKSPACE_ID ', WORKSPACE_ID)

    # url pointing to web app backend POST endpoint
    BACKEND = 'http://freeseats-a3.herokuapp.com/api/freeseats'

    # register data hub with backend
    register_payload = {
        '_id': WORKSPACE_ID,
        'seats': {}
    }
    #res = requests.post(BACKEND+'/create_hub', json=register_payload)
    #if res.status_code == 400:
    #    print(res)
    #    print(json.dumps(res.json(), indent=4))
    #    raise Exception("Main script failed to register with backend", BACKEND+'/create_hub')

    # list of chair statuses
    state = {
        'workspace_id': WORKSPACE_ID,
        'seats': {}  # NEEDS TO BE CONVERTED IN send_state()
    }

    # time of last backend update
    last_update = get_time()

    print('Setup completed, starting main loop')
    # main loop
    while True:
        # first, sleep for a little bit and check if its time to send an update
        time.sleep(POLLING_INTERVAL)
        curr_time = get_time()
        if (curr_time >= last_update + UPDATE_INTERVAL):
            print('State: ', state)
            #send_state(state, BACKEND+'/update_seats');
            last_update = curr_time

        data = read_serial()  # converted string to json data
        if data != None:
            update_state(state, data, WORKSPACE_ID, BACKEND+'/create_seats');


# execute -------------------------------------------------

main()
