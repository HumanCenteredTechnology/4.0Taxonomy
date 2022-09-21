import React, { useState, useEffect } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';



const CheckboxList = ({itemList, filterCategory, fetchedResults, setSelected, clearChecked, checkedCleared})  => {
  const [checked, setChecked] = useState([]);

  
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

    <List sx={{ width: '100%', maxWidth: 360, bgcolor:'background.paper', paddingLeft:"0.5em"}}>
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
              <ListItemText sx={{marginLeft:'-2em', fontSize: '12px', lineHeight: '12px'}} id={labelId} primary={`${value}`} disableTypography />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

export default CheckboxList;