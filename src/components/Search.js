import React from 'react'
import { Input } from '@chakra-ui/react';

const Search = () => {
  return (
    <div>
      <Input onChange={ (e) =>{
        let f = products.filter((product) =>
          product.title.toLowerCase().includes(e.target.value.toLocaleLowerCase())
        );
        console.log(f);
      }} placeholder="Search" mt='4' />
    </div>
  )
}

export default Search
