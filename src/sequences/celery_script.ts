[{ "tag": 2, "args": [{ "name": "pin_mode", "allowed_values": ["integer"] }, { "name": "sub_sequence_id", "allowed_values": ["integer"] }, { "name": "lhs", "allowed_values": ["string"] }, { "name": "op", "allowed_values": ["string"] }, { "name": "channel_name", "allowed_values": ["string"] }, { "name": "message_type", "allowed_values": ["string"] }, { "name": "tool_id", "allowed_values": ["integer"] }, { "name": "version", "allowed_values": ["integer"] }, { "name": "x", "allowed_values": ["integer"] }, { "name": "y", "allowed_values": ["integer"] }, { "name": "z", "allowed_values": ["integer"] }, { "name": "speed", "allowed_values": ["integer"] }, { "name": "pin_number", "allowed_values": ["integer"] }, { "name": "pin_value", "allowed_values": ["integer"] }, { "name": "milliseconds", "allowed_values": ["integer"] }, { "name": "rhs", "allowed_values": ["integer"] }, { "name": "data_label", "allowed_values": ["string"] }, { "name": "message", "allowed_values": ["string"] }, { "name": "location", "allowed_values": ["tool", "coordinate"] }, { "name": "offset", "allowed_values": ["coordinate"] }], "nodes": [{ "name": "tool", "allowed_args": ["tool_id"], "allowed_body_types": [] }, { "name": "coordinate", "allowed_args": ["x", "y", "z"], "allowed_body_types": [] }, { "name": "move_absolute", "allowed_args": ["location", "speed", "offset"], "allowed_body_types": [] }, { "name": "move_relative", "allowed_args": ["x", "y", "z", "speed"], "allowed_body_types": [] }, { "name": "write_pin", "allowed_args": ["pin_number", "pin_value", "pin_mode"], "allowed_body_types": [] }, { "name": "read_pin", "allowed_args": ["pin_number", "data_label", "pin_mode"], "allowed_body_types": [] }, { "name": "channel", "allowed_args": ["channel_name"], "allowed_body_types": [] }, { "name": "wait", "allowed_args": ["milliseconds"], "allowed_body_types": [] }, { "name": "send_message", "allowed_args": ["message", "message_type"], "allowed_body_types": ["channel"] }, { "name": "execute", "allowed_args": ["sub_sequence_id"], "allowed_body_types": [] }, { "name": "if_statement", "allowed_args": ["lhs", "op", "rhs", "sub_sequence_id"], "allowed_body_types": [] }, { "name": "sequence", "allowed_args": ["version"], "allowed_body_types": ["move_absolute", "move_relative", "write_pin", "read_pin", "wait", "send_message", "execute", "if_statement"] }] }]