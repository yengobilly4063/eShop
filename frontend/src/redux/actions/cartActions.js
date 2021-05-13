import axios from "axios";
import {CART_ADD_ITEM, CART_REMOVE_ITEM, CARD_SAVE_SHIPPING_ADDRESS} from "../types/cartActionTypes"

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product_id: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => async (dispatch, getState) => {
  
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (shippingData) => async (dispatch) => {
  
  dispatch({
    type: CARD_SAVE_SHIPPING_ADDRESS,
    payload: shippingData,
  })

  localStorage.setItem('shippingAddress', JSON.stringify(shippingData))
}
