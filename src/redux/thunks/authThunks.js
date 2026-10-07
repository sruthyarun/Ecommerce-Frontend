import axiosInstance from "../../api/axiosInstance";

import {
    loginStart,
    loginSuccess,
    loginFailure
} from "../slices/authSlice";

export const loginUser = (loginData) => async (dispatch) => {
    try {
        dispatch(loginStart());

        const response = await axiosInstance.post(
            "/auth/login",
            loginData
        );

        dispatch(loginSuccess(response.data));

        return response.data;

    } catch (error) {
        const message =
            error.response?.data?.message ||
            "Login failed";

        dispatch(loginFailure(message));

        throw new Error(message);
    }
};