import axios from "axios";

export const myReserves = async() => {
    try {
        const { data } = await axios.get("reserves/me");

        return [true, data.data];
    } catch (error) {
        return [false, error.message];
    }
};

export const getReserves = async() => {
    try {
        const { data } = await axios.get("admin/reserves");

        return [true, data.data];
    } catch (error) {
        return [false, error.message];
    }
};

export const getReserve = async(id) => {
    try {
        const { data } = await axios.get(`reserve/${id}`);

        return [true, data.data];
    } catch (error) {
        return [false, error.message];
    }
};

export const createReserve = async(reserve) => {
    try {
        const { data } = await axios.post("reserve/new", reserve);

        if (data.status.type === "success") return [true, data.status];
        else return [false, data.status]
    } catch (error) {
        return [false, error.message];
    }
};

export const updateReserve = async({ id, ...reserve }) => {
    try {
        const { data } = await axios.put(`admin/reserve/${id}`, reserve);

        if (data.status.type === "success") return [true, data.status];
        else return [false, data.status]
    } catch (error) {
        return [false, error.message];
    }
};

export const deleteReserve = async(id) => {
    try {
        const { data } = await axios.delete(`admin/reserve/${id}`);

        if (data.status.type === "success") return [true, data.status];
        else return [false, data.status]
    } catch (error) {
        return [false, error.message];
    }
};