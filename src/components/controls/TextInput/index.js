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
            multiline
            minRows={(name === "abstract" ? 4 : 0) || (name === "body" ? 6 : 0)}
        />
    );
}
export default TextInput;

