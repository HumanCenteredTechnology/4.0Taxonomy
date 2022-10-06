import React from 'react'
import { useNavigate } from 'react-router-dom';
/* import { Chip } from "@material-ui/core"; */   /* VECCHIA Libreria*/
import Chip from '@mui/material/Chip';   /*NUOVA Libreria: clickable not work */
import { string } from 'prop-types';

const TopicChip = ({ key, name, size, label, variant, clickable, link, filtered, setFiltered, onDelete }) => {
    let navigate = useNavigate();
    const handleClick = () => {
        if (clickable) {
            if (!link =="")
            window.open(link)
    
            navigate("/" + label); //per UX dovrebbe non essere clickable se non c'è link
        }

    }
    
    const chipColor = (name === "needs" ? "1px solid #29bf40" : "1px solid #395bdf")  /* Needs:green - Tech:blue */
    
    const labelLenght = label.length
    var newLabel = (labelLenght <= 55 ? label : label.substring(0,55) + "...")  

    return (
        <Chip
            key={key}
            label={newLabel}
            /* color={name === "needs" ? "primary" : "secondary" || "default"}*/ /* not work  */ 
            style={{border:chipColor, height:"1.5em", borderRadius:50, fontSize:"0.7rem"}}
            clickable = {clickable}
            /* {...(clickable && { clickable: true })} */
            onClick={handleClick}
            onDelete={onDelete}
            variant={variant || "default"}
            size={size || "medium"}
            link={link}
        />
    )

}
export default TopicChip
