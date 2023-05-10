import React, { useReducer } from 'react'
import CartContext from './cart-context'

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        // console.log(state.items)
        // console.log(action.item)
        let updatedItems;
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        if (state.items.find((item)=> item.id === action.item.id)) {
            updatedItems = state.items.map((item) => (
                item.id === action.item.id ? { ...item, amount: item.amount + action.item.amount } : item
            ))
        } else {
            updatedItems = [...state.items, action.item]
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };

    }

    if (action.type === 'REMOVE') {
        const itemIndex = state.items.findIndex((item)=> item.id === action.id)

        let updatedItems;
        if (state.items[itemIndex].amount === 1) {
            updatedItems = state.items.filter((item)=> item.id !== action.id)
            
        } else {
            let updatedItem = {...state.items[itemIndex], amount: state.items[itemIndex].amount - 1}
            updatedItems = [...state.items]
            updatedItems[itemIndex] = updatedItem
        }

        const updatedTotalAmount =  state.totalAmount - state.items[itemIndex].price;

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };

    }

    if (action.type === 'CLEAR') {
        return defaultCartState
    }
    return defaultCartState
}

function CartProvider(props) {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const addItemHandler = (item) => {
        dispatchCartAction({ type: 'ADD', item: item });
    }

    const removeItemHandler = (id) => {
        dispatchCartAction({ type: 'REMOVE', id: id });
    }

    const clearHandler = () => {
        dispatchCartAction({ type: 'CLEAR' })
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        clearCart: clearHandler,
    }
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider
