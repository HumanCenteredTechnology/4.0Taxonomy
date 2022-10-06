import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
/* import { Grid } from "@material-ui/core"; */
import TopicChip from "../TopicChip";
import { capitalize, Grid, Typography } from "@mui/material";


const TopicsList = ({type, results, category}) => {
 /*  const [topics, setTopics] = useState(results)


  useEffect(()=>{
    setTopics(displayTopics(topics))
  },[topics]) */



  const displayTopics = (topics) => {
    let newTopics = [];
    
    
    if (topics.length > 6) {
      const otherTopics = topics.length - 5
      newTopics = topics.slice(0,5).concat(`Other ${otherTopics}`)
      return newTopics
    } else {
      return topics
    }
    
  }

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
          { type=="ResultsList" ?
          <>
          {displayTopics(results).map((topic, index) => {
            return (
              <Grid item>
                <TopicChip
                  key={index}
                  name={category}
                  size="small" 
                  variant="outlined"
                  label={topic}
                  clickable={false}
                />
              </Grid>
            )
          })}
          </>
          :
          <>
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
          </>
          }
          
        </Grid>
      </Box>
    )
  }

export default TopicsList;