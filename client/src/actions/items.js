import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../components/constants/actionTypes';
import * as api from '../api';

export const getItems = () =>  async (dispatch) => {
    try {
        const { data } = await api.fetchItems();
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error); 
    }
}

export const getItemsBySearch = (searchQuery) => async (dispatch) => {
    try {
        const { data } = await api.fetchItemsBySearch(searchQuery);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

export const createItem = (item) => async (dispatch) => {
    try{
        const { data } = await api.createItem(item);

        dispatch({ type: CREATE, payload: data });
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