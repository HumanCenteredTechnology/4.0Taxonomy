import React from "react";
import { TextField } from "@material-ui/core";
const TextInput = ({ name, label, value, error = null, onChange }) => {
    return (
        <TextField
            fullWidth
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            {...(error && { error: true, helperText: error })}
        />
    );
}
export default TextInput;

