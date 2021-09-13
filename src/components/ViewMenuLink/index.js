import React from 'react';
import './ViewMenuLink.css';
import Button from '@material-ui/core/Button';

const ViewMenuLink = () => {

    return (
        <div className="viewMenuWrapper" >
        <Button href="#text-buttons" color="black">
            or view the menu
        </Button>
        <img className="viewMenuIcon" src="" /> 
    </div>
    )
}
export default ViewMenuLink;




//viewMenuIcon: an arrow pointing down