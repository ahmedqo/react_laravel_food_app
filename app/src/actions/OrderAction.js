import axios from "axios";

export const myOrders = async() => {
    try {
        const { data } = await axios.get("orders/me");

        return [true, data.data];
    } catch (error) {
        return [false, error.message];
    }
};

export const getOrders = async() => {
    try {
        const { data } = await axios.get("admin/orders");
        data.data = data.data.map(el => ({...el, shipping: JSON.parse(el.shipping) }));

        return [true, data.data];
    } catch (error) {
        return [false, error.message];
    }
};

export const getOrder = async(id) => {
    try {
        const { data } = await axios.get(`order/${id}`);
        data.data.shipping = JSON.parse(data.data.shipping);

        return [true, data.data];
    } catch (error) {
        return [false, error.message];
    }
};

export const createOrder = async(order) => {
    try {
        const { data } = await axios.post("order/new", order);
	
        if (data.status.type === "success") return [true, data.status];
        else return [false, data.status]
    } catch (error) {
        return [false, error.message];
    }
};

export const updateOrder = async({ id, ...order }) => {
    try {
        const { data } = await axios.put(`admin/order/${id}`, order);

        if (data.status.type === "success") return [true, data.status];
        else return [false, data.status]
    } catch (error) {
        return [false, error.message];
    }
};

export const deleteOrder = async(id) => {
    try {
        const { data } = await axios.delete(`admin/order/${id}`);

        if (data.status.type === "success") return [true, data.status];
        else return [false, data.status]
    } catch (error) {
        return [false, error.message];
    }
};