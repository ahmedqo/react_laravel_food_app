import axios from "axios";

export const getCuisines = async () => {
    try {
        const {data} = await axios.get("cuisines");

        return [true, data.data];
    } catch(error) {
        return [false, {message: error.message, type: "error"}];
    }
};

export const getCuisine = async (id) => {
    try {
        const {data} = await axios.get(`cuisine/${id}`);

        return [true, data.data];
    } catch(error) {
        return [false, {message: error.message, type: "error"}];
    }
};

export const createCuisine = async (cuisine) => {
    try {
        const {data} = await axios.post("admin/cuisine/new", cuisine);

        if(data.status.type === "success") return [true, data.data];
        else return [false, data.status];
    } catch(error) {
        return [false, {message: error.message, type: "error"}];
    }
};

export const updateCuisine = async ({id, label}) => {
    try {
        const {data} = await axios.put(`admin/cuisine/${id}`, {label});

        if(data.status.type === "success") return [true, data.status];
        else return [false, data.status]
    } catch(error) {
        return [false, {message: error.message, type: "error"}];
    }
};

export const deleteCuisine = async (id) => {
    try {
        const {data} = await axios.delete(`admin/cuisine/${id}`);

        if(data.status.type === "success") return [true, data.status];
        else return [false, data.status]
    } catch(error) {
        return [false, {message: error.message, type: "error"}];
    }
};