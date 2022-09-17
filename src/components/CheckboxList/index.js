import React, { useState, useEffect } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

import { useFilter } from "../../hooks/useFilter";

const CheckboxList = ({itemList, filterCategory})  => {
  const [checked, setChecked] = useState([]);

  const { setToFilterNeeds, setToFilterTech, setToFilterDate, setToFilterSourceType} = useFilter();
  
  useEffect(() =>{
    //console.log(checked)

    switch (filterCategory) {
      case "needs": setToFilterNeeds(checked); break
      case "tech": setToFilterTech(checked); break
      case "date": setToFilterDate(checked); break
      case "articleType": setToFilterSourceType(checked); break
    }
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
              <ListItemText sx={{marginLeft:'-1.7em'}} id={labelId} primary={`${value}`} primaryTypographyProps={{fontSize:'3em'}} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

export default CheckboxList;