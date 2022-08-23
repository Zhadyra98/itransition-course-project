import { FETCH_ALL_COLLECTIONS, CREATE_COLLECTION, START_LOADING, END_LOADING, FETCH_COLLECTION } from '../components/constants/collectionActionTypes';
// eslint-disable-next-line
export default (state = { isLoading: true, collections: [] }, action) => {
    switch (action.type) {
        case FETCH_ALL_COLLECTIONS:
            return {
                ...state,
                collections: action.payload.data
            }
        case CREATE_COLLECTION:
            return {
                ...state, 
                collections: [...state.collections, action.payload]
            }
        case FETCH_COLLECTION:
            return {
                ...state, collection: action.payload 
            }
        case START_LOADING: 
            return { ...state, isLoading:true };
        case END_LOADING: 
            return { ...state, isLoading:false };
        default:
            return state;
    }
}