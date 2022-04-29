import React, { useState, useEffect } from "react";
import { Checkbox, FormControlLabel, Box, MenuItem } from "@mui/material";
import CheckboxTree from "react-checkbox-tree";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import './checkboxtree.css';
import taxonomy from "../../taxonomy test.json";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

const initialNeeds = JSON.parse(JSON.stringify(taxonomy.at(0).children))
const initialTech = JSON.parse(JSON.stringify(taxonomy.at(1).children))

const CheckBoxTree = ({isNeeds}) => {
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);

    useEffect(()=>{
        console.log(checked)   
    }, [checked])

    return (
        <Box>
            <CheckboxTree
                nodes={isNeeds? initialNeeds:initialTech}
                checked={checked}
                expanded={expanded}
                onCheck={checked=>setChecked(checked)}
                onExpand={expanded=> setExpanded(expanded)}
                noCascade
                icons={{
                    check: <CheckBoxRoundedIcon />,
                    uncheck: <CheckBoxOutlineBlankRoundedIcon />,
                    /* halfCheck: <FontAwesomeIcon className="rct-icon rct-icon-half-check" icon="check-square" />, */
                    expandClose: < ChevronRightRoundedIcon />,
                    expandOpen: <ExpandMoreRoundedIcon />,
                    expandAll: <FontAwesomeIcon className="rct-icon rct-icon-expand-all" icon="plus-square" />,
                    collapseAll: <FontAwesomeIcon className="rct-icon rct-icon-collapse-all" icon="minus-square" />,
                    /* parentClose: <FontAwesomeIcon className="rct-icon rct-icon-parent-close" icon="folder" />,
                    parentOpen: <FontAwesomeIcon className="rct-icon rct-icon-parent-open" icon="folder-open" />,
                    leaf: <FontAwesomeIcon className="rct-icon rct-icon-leaf-close" icon="file" /> */
                }}
                />
        </Box>
    );

}


export default CheckBoxTree;