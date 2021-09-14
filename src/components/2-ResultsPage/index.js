import React, { useState } from 'react'

//Components
import SearchBar from '../SearchBar';
import Result from '../Result';

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
        id: 0,
        title : 'Title 1',
        description : 'Description'
    },
    {
        id: 1,
        title : 'Title 2',
        description : 'Description'
    },
    {
        id: 2,
        title : 'Title 3',
        description : 'Description'
    },
];



//mostra tutti i risultati
const ResultsList = () => {
    return (
        <section className='resultsList'>
            {results.map((result) =>{
                return (
                    <Result key={result.id} {...result}/>       //l'id serve per la key(richiesta da React), dovrebbe esserci nelle API
                );
            })}
        </section>
    );
}


//singolo risultato


export default ResultsPage;