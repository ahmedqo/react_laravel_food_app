import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO } from "../constants/CartConst";
import { getProduct } from "./ProductAction";

export const addToCart = (id, quantity = 1) => async(dispatch, getState) => {
    const [type, data] = await getProduct(id);
    if (type) {
        dispatch({
            type: ADD_TO_CART,
            payload: {
                product: data.id,
                name: data.name,
                price: data.price,
                image: data.image,
                quantity,
            },
        });

        localStorage.setItem("KING_FOOD_CART_ITEMS", JSON.stringify(getState().cart.cartItems));
    }
};

export const delFromCart = (id) => async(dispatch, getState) => {
    dispatch({
        type: REMOVE_FROM_CART,
        payload: id,
    });

    localStorage.setItem("KING_FOOD_CART_ITEMS", JSON.stringify(getState().cart.cartItems));
};

export const clearCart = () => async(dispatch, getState) => {
    dispatch({
        type: CLEAR_CART,
    });

    localStorage.setItem("KING_FOOD_CART_ITEMS", JSON.stringify(getState().cart.cartItems));
};

export const saveInfo = (data) => async(dispatch, getState) => {
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data,
    });

    localStorage.setItem("KING_FOOD_SHIPPING_INFO", JSON.stringify(getState().cart.info));
};