const redux = require ('redux');
const createStore = redux.createStore;

const initial_state = {
    numberOfCookies : 10
}

//Action type
const BUY_COOKIE = 'BUY_COOKIE';
const COOKIE_RESTOCK = 'COOKIE_RESTOCK';

//Action creator
const orderCookie = () =>{
    return {
        type: BUY_COOKIE
    }
}

const restockCookie = (quantity) => {
    return {
        type : COOKIE_RESTOCK,
        payload : quantity
    }
}

//Reducer
const reducer = (state = initial_state ,action) => {
    switch (action.type){
        case BUY_COOKIE: {
            return {
                ...state,
                numberOfCookies:state.numberOfCookies - 1,
            }
        }
        case COOKIE_RESTOCK: {
            return {
                ...state,
                numberOfCookies:state.numberOfCookies + action.payload
            }
        }
        default:
            return state;
    }
}

const store = createStore(reducer);

console.log("Initial State",store.getState());
const listener = store.subscribe(() => { console.log("Updated value ", store.getState())});
console.log(store.dispatch(orderCookie()));
console.log(store.dispatch(orderCookie()));
console.log(store.dispatch(orderCookie()));
console.log(store.dispatch(orderCookie()));
console.log(store.dispatch(restockCookie(10 - store.getState().numberOfCookies)))

//Remove or Unregister listener
listener();