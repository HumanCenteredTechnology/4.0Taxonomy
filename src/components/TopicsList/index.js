import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Grid } from "@material-ui/core";
import TopicChip from "../TopicChip";


const TopicsList = ({results, category}) => {
    return (
      <Box sx={{ my: 0.5 }}>
        <Grid container
          spacing={1}
          columnspacing={{ xs: 0, md: 2 }}
          rowspacing={{ xs: 2, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          justifycontent="flex-start"
          direction="row">
          {results.map((topic, index) => {
            return (
              <Grid item>
                <TopicChip
                  name={category}
                  size="small" 
                  variant="outlined"
                  key={index}
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