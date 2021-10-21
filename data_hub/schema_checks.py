'''
Check Schemas:
Functions to validate json input against defined schemas.
Primarily used by the Data Hub (RPi) to check data I/O.
'''

import json
from jsonschema import validate

chair_f = open('../models/chair.schema')
chair_schema = json.load(chair_f)
chair_f.close()

workspace_f = open('../models/workspace.schema')
workspace_schema = json.load(workspace_f)
workspace_f.close()


def validate_chair_data(instance):
    '''
    Validates given json against the defined chair data schema.
    See freeseats/models/chair.schema for details.

    @arg instance (dict) json data to validate

    Will do nothing on successful validation (no-op).
    Will throw jsonschema.exceptions.ValidationError on fail.

    This function should be used in a try-except block.
    '''
    validate(instance, chair_schema)


def validate_workspace_data(instance):
    '''
    Validates given json against the defined workspace data schema.
    See freeseats/models/workspace.schema for details.

    @arg instance (dict) json data to validate

    Will do nothing on successful validation (no-op).
    Will throw jsonschema.exceptions.ValidationError on fail.

    This function should be used in a try-except block.
    '''
    validate(instance, workspace_schema)
