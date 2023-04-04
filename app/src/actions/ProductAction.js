import axios from "axios";

export const getProducts = async(keyword = "", cuisine = "0", price = [0, 500]) => {
    try {
        const { data } = await axios.get("products");
        var products = data.data.filter((el) => el.price >= price[0] && el.price <= price[1]);

        if (keyword.length)
            products = products.filter(
                (el) => el.name.toLowerCase().includes(keyword.toLowerCase()) || keyword.toLowerCase().includes(el.name.toLowerCase())
            );

        if (cuisine !== "0") products = products.filter((el) => String(el.cuisine.id) === cuisine);
        products = products.map(el => ({...el, ingridients: JSON.parse(el.ingridients) }));

        return [true, products];
    } catch (error) {
        return [false, error.message];
    }
};

export const getProduct = async(id) => {
    try {
        const { data } = await axios.get(`product/${id}`);
        data.data.ingridients = JSON.parse(data.data.ingridients)

        return [true, data.data];
    } catch (error) {
        return [false, error.message];
    }
};

export const getTops = async() => {
    try {
        const { data } = await axios.get("admin/products/top");

        return [true, data.data];
    } catch (error) {
        return [false, error.message];
    }
};

export const createProduct = async(product) => {
    try {
        const { data } = await axios.post("admin/product/new", product);

        if (data.status.type === "success") return [true, data.status];
        else return [false, data.status]
    } catch (error) {
        return [false, error.message];
    }
};

export const updateProduct = async({ id, ...product }) => {
    try {
        const { data } = await axios.put(`admin/product/${id}`, product);

        if (data.status.type === "success") return [true, data.status];
        else return [false, data.status]
    } catch (error) {
        return [false, error.message];
    }
};

export const deleteProduct = async(id) => {
    try {
        const { data } = await axios.delete(`admin/product/${id}`, {});

        if (data.status.type === "success") return [true, data.status];
        else return [false, data.status]
    } catch (error) {
        return [false, error.message];
    }
};