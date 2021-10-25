import pytest
from schema_checks import validate_chair_data

import script

TEST_ID = '1'

start_state = {
    'workspace_id': TEST_ID,
    'seats': {
        '18500': False
    }
}


def test_script():
    # Creating a new chair
    chair_data = {
        'workspace_id': TEST_ID,
        'seat': '18501',
        'old': False,
        'new': True
    }
    new_state = {
        'workspace_id': TEST_ID,
        'seats': {
            '18500': False,
            '18501': True
        }
    }
    validate_chair_data(chair_data)
    actual_state = script.update_state(start_state, chair_data, TEST_ID)
    assert(new_state == actual_state)
