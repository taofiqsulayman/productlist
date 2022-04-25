import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectedProduct } from '../redux/actions/ProductActions';
import { Wrap, Image, WrapItem, Center, Heading, Tag, Badge, Text, Box, HStack} from "@chakra-ui/react";

const ProductDetail = () => {
  const product = useSelector((state) => state.product);
  const {image, title, price, category, description} = product;
  const { productId } = useParams();
  const dispatch = useDispatch();

  console.log (product);


  const fetchProductDetail = async () => {
    const response = await axios
    .get(`https://fakestoreapi.com/products/${productId}`)
    .catch(err =>{
      console.log('Err', err);
    });

    dispatch(selectedProduct(response.data));
  };

  useEffect(() => {
    if (productId && productId !== "") fetchProductDetail();
  }, [productId]);

  return (
    <>
      <Wrap mt="10px" spacing="10px" justify="center">
        <WrapItem>

          <HStack spacing='50px'>
            <Center pt='5' w='xl'>
            <Image w="100%" h="370px" src={image} alt={title} />
            </Center>

            <Center>
              <Box display='flex' flexDir='column' justifyContent='space-between'>
                <Heading p='5' size='xl'>{title}</Heading>
                <Box pl='5'>
                  <Tag size='lg' variant='solid' colorScheme='teal' borderRadius='full' mr='10'>$ {price}</Tag>
                  <Badge ml='1' fontSize='xl' colorScheme='green'>{category}</Badge>
                </Box>
                
                <Text p='5' fontSize='xl'>{description}</Text>
              </Box>              
            </Center>

          </HStack> 
          
        </WrapItem>

        <WrapItem>
          <Center>
            <Heading size='xl'>Reviews</Heading>

            <Text fontSize='xl'></Text>

          </Center>  
          
        </WrapItem>
      </Wrap>

    </>
  )
}

export default ProductDetail
