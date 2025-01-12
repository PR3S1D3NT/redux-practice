const redux = require ('redux');
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const produce = require('immer').produce; 
const applyMiddleware = redux.applyMiddleware;
const reduxLogger = require('redux-logger');
const logger = reduxLogger.createLogger(); 


//Initial state
const initial_cookie_state = {
    numberOfCookies : 10
}

const initial_ice_cream_state = {
    numberOfIceCream : 20
}

//Action type
const BUY_COOKIE = 'BUY_COOKIE';
const COOKIE_RESTOCK = 'COOKIE_RESTOCK';
const ICE_CREAM_RESTOCK = 'ICE_CREAM_RESTOCK';
const BUY_ICE_CREAM = 'BUY_ICE_CREAM';
const ORDER_BOTH = 'ORDER_BOTH';

//Action creator
const orderCookie = () =>{
    return {
        type: BUY_COOKIE
    }
}

const orderIceCream = () =>{
    return {
        type: BUY_ICE_CREAM
    }
}

const restockCookie = (quantity) => {
    return {
        type : COOKIE_RESTOCK,
        payload : quantity
    }
}

const restockIceCream = (quantity) => {
    return {
        type : ICE_CREAM_RESTOCK,
        payload : quantity
    }
}

//Action which affects both the reducers
const orderIceCreamAndCookie = () => {
    return {
        type: ORDER_BOTH
    }
}

//Reducer
const cookieReducer = (state = initial_cookie_state ,action) => {
    switch (action.type){
        case ORDER_BOTH:
        case BUY_COOKIE: {
            return produce(state , (draftCopyofState) => {
                draftCopyofState.numberOfCookies -= 1;
            })
        }
        case COOKIE_RESTOCK: {
            return produce(state , (draftCopyofState) => {
                draftCopyofState.numberOfCookies += action.payload;
            })
        }
        default:
            return state;
    }
}

const iceCreamReducer = (state = initial_ice_cream_state ,action) => {
    switch (action.type){
        case ORDER_BOTH:
        case BUY_ICE_CREAM: {
            return produce(state , (draftCopyofState) => {
                draftCopyofState.numberOfIceCream -= 1;
            })
        }
        case ICE_CREAM_RESTOCK: {
            return produce(state , (draftCopyofState) => {
                draftCopyofState.numberOfIceCream += action.payload;
            })
        }
        default:
            return state;
    }
}


const rootReducer = combineReducers ({ Cookie : cookieReducer , Ice_Cream : iceCreamReducer });
const store = createStore(rootReducer, applyMiddleware(logger));

console.log("Initial State",store.getState());

//Assign listener which listens to state updates
const listener = store.subscribe(() => {});

console.log(store.dispatch(orderCookie()));
console.log(store.dispatch(orderCookie()));
console.log(store.dispatch(restockCookie(10 - store.getState().Cookie.numberOfCookies)))
console.log(store.dispatch(orderIceCream()));
console.log(store.dispatch(orderIceCream()));
console.log(store.dispatch(restockIceCream(20 - store.getState().Ice_Cream.numberOfIceCream)))
console.log(store.dispatch(orderIceCreamAndCookie()));
console.log(store.dispatch(orderIceCreamAndCookie()));
console.log(store.dispatch(orderIceCreamAndCookie()));

//Remove or Unregister listener
listener();