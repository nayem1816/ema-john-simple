import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch('https://salty-fjord-11395.herokuapp.com/product/B01DBGVB7K'+productKey)
        .then((res => res.json()))
        .then(data => setProduct(data))
    }, [productKey])
    return (
        <div>
            <h2>This is {productKey} Details</h2>
            <Product showAddToButton={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;