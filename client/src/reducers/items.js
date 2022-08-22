import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_ITEM, CREATE, UPDATE, DELETE, LIKE, COMMENT, START_LOADING, END_LOADING } from '../components/constants/actionTypes';
// eslint-disable-next-line
export default (state = { isLoading: true, items: [] }, action) => {
    switch (action.type) {
        case FETCH_ALL:
            return {
                ...state,
                items: action.payload.data
            }
        case FETCH_BY_SEARCH:
            return { ...state, items: action.payload };
        case FETCH_ITEM:
            return { ...state, item: action.payload };
        case START_LOADING: 
            return { ...state, isLoading:true };
        case END_LOADING: 
            return { ...state, isLoading:false };
        case CREATE:
            return {...state, items: [...state.items, action.payload]}
        case UPDATE:
        case LIKE:
            return { ...state, items: state.items.map((item) => item._id === action.payload._id ? action.payload : item)}
        case COMMENT:
            return { 
                ...state, 
                items: state.items.map((item) => {
                if(item._id === action.payload._id) return action.payload;
                return item;
            })
        }
            case DELETE:
            return { ...state, items: state.items.filter((item) => item._id !== action.payload)}
        default:
            return state;
    }
}