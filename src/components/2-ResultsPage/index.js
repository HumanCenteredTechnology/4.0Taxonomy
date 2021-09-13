import React from 'react'

//Components
import SearchBar from '../SearchBar';
import Button from '@material-ui/core/Button';




const ResultsPage = () => {
    return (
        <div>
            <SearchBar />
            <ResultsList />
        </div>

    );
}

//mostra tutti i risultati
const ResultsList = () => {
    return (
        <section>
            <Result />
            <Result />
            <Result />
            <Result />
            <Result />
            <Result />
        </section>
    );
}

//singolo risultato
const Result = () => {
    return (
        <article>
            <ResultTitle />
            <ResultDescription />
            <ViewResultButton />
        </article>
    );
}

const ResultTitle = () => {
    return (
        <h3>Title</h3>    //prop
    );
}

const ResultDescription = () => {
    return (
        <p>Description</p>  //prop
    );
}

const ViewResultButton = () => {
    return (
        <Button href="#text-buttons" color="black">
            View
        </Button>
    );
}

export default ResultsPage;