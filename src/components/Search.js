import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Input, VStack } from '@chakra-ui/react';

function Search ({products}) {
  const [filteredProduct, setFilteredProduct] = useState([]);

  const handleSearch = (event) => {
    const searchWord = event.target.value;
    const newFilter = products.filter((value) => {
      return value.title.tolowerCase().includes(searchWord.tolowerCase());
    });

    if (searchWord === "") {
      setFilteredProduct([]);
    } else {
    setFilteredProduct(newFilter);
    }
  }

  return (
    <>
      <VStack>
        <Input placeholder="Search for products" onChange={handleSearch} />
        {filteredProduct.length != 0 && (
          <Box mt={5} h='sm' backgroundColor='white' overflow='hidden' overflowY='auto' className='dataResult'>
          {filteredProduct.map((value, key) => {
            return(
              <Box>
                <Link to={`/product/${id}`}></Link>
                <p>{products.title}</p>
              </Box>
              )
            })
            }
          </Box>
        )}

      </VStack>
    
    </>
  )
}

export default Search
