import { FETCH_ALL_COLLECTIONS, CREATE_COLLECTION, BASE_URL, START_LOADING, END_LOADING, FETCH_COLLECTION } from '../components/constants/collectionActionTypes';

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

export const getCollections = () =>  async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const req = await fetch(`${BASE_URL}/collections`,{
            headers: setHeaders({})});
        const data = await req.json();
        if(data.status === "ok"){ 
            dispatch({ type: FETCH_ALL_COLLECTIONS, payload: data });
        }
        dispatch({type: END_LOADING});
    } catch (error) {
        console.log(error); 
    }
}

export const createCollection = ({ collectionName, topic, description, collectionImage, name }) => async (dispatch) => {
    try {
        const collection = { collectionName, topic, description, collectionImage: collectionImage.filesUploaded[0].url, name };
        const req = await fetch(`${BASE_URL}/collections`,{
            headers: setHeaders({
                'Content-Type': 'application/json',
            }),
            method: 'POST',
            body: JSON.stringify(collection)
        });
        const data = await req.json()
        if(data.status === "ok"){ 
            dispatch({ type: CREATE_COLLECTION, payload: data.newCollection });
        }
    } catch (error) {
        console.log(error); 
    }
}

export const getCollection = (id) =>  async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const req = await fetch(`${BASE_URL}/collections/${id}`,{
            headers: setHeaders({})});
        const data = await req.json();
        dispatch({ type: FETCH_COLLECTION, payload: data });
        
        dispatch({type: END_LOADING})
    } catch (error) {
        console.log(error); 
    }
}