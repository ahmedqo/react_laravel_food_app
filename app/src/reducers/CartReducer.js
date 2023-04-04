import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO } from "../constants/CartConst";

export const CartReducer = (state = { cartItems: [], shippingInfo: {} }, { type, payload }) => {
    switch (type) {
        case ADD_TO_CART:
            const item = payload;
            const isItemExist = state.cartItems.find((el) => el.product === item.product);

            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((el) => (el === isItemExist ? {...el, quantity: el.quantity + item.quantity } : el)),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item].reverse(),
                };
            }
        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((el) => el.product !== payload),
            };
        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                info: payload,
            };
        case CLEAR_CART:
            return {
                ...state,
                cartItems: [],
            };
        default:
            return state;
    }
};