import axiosInstance from "../../api/axiosInstance";

import {
    fetchOrdersStart,
    fetchOrdersSuccess,
    fetchOrdersFailure,
    addOrder
} from "../slices/orderSlice";

export const fetchOrders = () => async (dispatch) => {
    try {
        dispatch(fetchOrdersStart());

        const response = await axiosInstance.get("/orders");

        dispatch(
            fetchOrdersSuccess(
                response.data.orders || response.data
            )
        );

    } catch (error) {
        console.error(
            "Fetch orders error:",
            error.response?.data || error
        );

        const message =
            error.response?.data?.message ||
            error.response?.data?.error ||
            error.message ||
            "Failed to fetch orders";

        dispatch(fetchOrdersFailure(message));
    }
};

export const createOrder = (orderData) => async (dispatch) => {
    try {
        console.log(
            "Order data being sent:",
            orderData
        );

        const response = await axiosInstance.post(
            "/orders",
            orderData
        );

        console.log(
            "Order response:",
            response.data
        );

        const order =
            response.data.order || response.data;

        dispatch(addOrder(order));

        return order;

    } catch (error) {
        console.error(
            "FULL ORDER ERROR:",
            JSON.stringify(
                error.response?.data || error,
                null,
                2
            )
        );

        const message =
            error.response?.data?.message ||
            error.response?.data?.error ||
            error.message ||
            "Failed to create order";

        dispatch(fetchOrdersFailure(message));

        throw new Error(message);
    }
};