import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import {Link} from "react-router-dom"
import {Row, Col, ListGroup, Image, Form, Button, Card} from "react-bootstrap"
import {addToCart, removeFromCart} from "../redux//actions/cartActions"

const CartScreen = ({match, history, location}) => {
  const productId = match.params.id

  const qty = location.search ? Number(location.search.split("=")[1]) : 1

  const dispatch = useDispatch()

  useEffect(() => {
    if(productId){
      dispatch(addToCart(productId, qty))
      history.push("/cart")
    }
  }, [productId, dispatch, qty])

  const {cartItems} = useSelector(state => state.cart)

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkOutHandler = () => {
    history.push("/login?redirect=shipping")
  }

  return (
    <>
      <Row >
        <Col md={8}>
          <Row>
            <Col md={8} >
              <h1>Your Shopping Cat</h1>
            </Col>
            <Col md={4} >
             <Link to="/">
              <Button className="mt-3" type="button" size="sm" variant="outline-info">
                 Continue Shopping
              </Button></Link>
            </Col>
          </Row>
          {cartItems.length === 0 ? <Message>Your cart is empty <br/> <Link to="/"><i size={25} className="fas fa-long-arrow-alt-left fa-lg"></i>Back</Link></Message>  :
            (
              <ListGroup variant="flush">
                {cartItems.map(item => (
                  <ListGroup.Item key={item.product_id} >
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} fluid alt={item.name} fluid rounded></Image> 
                      </Col>
                      <Col md={3}>
                        <Link to={`/product/${item.product_id}`}>{item.name}</Link>
                      </Col>
                      <Col md={2}>
                        $<i>{item.price}</i>
                      </Col>
                      <Col md={2}>
                        <Form.Control as="select" value={item.qty} onChange={(e) => dispatch(addToCart(item.product_id, Number(e.target.value)))}>
                            {
                              [...Array(item.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))
                            }
                          </Form.Control>
                      </Col>
                      <Col md={2}>
                        <Button type="button" variant="light" 
                          onClick={() => removeFromCartHandler(item.product_id)}>
                            <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup> 
            ) 
        }
          
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup varient="flush">
              <ListGroup.Item>
                <h2>Subtotal ({cartItems.reduce((total, item) => (total + item.qty), 0)}) items</h2>
                ${cartItems.reduce((total, item) => (total + (item.qty * item.price)), 0).toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button type="button" 
                  className="btn-block"
                  onClick={checkOutHandler} 
                  disabled={cartItems.length===0}>
                    Proceed to Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default CartScreen