const { createStore, applyMiddleware } = require('redux');
const axios = require('axios');
const {thunk} = require('redux-thunk');

// Initial State
const initial_state = {
    loading: false,
    data: [],
    error: '',
};

// Action Types
const FETCH_USER_DATA = "FETCH_USER_DATA";
const FETCH_USER_DATA_SUCCEEDED = "FETCH_USER_DATA_SUCCEEDED";
const FETCH_USER_DATA_FAILED = "FETCH_USER_DATA_FAILED";

// Action Creators
const fetchUser = () => ({ type: FETCH_USER_DATA });
const onSuccess = (user) => ({ type: FETCH_USER_DATA_SUCCEEDED, payload: user });
const onFailure = (error) => ({ type: FETCH_USER_DATA_FAILED, payload: error });

// Reducer (With Default Case)
const reducer = (state = initial_state, action) => {
    switch (action.type) {
        case FETCH_USER_DATA:
            return { ...state, loading: true };
        case FETCH_USER_DATA_SUCCEEDED:
            return { loading: false, data: action.payload, error: '' };
        case FETCH_USER_DATA_FAILED:
            return { loading: false, data: [], error: action.payload };
        default:
            return state; 
    }
};

// Async Action Creator
const fetchUserFromAPI = () => async (dispatch) => {
    dispatch(fetchUser());
    try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users/hsebfkus");
        const name = response.data.map((obj) => obj.name);
        dispatch(onSuccess(name));
    } catch (error) {
        dispatch(onFailure(error.message));
    }
};

// Create Store
const store = createStore(reducer, applyMiddleware(thunk)); 
store.subscribe(() => console.log("Updated State:", store.getState()));
store.dispatch(fetchUserFromAPI());
