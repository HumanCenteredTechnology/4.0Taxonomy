import { Container } from '@material-ui/core';
import React from 'react';
//Components
import Header from './Header';
import SearchBar from './SearchBar';
//Styles

const Home = () => {

    return <div className="Home">
        <Container 
        maxWidth="md"
        style={{display: "flex", flexDirection: "column", heigt: "100vh" }}
        >
            <Header />
            <SearchBar />
        </Container>
    </div>
};

export default Home;