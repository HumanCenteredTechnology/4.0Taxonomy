import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Chip, } from '@material-ui/core'

const TopicChip = ({ name, label, variant, size, clickable = null, link }) => {
    let navigate = useNavigate();
    const handleClick = () => {
        /* if (!link =="")
        window.open(link) */

        navigate("/" + label);
        //per UX dovrebbe non essere clickable se non c'è link
    }
    return (
        <Chip
            label={label}
            color={name === "Problems" ? "secondary" : "primary" || "default"}
            {...(clickable && { clickable: true })}
            onClick={handleClick}
            variant={variant || "default"}
            size={size || "medium"}
            link={link}
        />
    )
}
export default TopicChip
