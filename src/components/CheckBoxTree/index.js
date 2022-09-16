import React, { useState, useEffect } from "react";
import { Checkbox, FormControlLabel, Box, MenuItem } from "@mui/material";
import CheckboxTree from "react-checkbox-tree";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import './checkboxtree.css';

/* import taxonomy from "../../taxonomy test.json"; */
import jsonEx from "../../SERP results example.json"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { Link } from "react-router-dom";

/* const initialNeeds = JSON.parse(JSON.stringify(taxonomy.at(0).children))
const initialTech = JSON.parse(JSON.stringify(taxonomy.at(1).children)) */

 /* 03/09/2022 L. Moretti  */
const initialNeeds = JSON.parse(JSON.stringify(jsonEx.filter_topics.needs)) 
const initialTech = JSON.parse(JSON.stringify(jsonEx.filter_topics.tech))

/* nodes di CheckboxTree vuole un array di Object(value:"", label:"") */
const fiterInitialNeeds = initialNeeds.map((el) => ({value:String(el), label:String(el)}) )
const filterInitialTech = initialTech.map((el) => ({value:String(el), label:String(el)}) )

const fiterNeeds = [{value:"needs", label:"needs", children: fiterInitialNeeds}]
const filterTech = [{value:"Technologies", label:"Technologies", children: filterInitialTech}]

const CheckBoxTree = ({isNeeds, checked, setChecked}) => {
    
    const [expanded, setExpanded] = useState(["needs","Technologies"]);  /* at start show filter with needs and tech expanded */
    return (
        <Box marginLeft={0.2}>
            <CheckboxTree
                /* nodes={isNeeds? initialNeeds: initialTech} */
                nodes={isNeeds? fiterNeeds : filterTech}
                checked={checked}
                expanded={expanded}
                onCheck={checked=>setChecked(checked)}
                onExpand={expanded=> setExpanded(expanded)}
                noCascade
                icons={{
                    check: <CheckBoxRoundedIcon fontSize="small" />,
                    uncheck: <CheckBoxOutlineBlankRoundedIcon fontSize="small"/>,
                    /* halfCheck: <FontAwesomeIcon className="rct-icon rct-icon-half-check" icon="check-square" />, */
                    expandClose: < ChevronRightRoundedIcon />,
                    expandOpen: <ExpandMoreRoundedIcon />,
                    expandAll: <FontAwesomeIcon className="rct-icon rct-icon-expand-all" icon="plus-square" />,
                    collapseAll: <FontAwesomeIcon className="rct-icon rct-icon-collapse-all" icon="minus-square" />,
                    parentClose: <></>,
                    parentOpen: <></>,
                    leaf: <></>
                }}
            />
        </Box>
    );

}


export default CheckBoxTree;