import axiosInstance from "../../api/axiosInstance";

import {
    fetchProductsStart,
    fetchProductsSuccess,
    fetchProductsFailure,
    setSelectedProduct
} from "../slices/productSlice";

export const fetchProducts = () => async (dispatch) => {
    try {
        dispatch(fetchProductsStart());

        const response = await axiosInstance.get("/products");

        dispatch(
            fetchProductsSuccess(response.data.products)
        );

    } catch (error) {
        const message =
            error.response?.data?.message ||
            "Failed to fetch products";

        dispatch(fetchProductsFailure(message));
    }
};

export const fetchProductById = (id) => async (dispatch) => {
    try {
        dispatch(fetchProductsStart());

        const response = await axiosInstance.get(
            `/products/${id}`
        );

        dispatch(
            setSelectedProduct(response.data.product)
        );

    } catch (error) {
        const message =
            error.response?.data?.message ||
            "Failed to fetch product";

        dispatch(fetchProductsFailure(message));
    }
};