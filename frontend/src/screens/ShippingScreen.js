import React, {useState, useEffect} from 'react'
import {Form, Button} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux"
import FormContainer from "../components/FormContainer"
import { saveShippingAddress } from '../redux/actions/cartActions'
import CheckoutSteps from "../components/CheckoutSteps"

const ShippingScreen = ({history}) => {
  const dispatch = useDispatch()
  const {shippingAddress} = useSelector(state => state.cart)
  const [state, setState] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: ""
  })

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress(state))
    history.push("/login?redirect=payment")
  }

  const handleChange = (e) => {
    const {name, value} = e.target
    setState({...state, [name] : value} )
  }

  const {address, city, postalCode, country} = state

  useEffect(() => {
    if(shippingAddress){
      setState(shippingAddress)
    }
  }, [shippingAddress, history])

  return (
    <FormContainer>
      <CheckoutSteps step1={true} step2={true} />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address:</Form.Label>
          <Form.Control type="text" placeholder="Enter address..."
            value={address} 
            name="address" 
            required
            onChange={handleChange}>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City:</Form.Label>
          <Form.Control type="text" placeholder="Enter city..."
            value={city} 
            name="city" 
            required
            onChange={handleChange}>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label>PostalCode:</Form.Label>
          <Form.Control type="text" placeholder="Enter postal code..."
            value={postalCode} 
            name="postalCode" 
            required
            onChange={handleChange}>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Country:</Form.Label>
          <Form.Control type="text" placeholder="Enter country..."
            value={country} 
            name="country" 
            required
            onChange={handleChange}>
          </Form.Control>
        </Form.Group>

        <Button 
          type="submit" 
          variant="primary" 
          className="btn btn-primary btn-block">
          Proceed
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
