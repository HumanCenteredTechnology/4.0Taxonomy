import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import taxonomy from "../../taxonomy.json";

import { Box, Grid, Typography, Checkbox } from '@mui/material';
import { TreeView, TreeItem } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const BrowsableTree = () => {
    const needs = JSON.parse(JSON.stringify(taxonomy.at(0).subLevels));
    const tech = JSON.parse(JSON.stringify(taxonomy.at(1).subLevels));
    let navigate = useNavigate();


    const handleClick = (e, id) => {
        //e.preventDefault();
        console.log(id)
        navigate("/" + id);
    }
    const renderItem = (nodes) => (
        <TreeItem key={nodes.label} nodeId={nodes.label} label={nodes.label} >
            {Array.isArray(nodes.subLevels)
                ? nodes.subLevels.map((node) => renderItem(node))
                : null}
        </TreeItem>
    );
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
                <Box
                    sx={{ flexGrow: 1, my: 2, alignContent: "center" }}
                >
                    <Typography align="center" variant="h6">4.0 Industry Needs</Typography>
                </Box>

                <TreeView
                    aria-label="4.0 industry needs hierarchy"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    onNodeSelect={handleClick}
                    sx={{ maxHeight: 400, flexGrow: 1, maxWidth: 600, overflowY: 'auto' }}
                >
                    {needs.map(n => (renderItem(n)))}
                </ TreeView>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <Box
                    sx={{ flexGrow: 1, my: 2, alignContent: "center" }}
                >
                    <Typography align="center" variant="h6">4.0 Enabling Technologies</Typography>
                </Box>
                <TreeView
                    aria-label="4.0 enabling technologies hierarchy"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    sx={{ height: 400, flexGrow: 1, maxWidth: 600, overflowY: 'auto' }}
                >
                    {tech.map(n => (renderItem(n)))}
                </ TreeView>
            </Grid>

        </Grid>
    )
}

export default BrowsableTree;
