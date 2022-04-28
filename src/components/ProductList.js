import React from 'react'
import { useEffect, useState } from 'react';

import { setProducts } from "../redux/actions/ProductActions"
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import SingleProduct from './SingleProduct';
import Loading from './Loading';

import { Link } from 'react-router-dom';
import { Box, Input, VStack } from '@chakra-ui/react';


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



const handleSearch = (event) => {
  const searchWord = event.target.value;
  const newFilter = products.map((value) => {
      return value.title.tolowerCase().includes(searchWord.tolowerCase());
      });
  
      if (searchWord === "") {
        setProducts([]);
      } else {
      setProducts(newFilter);
      }
  }




  if (loading) {
    return (
        <Loading />
    );
  }

  return (

    <>

      <VStack mt={5} borderRadius='full'>
        <Input borderRadius='full' placeholder="Search for products" onChange={handleSearch} />
      </VStack>
    
      <div>
      <SingleProduct />
      </div>
    
    </>
  )
}

export default ProductList
