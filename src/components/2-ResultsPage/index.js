import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
//Components
import SearchBar from "../SearchBar";
import Result from "../Result";
import NotFound from "../NotFound";
import TopicChip from "../TopicChip";
import TopNavBar from "../TopNavBar";
//hooks
import { useFetch } from "../../hooks/useFetch";

//Style
//import "./ResultsPage.css";
import { Container, Box, Divider, Grid, Typography, AppBar, Toolbar } from "@material-ui/core";
import { Skeleton, IconButton } from "@mui/material";
import { HomeRounded } from "@mui/icons-material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from "@mui/material/styles";




const ResultsPage = () => {
  const theme = useTheme()
  const hidden = useMediaQuery(theme.breakpoints.down('sm'));

  const { queryId } = useParams();
  const { results, loading, error, setSearchMention, found } = useFetch(queryId);
  const [problems, setProblems] = useState([]);
  const [technologies, setTechnologies] = useState([]);




  useEffect(() => {

    if (results.related_elements.length !== 0 || results.unrelated_elements.length !== 0) {
      if (results.related_elements[0].at(3) === "Problems") {
        setProblems(results.related_elements)
        setTechnologies(results.unrelated_elements)
      }
      if (results.related_elements[0].at(3) === "Technology") {
        setProblems(results.unrelated_elements)
        setTechnologies(results.related_elements)
      }
    }
  }, [results])

  return (
    <Box>
      <TopNavBar />
      <Container  >
        {hidden ? <></> :
          <Box sx={{ marginY: 5 }}>
            <SearchBar sx={{}} setSearchMention={setSearchMention} />
          </Box>
        }

        {!error ?
          <Box sx={{ marginY: 2 }}>
            <Typography variant="body1">We found a total of {found ? problems.length + technologies.length : "0"} results for "{queryId}"
            </Typography>
          </Box>
          :
          <></>}
        <Box sx={{ marginY: 3 }}>
          <Divider margin={2} variant="middle" />
        </Box>
        <Grid container spacing={3}>
          {found ? <ResultsList problems={problems} technologies={technologies} loading={loading} /> : <NotFound error={error} />}
          {/* <ResultsList problems={problems} technologies={technologies} /> */}
        </Grid>
        {/* <Box sx={{ marginTop: 10, marginX: 5 }}>
        {found ? <><p>topics suggested</p> <TopicsList results={results} /></> : <></>}
      </Box> */}
      </Container>
    </Box>
  );
};


const ResultsList = ({ problems, technologies, loading }) => {

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <Box sx={{
          display: 'flex',
          p: 1,
          m: 2,
        }}>
          <Typography variant="h5" > Business Needs ({problems.length})</Typography>
        </Box>
        {problems.map((el, i) => {
          return (
            <Result key={el[0]} name={el[0]} parent={el[1]} category={el[3]} articles={el[2]} loading={loading} />
          );
        })}
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box sx={{
          display: 'flex',
          p: 1,
          m: 2,
        }}>
          <Typography variant="h5" >Enabling Technologies ({technologies.length})</Typography>
        </Box>
        {technologies.map((el, i) => {
          return (
            <Result key={el[0]} name={el[0]} parent={el[1]} category={el[3]} articles={el[2]} loading={loading} />
          );
        })}
      </Grid>
    </Grid>
  );
};

const TopicsList = ({ results }) => {
  return (
    <Box sx={{ my: 2 }}>
      <Grid container
        spacing={1}
        columnspacing={{ xs: 0, md: 2 }}
        rowspacing={{ xs: 2, md: 2 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        justifycontent="flex-start"
        direction="row">
        {results.topics.map((topic, i) => {
          return (
            <Grid item>
              <TopicChip
                key={topic[0]}
                label={topic[0]}
                name={topic[1]}
                clickable={true}
                link={topic[2]}
              />
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default ResultsPage;
