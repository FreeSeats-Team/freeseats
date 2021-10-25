import jsonschema
import pytest
from schema_checks import validate_chair_data, validate_workspace_data


def test_validate_chair_data():
    good_instance = {
        'workspace_id': '1',
        'seat': '18500',
        'old': True,
        'new': False
    }
    bad_id = {
        'workspace_id': '1',
        'seat': 18500,
        'old': True,
        'new': False
    }
    bad_delta = {
        'workspace_id': '1',
        'seat': '18500',
        'old': 1,
        'new': 0
    }

    # nothing should happen
    validate_chair_data(good_instance)

    # bad things should happen
    with pytest.raises(jsonschema.exceptions.ValidationError):
        validate_chair_data(bad_id)

    with pytest.raises(jsonschema.exceptions.ValidationError):
        validate_chair_data(bad_delta)


def test_validate_workspace_data():
    good_instance = {
        'workspace_id': '1',
        'seats': [
            {
                'seat': '18500',
                'occupied': False
            },
            {
                'seat': '18501',
                'occupied': True
            },
        ]
    }
    bad_id = {
        'workspace_id': 1,
        'seats': [
            {
                'seat': '18500',
                'occupied': False
            },
            {
                'seats': '18501',
                'occupied': True
            },
        ]
    }
    bad_state = {
        'workspace_id': '1',
        'seats': [
            {
                'seat': '18500',
            },
            {
                'seat': '18501',
                'occupied': True
            },
        ]
    }

    # nothing should happen
    validate_workspace_data(good_instance)

    # bad things should happen
    with pytest.raises(jsonschema.exceptions.ValidationError):
        validate_workspace_data(bad_id)

    with pytest.raises(jsonschema.exceptions.ValidationError):
        validate_workspace_data(bad_state)
