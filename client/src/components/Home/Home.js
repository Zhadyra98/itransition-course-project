import React, { useState } from "react";
import Items from "../Items/Items";
import { useDispatch } from "react-redux";
import { getItemsBySearch } from '../../actions/items';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ search, setSearch ] = useState("");

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
        <div>
            <>Main page </>
            <div>
                <Items />
            </div>
            <div>
                <input
                    name="search"
                    variant="outlined"
                    label="Search Items"
                    value={search}
                    onChange={(e) => setSearch(e.target.value.toLowerCase())}
                    onKeyPress={handleKeyPress}
                />
                <button onClick={searchItem} variant="contained" color="primary">Search</button>
            </div>
        </div>
    )
}

export default Home;