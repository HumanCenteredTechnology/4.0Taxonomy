import React, { useState, useEffect, forwardRef } from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useNavigate, useParams } from 'react-router-dom';
import taxonomy from "../../taxonomy.json";

import { Box, Grid, Typography, Checkbox } from '@mui/material';
import { TreeView, TreeItem, useTreeItem } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const initialNeeds = JSON.parse(JSON.stringify(taxonomy.at(0).subLevels))
const initialTech = JSON.parse(JSON.stringify(taxonomy.at(1).subLevels))



const BrowsableTree = ({ isVerificationTree, responseTree }) => {
    const [needs, setNeeds] = useState(initialNeeds)
    const [tech, setTech] = useState(initialTech)



    /* useEffect(() => {
        if (responseTree.length !== 0) {
            setNeeds(responseTree.filter(el => el[1] === "Problems"))
            setTech(responseTree.filter(el => el[1] === "Technology"))
        }

        //console.log(responseTree)
        console.log()
    }, [responseTree]) */



    const renderItem = (nodes) => (
        <CustomTreeItem key={nodes.label} nodeId={nodes.label} label={nodes.label} isVerificationTree={isVerificationTree} >
            {Array.isArray(nodes.subLevels)
                ? nodes.subLevels.map((node) => renderItem(node))
                : null}
        </CustomTreeItem>
    );
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
                <Box sx={{ flexGrow: 1, my: 2, alignContent: "center" }}>
                    <Typography align="center" variant="h6">4.0 Industry Needs</Typography>
                </Box>
                <TreeView
                    aria-label="4.0 industry needs hierarchy"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    isVerificationTree={isVerificationTree}
                    sx={{ maxHeight: 400, flexGrow: 1, maxWidth: 600, overflowY: 'auto' }}>
                    {initialNeeds.map(n => (renderItem(n)))}

                </ TreeView>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <Box sx={{ flexGrow: 1, my: 2, alignContent: "center" }}>
                    <Typography align="center" variant="h6">4.0 Enabling Technologies</Typography>
                </Box>
                <TreeView
                    aria-label="4.0 enabling technologies hierarchy"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    sx={{ height: 400, flexGrow: 1, maxWidth: 600, overflowY: 'auto' }}>
                    {initialTech.map(n => (renderItem(n)))}
                </ TreeView>
            </Grid>

        </Grid>
    )
}

const CustomContent = forwardRef(function CustomContent(props, ref) {
    const {
        classes,
        className,
        label,
        nodeId,
        icon: iconProp,
        expansionIcon,
        displayIcon,
        isVerificationTree
    } = props;

    const {
        disabled,
        expanded,
        selected,
        focused,
        handleExpansion,
        handleSelection,
        preventSelection,
    } = useTreeItem(nodeId);

    const icon = iconProp || expansionIcon || displayIcon;

    const handleMouseDown = (event) => {
        preventSelection(event);
    };

    const handleExpansionClick = (event) => {
        handleExpansion(event);
    };

    const handleSelectionClick = (event) => {
        handleSelection(event);
    };

    let navigate = useNavigate();

    const handleClick = () => {
        navigate("/" + label);
    }
    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
            className={clsx(className, classes.root, {
                [classes.expanded]: expanded,
                [classes.selected]: selected,
                [classes.focused]: focused,
                [classes.disabled]: disabled,
            })}
            onMouseDown={handleMouseDown}
            ref={ref}
        >
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <div onClick={handleExpansionClick} className={classes.iconContainer}>
                {icon}
            </div>
            {isVerificationTree ?
                <>
                    <Typography
                        onClick={handleSelectionClick}
                        component="div"
                        className={classes.label}
                    >
                        {label}
                    </Typography>
                    <Checkbox />
                </>
                :
                <>
                    <Typography
                        onClick={handleClick}
                        component="div"
                        className={classes.label}
                    >
                        {label}
                    </Typography>
                </>}
        </div>
    );
});
CustomContent.propTypes = {
    /**
     * Override or extend the styles applied to the component.
     */
    classes: PropTypes.object.isRequired,
    /**
     * className applied to the root element.
     */
    className: PropTypes.string,
    /**
     * The icon to display next to the tree node's label. Either a parent or end icon.
     */
    displayIcon: PropTypes.node,
    /**
     * The icon to display next to the tree node's label. Either an expansion or collapse icon.
     */
    expansionIcon: PropTypes.node,
    /**
     * The icon to display next to the tree node's label.
     */
    icon: PropTypes.node,
    /**
     * The tree node label.
     */
    label: PropTypes.node,
    /**
     * The id of the node.
     */
    nodeId: PropTypes.string.isRequired,

    isVerificationTree: PropTypes.bool
};

const CustomTreeItem = (props) => (
    <TreeItem ContentComponent={CustomContent} {...props} />
);

export default BrowsableTree;
