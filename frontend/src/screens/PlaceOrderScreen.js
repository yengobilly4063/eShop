import React, { useState, useEffect } from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import { createOrder } from '../redux/actions/orderActions';

const PlaceOrderScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart);
	const {userInfo} = useSelector((state) => state.userLogin);
	const { order, success, error } = useSelector((state) => state.orderState);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!order) {
			history.push('/placeorder');
		}
		if (success) {
			history.push(`/order/${order._id}`)
		}
	}, [order, history, success]);

	if (!cart.paymentMethod) {
		history.push('login?redirect=payment');
	}

	// calculate prices
	cart.itemsPrice = cart.cartItems.reduce((cum, item) => (cum += item.price * item.qty), 0);

	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};

	cart.shippingPrice = addDecimals(cart.itemsPrice > 500 ? 0 : 100);
	cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));

	cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2);

	const placeOrderHandler = () => {
		const order = {
			orderItems: cart.cartItems,
			user: userInfo._id,
			shippingAddress: cart.shippingAddress,
			paymentMethod: cart.paymentMethod,
			itemsPrice: cart.itemsPrice,
			taxPrice: cart.taxPrice,
			shippingPrice: cart.shippingPrice,
			totalPrice: cart.totalPrice,
		};
		dispatch(createOrder(order));
	};

	return (
		<div>
			<CheckoutSteps step1={true} step2={true} step3={true} step4={true} />
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Address: </strong>
								{cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{' '}
								{cart.shippingAddress.country}
							</p>
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Payment Method</h2>
							<strong>Method: </strong>
							{cart.paymentMethod}
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Order Items</h2>
							{cart.cartItems.length === 0 ? (
								<Message>Your cart is empty</Message>
							) : (
								<ListGroup variant='flush'>
									{cart.cartItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md='1'>
													<Image src={item.image} alt={item.name} fluid rounded></Image>
												</Col>
												<Col>
													<Link to={`/product/${item.product}`}>{item.name}</Link>
												</Col>
												<Col md={4}>
													{item.qty} x {item.price} = ${addDecimals(item.price * item.qty)}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup>
							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Items</Col>
									<Col>$ {cart.itemsPrice.toFixed(2)}</Col>
								</Row>
								<Row>
									<Col>Shipping</Col>
									<Col>$ {cart.shippingPrice}</Col>
								</Row>
								<Row>
									<Col>Tax</Col>
									<Col>$ {cart.taxPrice}</Col>
								</Row>
								<hr />
								<Row>
									<Col>Total</Col>
									<Col>$ {cart.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							{error && <Message variant="danger">{error}</Message>}
							<ListGroup.Item>
								<Button
									type='button'
									className='btn-block'
									onClick={placeOrderHandler}
									disabled={cart.cartItems.length === 0}
								>
									Complete Order
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default PlaceOrderScreen;
