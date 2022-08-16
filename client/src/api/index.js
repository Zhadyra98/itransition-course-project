import axios from 'axios';

const API = axios.create({ baseURL: "http://localhost:5000" })

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const fetchItems = (page) => API.get(`/items?page=${page}`);
export const fetchItemsBySearch = (searchQuery) => API.get(`/items/search?searchQuery=${searchQuery.search || 'none'}`);
export const createItem = (newItem) => API.post('/items', newItem);
export const updateItem = (id, updatedItem) => API.patch(`/items/${id}`, updatedItem);
export const deleteItem = (id) => API.delete(`/items/${id}`);
export const likeItem = (id) => API.patch(`/items/${id}/likeItem`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);