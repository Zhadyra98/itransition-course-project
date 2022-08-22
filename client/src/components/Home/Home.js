import React, { useState } from "react";
import Items from "../Items/Items";
import Form from "../Form/Form";
import { useDispatch } from "react-redux";
import { getItemsBySearch } from '../../actions/items';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [ currentId, setCurrentId ] = useState(null);
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
            {/* <div>
                <Items setCurrentId={setCurrentId} />
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
                <Form currentId={currentId} setCurrentId={setCurrentId} />
            </div> */}
        </div>
    )
}

export default Home;