import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import {productListReducer, productDetailsReducer} from "./redux/reducers/productReducers.js"
import { cartReducers } from "./redux/reducers/cartReducers.js"
import {userLoginReducer, userRegisterReducer} from "./redux/reducers/userReducers"

const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducers,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  cart: {cartItems: cartItemsFromStorage},
  userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducers, initialState, 
  composeWithDevTools(applyMiddleware(...middleware)))

export default store