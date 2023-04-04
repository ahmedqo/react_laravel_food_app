import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { CartReducer } from "./reducers/CartReducer";

const reducer = combineReducers({
    cart: CartReducer,
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem("KING_FOOD_CART_ITEMS") ? JSON.parse(localStorage.getItem("KING_FOOD_CART_ITEMS")).reverse() : [],
        info: localStorage.getItem("KING_FOOD_SHIPPING_INFO") ? JSON.parse(localStorage.getItem("KING_FOOD_SHIPPING_INFO")) : {},
    },
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;