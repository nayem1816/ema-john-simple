import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItems/ReviewItem';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [placedOrder, setPlaceOrder] = useState(false);
    const history = useHistory()

    const handelProceedCheckout = () => {
        history.push('/shipment')
    }

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch('https://salty-fjord-11395.herokuapp.com/productByKey', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data =>setCart(data))
    }, [])

    const removeProduct = (removeKey) => {
        // console.log('Remove', removeKey);
        const newCart = cart.filter(pd => pd.key != removeKey);
        setCart(newCart);
        removeFromDatabaseCart(removeKey);
    }

    let thankYou;
    if (placedOrder) {
        thankYou = <img src={happyImage} alt=""/>
    }

    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem removeProduct={removeProduct} product={pd} key={pd.key}></ReviewItem>)
                }
                {
                    thankYou
                }
            </div>
            <div className="cart-container">
                <Cart cart = {cart}>
                    <button onClick={handelProceedCheckout} className="btnStyle">Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;