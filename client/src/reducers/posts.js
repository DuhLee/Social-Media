import { FETCH_POST, FETCH_ALL, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, START_LOADING, END_LOADING } from '../constants/actionTypes';

const reducer = (state = { isLoading: true, posts: []}, action) => {

    switch (action.type) {

        case START_LOADING:
            return { ...state, isLoading: true };
        case END_LOADING:
            return { ...state, isLoading: false };

        case FETCH_POST:

            console.log("FETCH_POSt");
            console.log(action.payload);

            return { 
                ...state, 
                post: action.payload,
            }


        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };

        case FETCH_BY_SEARCH:
            return {
                ...state,
                posts: action.payload.data 
            };
        
        case CREATE:
            return {...state, post: action.payload};

        case UPDATE:
            return  { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)};
        
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload)};
        
        default:
            return state;
    }
}

export default reducer;