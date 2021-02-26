import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';

const Product = (props) => {
    const {img, name, seller, price, stock} = props.product;
    return (
        <div className='product-style'>
            <img src={img} alt="" />
            <div className="product-title">
                <h3 className='product-name'>{name}</h3>
                <p>by: {seller}</p>
                <h1>${price}</h1>
                <p>only {stock} left in stock - order soon</p>
                <button onClick={()=>props.handelBtn(props.product)}><FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>
            </div>
        </div>
    );
};

export default Product;