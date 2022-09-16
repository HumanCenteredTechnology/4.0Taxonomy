import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
/* import { Grid } from "@material-ui/core"; */
import TopicChip from "../TopicChip";
import { capitalize, Grid, Typography } from "@mui/material";


const TopicsList = ({results, category}) => {
    return (
      <Box sx={{ my: 0 }}>
        <Grid container 
          rowSpacing={0.4} 
          columnSpacing={0.6}
          /* spacing={0.8} */
          columnspacing={{ xs: 0, md: 2 }}
          rowspacing={{ xs: 1, md: 1 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          justifycontent="flex-start"
          direction="row">
          {results.map((topic, index) => {
            return (
              <Grid item>
                <TopicChip
                  key={index}
                  name={category}
                  size="small" 
                  variant="outlined"
                  label={topic}
                  clickable={true}
                />
              </Grid>
            )
          })}
        </Grid>
      </Box>
    )
  }

export default TopicsList;