import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_ITEM, CREATE, UPDATE, DELETE, LIKE, START_LOADING, END_LOADING, COMMENT, BASE_URL} from '../components/constants/actionTypes';
import * as api from '../api';

function setHeaders(headers) {
    if(localStorage.getItem('profile')) {
        return {
            ...headers,
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
        }
    } else {
        return headers;
    }
}
export const getItem = (id) =>  async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const { data } = await api.fetchItem(id);
        dispatch({ type: FETCH_ITEM, payload: data });
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error); 
    }
}

export const getItems = () =>  async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const req = await fetch("http://localhost:5000/items",{
            headers: setHeaders({})});
        const data = await req.json();
        if(data.status === "ok"){ 
            dispatch({ type: FETCH_ALL, payload: data });
        }
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error); 
    }
}

export const getItemsBySearch = (searchQuery) => async (dispatch) => {
    console.log(searchQuery);
    try {
        dispatch({type: START_LOADING});
        const { data } = await api.fetchItemsBySearch(searchQuery);
        dispatch({ type: FETCH_BY_SEARCH, payload: data });
        console.log(data);
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}

export const createItem = (item) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const req = await fetch("http://localhost:5000/items",{
            headers: setHeaders({
                'Content-Type': 'application/json',
            }),
            method: 'POST',
            body: JSON.stringify(item)
        });
        const data = await req.json()
        if(data.status === "ok"){ 
            dispatch({ type: CREATE, payload: data.newItem });
        }
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error); 
    }
}

export const updateItem = (id, item) => async (dispatch) => {
    try{
        const { data } = await api.updateItem(id, item);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error)
    }
}

export const deleteItem = (id) => async (dispatch) => {
    try{
        const response = await fetch(`http://localhost:5000/items/${id}`,{
            method: 'DELETE', 
            headers: setHeaders({
                'Content-Type': 'application/json',
            }),
        })
        const data = await response.json();
        if(data.status === 'ok' ){ 
            dispatch({ type: DELETE, payload: id });
        }
    } catch (error) {
        console.log(error)
    }
}

export const likeItem = (id) => async (dispatch) => {
    try{
        const response = await fetch(`http://localhost:5000/items/${id}/likeItem`,{
            method: 'PUT', 
            headers: setHeaders({
                'Content-Type': 'application/json',
            }),
        })
        console.log(response);
        const data = await response.json();
        console.log(data);
        if(data.status === 'ok' ) {
            dispatch({ type: LIKE, payload: data.updatedItem });
        }
    } catch (error) {
        console.log('HERE IT IS');
        
        console.log(error)
    }
}

export const commentItem = (value, id) => async (dispatch) => {
    try{
        const { data } = await api.commentItem(value, id);

        dispatch({ type: COMMENT , payload: data });
        return data.comments;
    } catch (error) {
        console.log(error)
    }
}