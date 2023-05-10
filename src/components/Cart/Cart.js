import React, { useContext, useState } from 'react'
import axios from "axios"
import CartContext from '../../store/cart-context'
import Checkout from './Checkout'
import Modal from '../UI/Modal'
import CartItem from './CartItem'
import classes from './Cart.module.css'

function Cart(props) {

    const [isCheckout, setIsCheckout] = useState(false)
    const cartCtx = useContext(CartContext)
    const totalAmount = `Rs.${cartCtx.totalAmount.toFixed(2)}`
    const hasItems = cartCtx.items.length > 0

    const cartItemAdd = (item) => {
        const cartItem = { ...item, amount: 1 };
        cartCtx.addItem(cartItem);

    }

    const cartItemRemove = (id) => {
        console.log(id)
        cartCtx.removeItem(id)
    }

    const orderHandler = () => {
        setIsCheckout(true)
    }

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemove.bind(null, item.id)}
                    onAdd={cartItemAdd.bind(null, item)}
                />
            ))}
        </ul>
    )

    const submitHandler = (userdata) => {
        axios({
            method: 'post',
            url: 'https://food-project-b4b9e-default-rtdb.firebaseio.com/orders.json',
            data: JSON.stringify({
                user: userdata,
                orderedItems: cartCtx.items
            })
        })
        cartCtx.clearCart()
    }

    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onCancel={props.onClose} onConfirm={submitHandler} />}
            <div className={classes.actions}>
                <button className={classes['button-alt']} onClick={props.onClose}>Close</button>
                {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
            </div>

        </Modal>
    )
}

export default Cart
