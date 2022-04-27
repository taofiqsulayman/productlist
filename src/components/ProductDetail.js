import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectedProduct, removeSelectedProduct } from '../redux/actions/ProductActions';
import Loading from './Loading';
import { Wrap, Image, WrapItem, Center, Heading, Tag, Badge, Text, Box, HStack, Button, Input } from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage, FormHelperText } from '@chakra-ui/react';


const ReviewItem = ({user, review, addReview}) =>{
  return (
    <Box mt={5}>
      <Heading size='md'>{user}</Heading>
                
      <Text mt={3} fontSize='xl'>{review}</Text>
    </Box>
  )
}

const ProductDetail = () => {
  const [reviews, setReviews] = useState([
    {
      user: "Tao",
      review: "this a nice product, got what I ordered",
    },
  ])

  const [loading, setLoading] = useState(true);
  const product = useSelector((state) => state.product);
  const {image, title, price, category, description} = product;
  const { productId } = useParams();
  const dispatch = useDispatch();

  const userNameRef = useRef();
  const userReviewRef = useRef();

  const [input, setInput] = useState('')
  const [inpu, setInpu] = useState('')

  const handleInputChange = (e) => setInput(e.target.value)
  const handleInpuChange = (e) => setInpu(e.target.value)

  const isError = input === '';
  const isErro = inpu === '';

  console.log (product);


  const fetchProductDetail = async () => {
    const response = await axios
    .get(`https://fakestoreapi.com/products/${productId}`)
    .catch(err =>{
      console.log('Err', err);
    });

    setLoading(false);

    dispatch(selectedProduct(response.data));
  };


  const addReview = () => {
    
    let itemData = {
    user: userNameRef.current.value,
    review: userReviewRef.current.value, 
    }
    setReviews([...reviews, itemData]);

    document.getElementById("user").innerText = '';
    document.getElementById('review').innerText = '';

  }

  useEffect(() => {
    if (productId && productId !== "") fetchProductDetail();
    return () => {
      dispatch(removeSelectedProduct());
    }
  }, []);


  if (loading) {
    return (
        <Loading />
    );
  }

  return (
    <>
      <Wrap mb={10} mt="10px" spacing="10px" justify="center">
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
                <Button w='xs' size='xs' colorScheme='green'>Buy Now</Button>
              </Box>              
            </Center>

          </HStack> 
          
        </WrapItem>

      </Wrap>

      <Box mt={10}>
        <Heading size='xl'>Reviews</Heading>

        <Text fontSize='xl'> Add your reviews about the product</Text>


      <FormControl id='user' mt={5} isInvalid={isError}>
      <FormLabel > username </FormLabel>
      <Input ref={userNameRef}
        value={input}
        onChange={handleInputChange}
      />
      {!isError ? (
        <FormHelperText>
          Enter your username
        </FormHelperText>
      ) : (
        <FormErrorMessage>username is required.</FormErrorMessage>
      )}
      </FormControl>

      <FormControl id='review' mt={5} isInvalid={isErro}>
      <FormLabel >review</FormLabel>
      <Input height='sm' ref={userReviewRef}
        value={inpu}
        onChange={handleInpuChange}
      />
      {!isErro ? (
        <FormHelperText>
          Enter your review
        </FormHelperText>
      ) : (
        <FormErrorMessage>review is required.</FormErrorMessage>
      )}
      </FormControl>

      <Button mt={5} colorScheme='teal' w='xs' size='md' onClick={addReview} >Add Review</Button>

      </Box>

      <Box mt={10}>
        {
          reviews.map((item)=>{
            return <ReviewItem user={item.user} review ={item.review} addReview= {addReview}  />; 
          })
        }
        
      </Box>  

    </>
  )
}

export default ProductDetail