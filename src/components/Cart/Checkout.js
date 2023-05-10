import { useState } from 'react';
import { useRef } from 'react';
import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === "";
const fiveChar = (value) => value.trim().length < 5;

const Checkout = (props) => {

    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true,
    })

    const nameRef = useRef()
    const streetRef = useRef()
    const postalRef = useRef()
    const cityRef = useRef()

    const confirmHandler = (event) => {
        event.preventDefault();
        const enteredName = nameRef.current.value
        const enteredStreet = streetRef.current.value
        const enteredPostal = postalRef.current.value
        const enteredCity = cityRef.current.value

        const enteredNameisValid = !isEmpty(enteredName)
        const enteredStreetisValid = !isEmpty(enteredStreet)
        const enteredPostalisValid = !fiveChar(enteredPostal)
        const enteredCityisValid = !isEmpty(enteredCity)

        console.log(enteredPostalisValid)

        setFormInputsValidity({
            name: enteredNameisValid,
            street: enteredStreetisValid,
            city: enteredCityisValid,
            postalCode: enteredPostalisValid
        })

        const formIsValid = enteredNameisValid && enteredStreetisValid && enteredCityisValid && enteredPostalisValid

        if (!formIsValid) {
            return
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostal,
        })

    };

    const classValidity = (validity) => {
        if (validity) {
            return `${classes.control}`
        }
        return `${classes.control} ${classes.invalid}`

    }

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={classValidity(formInputsValidity.name)}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameRef} />
                {!formInputsValidity.name && <p>Please enter a valid name!</p>}
            </div>
            <div className={classValidity(formInputsValidity.street)}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetRef} />
                {!formInputsValidity.street && <p>Please enter a valid street!</p>}
            </div>
            <div className={classValidity(formInputsValidity.postalCode)}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalRef} />
                {!formInputsValidity.postalCode && (
                    <p>Please enter a valid postal code (5 characters long)!</p>
                )}

            </div>
            <div className={classValidity(formInputsValidity.city)}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityRef} />
                {!formInputsValidity.city && <p>Please enter a valid city!</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};
export default Checkout;




