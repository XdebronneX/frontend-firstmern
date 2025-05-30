import axios from "axios";

import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  CLEAR_ERRORS,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  ALL_SELLER_ORDERS_REQUEST,
  ALL_SELLER_ORDERS_SUCCESS,
  ALL_SELLER_ORDERS_FAIL,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    };

    const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/order/new`, order, config);

    dispatch({
      type: CREATE_ORDER_SUCCESS,

      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,

      payload: error.response?.data?.message || "Error creating order",
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

// Get curretly logged in user orders

export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST });

    const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/orders/me`, {withCredentials: true});

    dispatch({
      type: MY_ORDERS_SUCCESS,

      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,

      payload: error.response?.data?.message || "Error loading orders",
    });
  }
};
// Get order details

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/order/${id}`,{withCredentials: true});

    dispatch({
      type: ORDER_DETAILS_SUCCESS,

      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,

      payload: error.response.data.message,
    });
  }
};

// Get all orders - ADMIN

export const allOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });

    const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/orders`,{withCredentials: true});

    dispatch({
      type: ALL_ORDERS_SUCCESS,

      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,

      payload: error.response?.data?.message || "Error loading orders",
    });
  }
};
export const allSellerOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_SELLER_ORDERS_REQUEST });

    const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/seller/orders`,{withCredentials: true});

    dispatch({
      type: ALL_SELLER_ORDERS_SUCCESS,

      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_SELLER_ORDERS_FAIL,

      payload: error.response?.data?.message || "Error loading seller orders",
    });
  }
};

export const updateOrder = (id, orderData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/U&D/order/${id}`,
      orderData,
      config
    );

    dispatch({
      type: UPDATE_ORDER_SUCCESS,

      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,

      payload: error.response?.data?.message || "Error updating order",
    }); 
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

    const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/admin/order/${id}`,{withCredentials: true});

    dispatch({
      type: DELETE_ORDER_SUCCESS,

      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,

      payload: error.response?.data?.message || "Error deleting order",
    });
  }
};
