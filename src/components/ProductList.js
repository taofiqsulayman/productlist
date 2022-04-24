import React from 'react'
import { useEffect } from 'react';

import { setProducts } from "../redux/actions/ProductActions"
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import SingleProduct from './SingleProduct';

const ProductList = () => {

  const products = useSelector((state) => state);
  const dispatch = useDispatch();
  
  const fetchProducts = async () => {
    const response = await axios
    .get("https://fakestoreapi.com/products")
    .catch((err) => {
      console.log("Err", err);
    });

    dispatch(setProducts(response.data));
  };

    useEffect (() => {
      fetchProducts();
    }, []);


  console.log(products);

  return (
    <div>
      <SingleProduct />
    </div>
  )
}

export default ProductList
