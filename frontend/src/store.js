import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import {productListReducer, productDetailsReducer} from "./redux/reducers/productReducers.js"
import { cartReducers } from "./redux/reducers/cartReducers.js"
import {userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer} from "./redux/reducers/userReducers"

const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducers,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAddressFromStorage = localStorage.getItem("shippingAddress") ? 
  JSON.parse(localStorage.getItem("shippingAddress")) :
  {}

const initialState = {
  cart: {cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage},
  userLogin: {userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(reducers, initialState, 
  composeWithDevTools(applyMiddleware(...middleware)))

export default store