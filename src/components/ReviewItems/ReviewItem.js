import React from 'react';
import './ReviewItem.css';

const ReviewItem = (props) => {
    // console.log(props);
    const {name, quantity, key} = props.product;
    const removeProduct = props.removeProduct;
    return (
        <div className="review-item-style">
            <h2 className="product-name">{name}</h2>
            <p className="quantity">Quantity : {quantity}</p>
            <button onClick={()=> removeProduct(key)} className="btnStyle">Remove</button>
        </div>
    );
};

export default ReviewItem;