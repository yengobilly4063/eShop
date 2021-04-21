import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import {productListReducer, productDetailsReducer} from "./redux/reducers/productReducers.js"
import { cartReducers } from "./redux/reducers/cartReducers.js"

const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducers
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage
  }
}

const middleware = [thunk]

const store = createStore(reducers, initialState, 
  composeWithDevTools(applyMiddleware(...middleware)))

export default store