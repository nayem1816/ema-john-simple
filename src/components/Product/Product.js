import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {img, name, seller, price, stock, key} = props.product;
    // console.log(props);
    return (
        <div className='product-style'>
            <img src={img} alt="" />
            <div className="product-title">
                <h3 className='product-name'><Link to={"/product/" + key}>{name}</Link></h3>
                <p>by: {seller}</p>
                <h1>${price}</h1>
                <p>only {stock} left in stock - order soon</p>
                {props.showAddToButton && <button className="btnStyle" onClick={()=>props.handelBtn(props.product)}><FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>}
            </div>
        </div>
    );
};

export default Product;