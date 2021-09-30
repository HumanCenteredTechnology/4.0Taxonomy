import React from 'react'
import { Chip, } from '@material-ui/core'

const TopicChip = ({ name, label, variant, size, clickable = null, link }) => {
    const handleClick = () =>{
        if (!link =="")
        window.open(link)
        //per UX dovrebbe non essere clickable se non c'è link
    }
    return (
        <Chip
            label={label}
            color={name === "Problems" ? "secondary" : "primary" || "default"}
            {...(clickable && { clickable: true  })}
            onClick={handleClick}
            variant={variant || "default"}
            size={size || "medium"}
            link={link}
        />
    )
}
export default TopicChip
