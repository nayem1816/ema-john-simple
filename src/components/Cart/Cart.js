import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price;
    }

    const numFixed = num => {
        const numFormat = num.toFixed(2);
        return Number(numFormat);
    }

    let shippingCost = 0;
    if (total > 35) {
        shippingCost = 0;
    }
    else if(total > 15){
        shippingCost = 4.99;
    }
    else if(total > 0){
        shippingCost = 12.99;
    }

    const tax = total * .1;

    const grandPrice = total + shippingCost + tax;

    return (
        <div>
            <h2>Order Summary</h2>
            <h4>Items Ordered: ${cart.length}</h4>
            <p>Product Price: ${numFixed(total)}</p>
            <p>Shipping Cost: ${numFixed(shippingCost)}</p>
            <p>Tax: {numFixed(tax)}</p>
            <p>Total Price: ${numFixed(grandPrice)}</p>
        </div>
    );
};

export default Cart;