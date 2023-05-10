import React from 'react'
import HeaderCartButton from './HeaderCartButton'
import classes from './Header.module.css'

function Header(props) {
    return (
        <>
            <header className={classes.header}>
                <h1>React Meals</h1>
                <HeaderCartButton onClick={props.onShowCart}/>
            </header>
            <div className={classes['main-image']}>
                <img src='./meals.jpg' alt='meals'/>
            </div>
        </>
    )
}

export default Header
