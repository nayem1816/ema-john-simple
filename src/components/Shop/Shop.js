import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import {addToDatabaseCart, getDatabaseCart} from '../../utilities/databaseManager'
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('https://salty-fjord-11395.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [])

    useEffect(() => {
        const savedCart = getDatabaseCart();
        // console.log(savedCart);
        const productKeys = Object.keys(savedCart);
        // console.log(productKeys);
        fetch('https://salty-fjord-11395.herokuapp.com/productByKey', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data =>setCart(data))
    }, [products])


    const handelBtn = (product) => {
        // console.log('clicked',product);
        const toBeAdded = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAdded);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const other = cart.filter(pd => pd.key !== toBeAdded)
            newCart = [...other , sameProduct]
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product]
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }
    return (
        <div className='twin-container'>
            <div className="product-container">
                <ul>
                    {products.map(pd => <Product showAddToButton={true} handelBtn={handelBtn} product={pd} key={pd.key}></Product>)}
                </ul>
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="btnStyle">Review</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;