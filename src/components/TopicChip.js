import React from 'react'
import { Chip, } from '@material-ui/core'

const TopicChip = ({ name, label }) => {

    return (
        <Chip
            label={label}
            color={name === "Problems" ? "secondary" : "primary" || "default"}
            clickable
        />
    )
}
export default TopicChip
