import React from 'react';


//Components
import Header from '../Header';
import SearchBar from '../SearchBar';
import ViewMenuLink from '../ViewMenuLink';
//Styles
import { Container } from '@material-ui/core';

const Home = () => {

    return <div className="Home">
        <Header />
        <Container 
        maxWidth="md"
        style={{display: "flex", flexDirection: "column", alignItems: "center", heigth: "100vh" }}
        >    
            <SearchBar />
            <ViewMenuLink />
        </Container>
    </div>
};

export default Home;