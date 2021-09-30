import React from 'react'
import { Chip, } from '@material-ui/core'

const TopicChip = ({ name, label, variant, size, clickable = null, link }) => {
    const handleClick = () =>{
        console.log(link)
        window.open(link)
    }
    return (
        <Chip
            label={label}
            color={name === "Problems" ? "secondary" : "primary" || "default"}
            {...(clickable && { clickable: true,  })}
            onClick={handleClick}
            variant={variant || "default"}
            size={size || "medium"}
            link={link}
        />
    )
}
export default TopicChip
