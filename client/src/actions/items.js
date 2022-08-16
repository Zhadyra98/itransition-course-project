import { FETCH_ALL, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE, START_LOADING, END_LOADING} from '../components/constants/actionTypes';
import * as api from '../api';

export const getItems = (page) =>  async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const { data } = await api.fetchItems(page);
        console.log(data);
        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error); 
    }
}

export const getItemsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const { data: { data } } = await api.fetchItemsBySearch(searchQuery);
        dispatch({ type: FETCH_BY_SEARCH, payload: data });
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error);
    }
}

export const createItem = (item) => async (dispatch) => {
    try{
        dispatch({type: START_LOADING});
        const { data } = await api.createItem(item);
        dispatch({ type: CREATE, payload: data });
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error)
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
        await api.deleteItem(id);
        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error)
    }
}

export const likeItem = (id) => async (dispatch) => {
    try{
        const { data } = await api.likeItem(id);

        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log(error)
    }
}