import axios from "axios";

export const loginUser = async(user) => {
    try {
        const { data } = await axios.post("login", user);

        if (data.status.type === "success") {
            localStorage.setItem("food_token", data.data.token)
            localStorage.setItem("food_role", data.data.user.role)
            axios.defaults.headers.common["Authorization"] = "Bearer " + data.data.token;
            return [true, data.data];
        } else return [false, data.status];
    } catch (error) {
        return [false, { message: error.message, type: "error" }];
    }
};

export const loadUser = async() => {
    try {
        const { data } = await axios.get("me");

        return [true, data.data];
    } catch (error) {
        return [false, { message: error.message, type: "error" }];
    }
};

export const logoutUser = async() => {
    try {
        localStorage.removeItem("food_token");
        localStorage.removeItem("food_role")
        const { data } = await axios.get("logout");

        if (data.status.type === "success") return [true, data.status];
        else return [false, data.status]
    } catch (error) {
        return [false, { message: error.message, type: "error" }];
    }
};

export const updateProfile = async(user) => {
    try {
        const { data } = await axios.put("me/update", user);

        if (data.status.type === "success") return [true, data.status];
        else return [false, data.status]
    } catch (error) {
        return [false, { message: error.message, type: "error" }];
    }
};

export const updatePassword = async(passwords) => {
    try {
        const { data } = await axios.put("password/update", passwords);

        if (data.status.type === "success") return [true, data.status];
        else return [false, data.status]
    } catch (error) {
        return [false, { message: error.message, type: "error" }];
    }
};

export const forgotPassword = async(email) => {
    try {
        const { data } = await axios.post("password/forgot", email);

        if (data.status.type === "success") return [true, data.status];
        else return [false, data.status]
    } catch (error) {
        return [false, { message: error.message, type: "error" }];
    }
};

export const resetPassword = async(token, passwords) => {
    try {
        const { data } = await axios.put(`password/reset/${token}`, passwords);

        if (data.status.type === "success") return [true, data.status];
        else return [false, data.status]
    } catch (error) {
        return [false, { message: error.message, type: "error" }];
    }
};

export const getUsers = async() => {
    try {
        const { data } = await axios.get("admin/users");

        return [true, data.data];
    } catch (error) {
        return [false, { message: error.message, type: "error" }];
    }
};

export const getUser = async(id) => {
    try {
        const { data } = await axios.get(`admin/user/${id}`);

        return [true, data.data];
    } catch (error) {
        return [false, { message: error.message, type: "error" }];
    }
};

export const createUser = async(user) => {
    try {
        const { data } = await axios.post("register", user);

        if (data.status.type === "success") return [true, data.status];
        else return [false, data.status];
    } catch (error) {
        return [false, { message: error.message, type: "error" }];
    }
};

export const updateUser = async({ id, ...user }) => {
    try {
        const { data } = await axios.put(`admin/user/${id}`, user);

        if (data.status.type === "success") return [true, data.status];
        else return [false, data.status]
    } catch (error) {
        return [false, { message: error.message, type: "error" }];
    }
};

export const deleteUser = async(id) => {
    try {
        const { data } = await axios.delete(`admin/user/${id}`);

        if (data.status.type === "success") return [true, data.status];
        else return [false, data.status]
    } catch (error) {
        return [false, { message: error.message, type: "error" }];
    }
};