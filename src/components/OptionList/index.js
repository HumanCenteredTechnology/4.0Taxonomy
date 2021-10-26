import React from "react";
import { Checkbox, FormControlLabel, Box } from "@mui/material";


const OptionList = ({ options, selectedOptions, onChange }) => {
    const handleCheckboxClicked = (selectedOptionId) => {
        // is currently selected
        if (selectedOptions[selectedOptionId]) {
            // remove selected key from options list
            delete selectedOptions[selectedOptionId];
        } else { // is not currently selected
            // Add selected key to optionsList
            selectedOptions[selectedOptionId] = {}
        }
        // call onChange function given by parent
        onChange(selectedOptions)

    }
    const handleSubOptionsListChange = (optionId, subSelections) => {
        // add sub selections to current optionId
        selectedOptions[optionId] = subSelections;
        // call onChange function given by parent
        onChange(selectedOptions);

    }
    return (
        <div>
            {options.map(option => (
                <Box>
                    <FormControlLabel
                        label={option.label}
                        control={<Checkbox
                            selected={selectedOptions[option.label]}
                            onChange={() => {
                                handleCheckboxClicked(option.label)
                                console.log(selectedOptions[option.label])
                            }}
                        />}
                    />
                    {/* Base Case */}
                    {(option.subLevels.length > 0 && selectedOptions[option.label]) &&
                        <OptionList
                            options={option.subLevels}
                            selectedOptions={selectedOptions[option.label]}
                            onChange={(subSelections) => handleSubOptionsListChange(option.label, subSelections)}
                        />
                    }
                </Box>
            ))}
        </div>
    )
}

export default OptionList;