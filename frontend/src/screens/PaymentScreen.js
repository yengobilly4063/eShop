import React, {useState, useEffect} from 'react'
import {Form, Button, Col} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux"
import FormContainer from "../components/FormContainer"
import { savePaymentMethod } from '../redux/actions/cartActions'
import CheckoutSteps from "../components/CheckoutSteps"

const PaymentScreen = ({history}) => {
  const dispatch = useDispatch()
  const {shippingAddress} = useSelector(state => state.cart)

  if(!shippingAddress){
    history.push("/shipping")
  }

  const [state, setState] = useState({
    paymentMethod: "PayPal",
  })

  const {paymentMethod} = state

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push("/login?redirect=placeorder")
  }

  const handleChange = (e) => {
    const {name, value} = e.target
    setState({...state, [name] : value} )
  }


  return (
    <FormContainer>
      <CheckoutSteps step1={true} step2={true} step3={true} />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="paymentMethod">
          <Form.Label as="legend">Select Payment Method:</Form.Label>
          <Col>
            <Form.Check type="radio" label="PayPal or Credit Card"
            id="PayPal"
            name="paymentMethod"
            value="PayPal"
            checked
            onChange={handleChange}
            ></Form.Check>
            {/* <Form.Check type="radio" label="Stripe"
            id="Stripe"
            name="paymentMethod"
            value="Stripe"
            onChange={handleChange}
            ></Form.Check> */}
          </Col>
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

export default PaymentScreen
