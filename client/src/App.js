import React from "react";
import { Container } from '@mui/material'
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import ItemDetails from "./components/ItemDetails/ItemDetails";

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    return (
        <BrowserRouter>
            <Container maxWidth="xl">
                <Navbar/>
                <Routes>
                    <Route path="/" exact element={<Navigate  to="/items" />}/>
                    <Route path= "/items" exact element={<Home/>}/>
                    <Route path= "/items/search" exact element={<Home/>}/>
                    <Route path= "/items/:id" exact element={<ItemDetails/>}/>
                    <Route path="/auth" exact element = {!user ? <Auth/> : <Navigate  to="/items" />}/>
                </Routes>
            </Container>
        </BrowserRouter>
    )
}

export default App;