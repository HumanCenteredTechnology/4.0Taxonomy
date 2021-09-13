import React from 'react'

//Components
import SearchBar from '../SearchBar';
import Button from '@material-ui/core/Button';

//Style
import './ResultsPage.css';


const ResultsPage = () => {
    return (
        <div>
            <SearchBar />
            <ResultsList />
        </div>

    );
}

const results = [
    {
        title : 'Title 1',
        description : 'Description'
    },
    {
        title : 'Title 2',
        description : 'Description'
    },
    {
        title : 'Title 3',
        description : 'Description'
    },
];


const result = {
    title : 'Title',
    description : 'Description'
}

//mostra tutti i risultati
const ResultsList = () => {
    return (
        <section className='resultsList'>
            {results.map((result) =>{
                return (
                    <Result result={result}/> 
                );
            })}
        </section>
    );
}


//singolo risultato
const Result = (props) => {
    const { title, description } = props.result;
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

export default ResultsPage;