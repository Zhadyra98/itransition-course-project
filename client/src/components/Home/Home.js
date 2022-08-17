import React, { useState, useEffect } from "react";
import Items from "../Items/Items";
import Form from "../Form/Form";
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@mui/material'
import { useDispatch } from "react-redux";
import { getItems, getItemsBySearch } from '../../actions/items';
import Pagination from "../Pagination";
import { useNavigate, useLocation } from 'react-router-dom';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
const Home = () => {
    const [ currentId, setCurrentId ] = useState(null);
    const dispatch = useDispatch();
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [ search, setSearch ] = useState("");
    const [ tags, setTags ] = useState([]);

    
    const handleKeyPress = (e) => {
        if(e.keyCode === 13){
            searchItem();
        }
    }

    const searchItem = () => {
        if(search.trim()){
            dispatch(getItemsBySearch({ search }));
            navigate(`/items/search?searchQuery=${search || 'none'}`);
        } else {
            navigate('/');
        }
        setSearch('');
    }
    return(
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Items setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar position="static" color="inherit">
                            <TextField
                                name="search"
                                variant="outlined"
                                label="Search Items"
                                fullWidth
                                value={search}
                                onChange={(e) => setSearch(e.target.value.toLowerCase())}
                                onKeyPress={handleKeyPress}
                            />
                            <Button onClick={searchItem} variant="contained" color="primary">Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {(!searchQuery) && (
                            <Paper elevation={6}>
                                <Pagination page = {page} />
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home;