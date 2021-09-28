import React from 'react'
import { Chip, } from '@material-ui/core'

const TopicChip = ({ name, label, variant, size }) => {
    return (
        <Chip
            label={label}
            color={name === "Problems" ? "secondary" : "primary" || "default"}
            clickable
            variant={variant || "default"}
            size={size || "medium"}
        />
    )
}
export default TopicChip
