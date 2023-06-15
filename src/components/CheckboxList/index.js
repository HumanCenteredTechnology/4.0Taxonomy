import React, { useState, useEffect } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Link, Box } from "@mui/material";



const CheckboxList = ({itemList, filterCategory, fetchedResults, setSelected, clearChecked, checkedCleared})  => {
  const [checked, setChecked] = useState([]);

  const [isLong, setIsLong] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [buttonText, setButtonText] = useState('More filters')

  const handleShowMore = () => {
    if (showMore === true) {
      setShowMore(false);
      setButtonText('More filters')
    } else {
      setShowMore(true);
      setButtonText('Less filters')
    }
  }

  useEffect(() => {
    if (itemList.length > 4) {
      setIsLong(true)
    } else {
      setIsLong(false)
    }
  }, [itemList])

  
  useEffect(() =>{
    setSelected(checked)
  }, [checked])

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  useEffect(() =>{
    if (clearChecked==true) {
      setChecked([])
      checkedCleared(checked)
    }
  },[clearChecked])


  return (
    <>
    <List sx={{ width: '100%', maxWidth: 360, bgcolor:'background.paper', paddingLeft:"0.5em"}}>
      {isLong ?
      <>
        {itemList.slice(0,4).map((value, index) => {
          const labelId = `checkbox-list-label-${value}`;
          return (
            <ListItem key={index} dense sx={{paddingLeft:"0"}}>
              <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                    size="small"
                  />
                </ListItemIcon>
                <ListItemText sx={{marginLeft:'-2rem', fontSize: '0.8rem', lineHeight: '0.9rem'}} id={labelId} primary={`${value}`} disableTypography />
              </ListItemButton>
            </ListItem>
          );
        })}
      </>
      :
      <>
      {itemList.map((value, index) => {
        const labelId = `checkbox-list-label-${value}`;
        return (
          <ListItem key={index} dense sx={{paddingLeft:"0"}}>
            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                  size="small"
                />
              </ListItemIcon>
              <ListItemText sx={{marginLeft:'-2rem', fontSize: '0.8rem', lineHeight: '0.9rem'}} id={labelId} primary={`${value}`} disableTypography />
            </ListItemButton>
          </ListItem>
        );
      })}
      </>
      }
      {showMore &&
      <>
      {itemList.slice(4).map((value, index) => {
        const labelId = `checkbox-list-label-${value}`;
        return (
          <ListItem key={index} dense sx={{paddingLeft:"0"}}>
            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                  size="small"
                />
              </ListItemIcon>
              <ListItemText sx={{marginLeft:'-2rem', fontSize: '0.8rem', lineHeight: '0.9rem'}} id={labelId} primary={`${value}`} disableTypography />
            </ListItemButton>
          </ListItem>
        );
      })}
      </>}
    </List>
    {isLong && <Box sx={{marginLeft:"0.5rem", marginBottom:"0.5rem"}}><Link color="inherit" component="button" underline="hover" onClick={handleShowMore}>{buttonText}</Link></Box>}
    </>
  );
}

export default CheckboxList;