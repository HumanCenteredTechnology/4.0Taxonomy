import React, { useEffect, useState } from "react";
import { Link as RouterLink } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import { Card, Link, Box, List, ListItem, ListItemText} from "@material-ui/core";
import { Tooltip, Typography, Grid, Chip } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import TopicsList from "../TopicsList";

const Result = ({ elCard }) => {
  const [readMore, setReadMore] = useState(false);

  /* Function di controllo del bottone '...show More' della Card */
  const switchReadMore = (event) =>{
    if (readMore===true) {
      setReadMore(false)
    } else{
      setReadMore(true)
    }
  }

  const entireAbstractText = elCard.abstract;
  /* Pallino di separazione */
  const shot = (<Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>•</Box>);

  return (
      <Box sx={{ justifyContent: 'center', p: 0, mb: 0.3}}>
      <Card>
        <Box sx={{
            justifyContent: 'center',
            pt: 1,
            pb: 1,
            pl: 1,
            pr: 1,
          }}>
          {/* Article Title */}
          <Link component={RouterLink} to={"/SingleResult/" + elCard.id + '/' + elCard.title} underline="hover">
            <Typography  variant="body1" color="textPrimary"><b>{elCard.title}</b></Typography>
          </Link>

          {/* Source type (Tipologia articolo), Publishing Date */}
          <Grid container spacing={0.5} alignContent="center">
            <Grid>
              <Box marginRight={1} marginY={1} marginX={0.5}>
                <Typography style={{ backgroundColor: "#30dbd0", padding: "2px 5px", fontfamily:"Arial", fontSize: "0.8em"}}>
                    {elCard.source_type!= '' ? elCard.source_type : <>Article</>}
                </Typography>
              </Box> 
            </Grid>
            <Grid item>
              <Box marginY={1}><Typography style={{fontSize: "0.8em"}}>{elCard.publishing_date}</Typography></Box>
            </Grid>
            {elCard.journal!='' ?
              <>
                <Grid item><Box marginY={1}><Typography style={{fontSize: "0.8em"}}>{shot}</Typography></Box></Grid> 
                <Grid item><Box marginRight={1} marginY={1}><Typography style={{fontSize: "0.8em"}}>{elCard.journal}</Typography></Box></Grid>
              </>  
              : <></>}
          </Grid>

          {/* Lista degli autori */}
          <Box>
            <Box component="span" sx={{ display: 'inline-block', mx: '2px', fontSize: "0.8em"}}>Authors:</Box>
              {elCard.authors.map((el, index) => {
                  return (<>
                    <Button variant="text" size="small" startIcon={<AccountCircleIcon />} style={{padding: "0px 0px", margin: "3px 4px", fontSize: "0.8em"}}>
                      {el}
                    </Button>{index<elCard.authors.length-1 ? <>{shot}</> : <></>}
                  </>); 
                  })
              }
          </Box>

          {/* Testo Abstract */}
          <Typography variant="body2" gutterBottom style={{fontSize:'0.8em'}}>
              {!readMore ? entireAbstractText.substring(0,350) : entireAbstractText}
              <Link align="center" onClick={switchReadMore} href="#">{!readMore ? " ...read more" : " read less"}</Link>
          </Typography>

          {/* Elementi della Topics List */}
          {!(elCard.tax_keywords.needs == "") ?
            <Grid container spacing={1} justifyContent={"center"} alignItems={"flex-start"}>
              {/* <Grid item xs={12} sm={12} md={1}><Button variant="outlined">Text</Button></Grid> */}
              {/* <Grid item xs={12} sm={1}> <Chip label="Need" style={{border:"1px solid #29bf40", height:"1.5em", borderRadius:50}}></Chip> </Grid> */}
              <Grid item xs={12} sm={1}><Typography variant="subtitle2" style={{paddingLeft:"0.6em"}}>Need:</Typography></Grid>
              <Grid item xs={12} sm={11}>
                    <TopicsList results={elCard.tax_keywords.needs} category={Object.keys(elCard.tax_keywords)[0]} ></TopicsList>
              </Grid>
            </Grid>
            : <></>
          }
          {!(elCard.tax_keywords.tech == "") ?
            <Grid container spacing={0} justifyContent={"center"} alignItems={"flex-start"}>  
              <Grid item xs={12} sm={1}><Typography variant="subtitle2" style={{paddingLeft:"0.6em"}}>Tech:</Typography></Grid>
              <Grid item xs={12} sm={11}>
                    <TopicsList results={elCard.tax_keywords.tech} category={Object.keys(elCard.tax_keywords)[1]}></TopicsList>
              </Grid>
            </Grid>
            : <></>
          }
        </Box>
      </Card>
    </Box>
  );
};

const Resources = ({ articles }) => {
  const [isLong, setIsLong] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [buttonText, setButtonText] = useState('Show More')

  const handleShowMore = () => {
    if (showMore === true) {
      setShowMore(false);
      setButtonText('Show more')
    } else {
      setShowMore(true);
      setButtonText('Show less')
    }

  }

  useEffect(() => {
    if (articles.length > 4) {
      setIsLong(true)
    } else {
      setIsLong(false)
    }
  }, [articles])

  return (

    <Box >
      <List disablePadding dense>
        {isLong ?
          <> {
            articles.slice(0, 4)
              .map((art, i) => {
                return (
                  <Article key={art + i} art={art} />
                )
              })
          }</> : <>
            {
              articles.map((art, i) => {
                return (
                  <Article key={art + i} art={art} />
                )
              })
            } </>
        }
        {showMore ? <>
          {
            articles.slice(4)
              .map((art, i) => {
                return (
                  <Article key={art + i} art={art} />
                )
              })
          }
        </> : <></>}
      </List>
      {isLong ? <Button size="small" onClick={handleShowMore}>{buttonText}</Button> : <> </>}
    </Box>
  )
}

const Article = ({ art }) => {
  let isPdf = false;
  if (art[1].endsWith('pdf')) isPdf = true
  return (
    <ListItemText>
      <Tooltip title={isPdf ? "Opens a pdf in a new window" : "Opens in a new window"} followCursor>
        <Link rel="noopener noreferrer" target="_blank" href={art[1]} >
          <Typography variant="body2" noWrap >
            {art[0]}
          </Typography>
        </Link>
      </Tooltip>
    </ListItemText>
  );
};

const ViewResultButton = () => {
  return (
    <div className="buttonContainer">
      <Button href="#text-buttons">
        View Use Cases
      </Button>
    </div>
  );
};

export default Result;
