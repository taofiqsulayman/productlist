import React from 'react'
import { useEffect, useState } from 'react';

import { setProducts } from "../redux/actions/ProductActions"
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import SingleProduct from './SingleProduct';
import Loading from './Loading';


import SearchBar from './SearchBar';


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

  // const getProducts = () => {
  //   fetch("https://fakestoreapi.com/products") 
  //   .then((res) => res.json())
  //   .then((data) => {

  //     setLoading(false);
  //     console.log(data);
  //     dispatch(setProducts(data));
  //   });
  // };

  // useEffect(() => {
  //   getProducts();
  // }, []);

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

      <SearchBar placeholder={"Search Products"} />
    
      <div>
      <SingleProduct />
      </div>
    
    </>
  )
}

export default ProductList
