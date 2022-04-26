import React from 'react'
import { useEffect, useState } from 'react';

import { setProducts } from "../redux/actions/ProductActions"
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import SingleProduct from './SingleProduct';
import Loading from './Loading';

const ProductList = () => {

  const [loading, setLoading] = useState(true);

  const products = useSelector((state) => state);
  const dispatch = useDispatch();
  
  const fetchProducts = async () => {
    const response = await axios
    .get("https://fakestoreapi.com/products")
    .catch((err) => {
      console.log("Err", err);
    });

    setLoading(false);

    dispatch(setProducts(response.data));
  };

    useEffect (() => {
      fetchProducts();
    }, []);


  console.log(products);

  if (loading) {
    return (
        <Loading />
    );
  }

  return (

    <>
    
    <div>
      <SingleProduct />
    </div>
    
    </>
  )
}

export default ProductList
