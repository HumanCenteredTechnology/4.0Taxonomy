import React, { useState, useEffect } from 'react';

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


const data = [
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
    }
];

const ResultsList = () => {
    return (
        <section className='resultsList'>
            {data.map((result) =>{
                return (
                    <Result key={result.id} {...result}/>       //l'id serve per la key(richiesta da React), dovrebbe esserci nelle API
                );
            })}
        </section>
    );
}

/* const ResultsFetch = () => {
    const [results, setResults] = useState([]);

    const getResults = async() => {
        const response = await fetch(json);  //url sarà preso da API
        const results = await response.json();
        //setResults(results);
        console.log(results);
    }

    useEffect( () => {
        getResults();

    }, [])
    return (
        <>
            <ul className="results">
                {results.map((result) => {
                    return (
                        <Result  key={result.id} {...result}/>
                    );
                })}
            </ul>
        </>
    )
}  */


//mostra tutti i risultati





export default ResultsPage;
//export default ResultsFetch;