import axios from "axios"

import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  SELLER_PRODUCTS_REQUEST,
  SELLER_PRODUCTS_SUCCESS,
  SELLER_PRODUCTS_FAIL,
  ADMIN_PRODUCTS_REQUEST,
  ADMIN_PRODUCTS_SUCCESS,
  ADMIN_PRODUCTS_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
} from "../constants/productConstants";

export const getProducts = (category = '') => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCTS_REQUEST });  // Dispatch request action

    let link = `${process.env.REACT_APP_API}/api/v1/products?`;
    if (category) {
      link = `${process.env.REACT_APP_API}/api/v1/products?category=${category}`;  // If category exists, add it to the query string
    }

    const { data } = await axios.get(link);  // Fetch products based on the category

    // Dispatch success action with payload
    dispatch({
      type: ALL_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // Dispatch fail action with error message
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: error.response.data.errMessage,
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.errMessage,
    });
  }
};

export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    };

    const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/review`, reviewData, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,

      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,

      payload: error.response.data.errMessage,
    });
  }
};

export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCTS_REQUEST });

    const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/products`,{withCredentials: true});

    dispatch({
      type: ADMIN_PRODUCTS_SUCCESS,

      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCTS_FAIL,

      payload: error.response.data.errMessage,
    });
  }
};

export const getSellerProducts = () => async (dispatch) => {
  try {
    dispatch({ type: SELLER_PRODUCTS_REQUEST });

    const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/seller/products`,{withCredentials: true});

    dispatch({
      type: SELLER_PRODUCTS_SUCCESS,

      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: SELLER_PRODUCTS_FAIL,

      payload: error.response.data.errMessage,
    });
  }
};

export const newProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    };
    
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/add/product/new`,
      productData,
      config
    );

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,

      payload: error.response.data.errMessage,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/U&D/product/${id}`,{withCredentials: true});

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,

      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,

      payload: error.response.data.errMessage,
    });
  }
};

// Update Product (ADMIN)

export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/U&D/product/${id}`,
      productData,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,

      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,

      payload: error.response.data.errMessage,
    });
  }
};

// Get product reviews
export const getProductReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_REVIEWS_REQUEST });

    const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/reviews?id=${id}`,{withCredentials: true});

    dispatch({
      type: GET_REVIEWS_SUCCESS,

      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: GET_REVIEWS_FAIL,

      payload: error.response.data.errMessage,
    });
  }
};

// Delete product review
export const deleteReview = (id, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `${process.env.REACT_APP_API}/api/v1/reviews?id=${id}&productId=${productId}`,{withCredentials: true}
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,

      payload: data.success,
    });
  } catch (error) {

    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.errMessage,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};