import React from 'react'
import { Chip, } from '@material-ui/core'

const TopicChip = ({ name, label, variant, size, clickable = null }) => {
    return (
        <Chip
            label={label}
            color={name === "Problems" ? "secondary" : "primary" || "default"}
            {...(clickable && { clickable: true })}
            variant={variant || "default"}
            size={size || "medium"}
        />
    )
}
export default TopicChip
