import React from 'react'
import Button from '@material-ui/core/Button';

const Result = ({title, description}) => {
    //const { title, description } = props.result;
    return (
        <article className='result'>
            <h3>{title}</h3>
            <p>{description}</p>

            <ViewResultButton />
        </article>
    );
}


const ViewResultButton = () => {
    return (
        <div className='buttonContainer'>
            <Button href="#text-buttons" color="black">
                View
            </Button>
        </div>
    );
}

export default Result;
