import React from 'react'
import { useSelector } from 'react-redux';

import { Box, Image, Wrap, WrapItem } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

const SingleProduct = () => {
  const products = useSelector((state) => state.allProducts.products);

  const renderList = products.map((product) => {
    const {id, title, image, price, category, rating } = product;

    return (
      <WrapItem key={id}>
      <Box w="260px" borderWidth='1px' borderRadius='xl' overflow='hidden'>
      <Image w="100%"  h="350px" src={image} alt={title} />
      <Box p='6'>
        <Box
          mt='1'
          fontWeight='semibold'
          as='h2'
          lineHeight='tight'
          isTruncated
        >
          {title}
        </Box>

        <Box>$ {price} </Box>

        <Box display='flex' mt='2' alignItems='center'>
          {Array(5)
            .fill('')
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < rating.rate ? 'teal.500' : 'gray.300'}
              />
            ))}
          <Box as='span' ml='2' color='gray.600' fontSize='sm'>
            {rating.count} reviews
          </Box>
        </Box>

        <Box> {category} </Box>

      </Box>
        </Box>
      </WrapItem>
      

    );

  });
  

  return (
    <>

    <Wrap mt="10px" spacing="20px" justify="center">
      {renderList}
    </Wrap>
      
    </>
  )
}

export default SingleProduct
