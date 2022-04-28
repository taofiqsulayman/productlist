import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectedProduct, removeSelectedProduct } from '../redux/actions/ProductActions';
import Loading from './Loading';
import { Wrap, Image, WrapItem, Center, Heading, Tag, Badge, Text, Box, HStack, Button, Input } from "@chakra-ui/react";
import { FormControl, FormLabel } from '@chakra-ui/react';


const ReviewItem = ({user, review, addReview}) =>{
  return (
    <Box mb={10} mt={5}>
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

  const [value, setValue] = useState();
  const [val, setVal] = useState();


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
    if (itemData.user !== '' && itemData.review !== '') {
      setReviews([...reviews, itemData]);

      setValue("");
      setVal("");

    } else {
      alert('Fill the Required Input');
    }
    

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

        <Text fontSize='xl'> Add your reviews about the product </Text>


      <FormControl mt={5} isRequired >
      <FormLabel > Username </FormLabel>
      <Input value={value} id='user' ref={userNameRef}
      />
      </FormControl>

      <FormControl  mt={5} isRequired >
      <FormLabel >Review</FormLabel>
      <Input value={val} id='review' height='sm' ref={userReviewRef}
      />
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