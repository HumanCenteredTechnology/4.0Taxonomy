import React from "react";
import { TextField } from "@material-ui/core";
const TextInput = ({ name, label, value, error = null, onChange }) => {
    return (
        <TextField
            sx={{ width: 400 }}
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            {...(error && { error: true, helperText: error })}
            multiline
            minRows={(name === "title" ? 2 : 0) || (name === "link" ? 2 : 0) || (name === "journal" ? 2 : 0) || (name === "authors" ? 2 : 0) || (name === "doi" ? 2 : 0) || (name === "abstract" ? 4 : 0) }
            />
    );
}
export default TextInput;


