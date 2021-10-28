import React, { useState, useEffect } from "react";
import { Checkbox, FormControlLabel, Box, MenuItem } from "@mui/material";


const CheckBoxTree = ({ initialNeeds, sendToParent, internalValue }) => {
    const [checkedEl, setCheckedEl] = useState([])
    const [checkedElPlain, setCheckedElPlain] = useState([])

    const flatten = (obj, prefix = '') => {
        return Object.entries(obj).reduce((collector, [key, val]) => {
            const newKeys = [...collector, prefix ? `${key}` : key]
            if (Object.prototype.toString.call(val) === '[object Object]') {
                const newPrefix = prefix ? `${key}` : key
                const otherKeys = flatten(val, newPrefix)
                return [...newKeys, ...otherKeys]
            }
            return newKeys
        }, [])
    }

    useEffect(() => {
        setCheckedElPlain(flatten(checkedEl))

        sendToParent(checkedEl, checkedElPlain)
    }, [checkedEl])
    return (
        <OptionList
            options={initialNeeds}
            onChange={(selectedOptions) => {
                setCheckedEl({
                    ...selectedOptions,
                })
            }}
            selectedOptions={!Object.keys(internalValue).length === 0 ? checkedEl : internalValue} />
    )
}

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
                            }}
                        />}
                    />
                    {/* Base Case */}
                    {(option.subLevels.length > 0 && selectedOptions[option.label]) &&
                        <Box sx={{ marginLeft: 3 }}>
                            <OptionList
                                options={option.subLevels}
                                selectedOptions={selectedOptions[option.label]}
                                onChange={(subSelections) => handleSubOptionsListChange(option.label, subSelections)}
                            />
                        </Box>
                    }
                </Box>
            ))}
        </div>
    )
}

export default CheckBoxTree;