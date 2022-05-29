import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectedProduct, removeSelectedProduct } from '../redux/actions/ProductActions';
import Loading from './Loading';
import { Wrap, Image, WrapItem, Center, Heading, Tag, Badge, Text, Box, HStack, VStack, Show, Button, Input, Textarea } from "@chakra-ui/react";
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

        <Show breakpoint='(min-width: 720px)'>

          <Box display="flex" flexDir="column" >
          <HStack  spacing='30px'>

            <Image h='300px' w="400px"  src={image} alt={title} />

              <Box mt={3} display='flex' flexDir='column' justifyContent='space-between' w='70%'>
                <Heading size='md'>{title}</Heading>
                <Box mt={3} mb={3}>
                  <Tag size='lg' variant='solid' colorScheme='teal' borderRadius='full' mr='10'>$ {price}</Tag>
                  <Badge ml='2' fontSize='xl' colorScheme='teal'>{category}</Badge>
                </Box>
                
                <Text fontSize='md'>{description}</Text>
                <Button mt={5} pl='5' w='xs' size='md' colorScheme='teal'>Buy Now</Button>
              </Box>              

          </HStack>

          <Box mt={10}>
        <Heading size='xl'>Reviews</Heading>

        <Text fontSize='xl'> Add your reviews about the product </Text>


      <FormControl mt={5} isRequired >
      <FormLabel > Username </FormLabel>
      <Input value={value} id='user' maxW='480px' ref={userNameRef}
      />
      </FormControl>

      <FormControl  mt={5} isRequired >
      <FormLabel >Review</FormLabel>
      <Textarea value={val} id='review' height='150px' maxWidth='480px' ref={userReviewRef}
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
          </Box>

        </Show>

        <Show breakpoint='(max-width: 720px)'>
          <VStack spacing='10px'>
            <Center pt='5' w='md'>
            <Image w="70%" h="300px" src={image} alt={title} />
            </Center>
            <Center pt={5} w='md'>
              <Box display='flex' flexDir='column' alignItems='center'>
                <Heading pl='13%' pr='10%' size='sm'>{title}</Heading>
                <Box mt={5} mb={5} >
                  <Tag size='md' variant='solid' colorScheme='teal' borderRadius='full'>$ {price}</Tag>
                  <Badge ml='5' fontSize='lg' colorScheme='green'>{category}</Badge>
                </Box>
                <Center pl='13%' pr='13%'>
                <Text fontSize='md'> {description} </Text>
                </Center>
                <Button mt={5} colorScheme='teal' size='sm' >Buy Now</Button>
                
                <Box mt={10} display="flex" flexDir="column">
                <Heading size='xl'>Reviews</Heading>

                <Text fontSize='xl'> Add your reviews about the product </Text>


                <FormControl mt={5} isRequired >
                <FormLabel > Username </FormLabel>
                <Input value={value} id='user' maxW='480px' ref={userNameRef}
                />
                </FormControl>

                <FormControl  mt={5} isRequired >
                <FormLabel >Review</FormLabel>
                <Textarea value={val} id='review' height='150px' maxWidth='480px' ref={userReviewRef}
                />
                </FormControl>

                <Button mt={5} colorScheme='teal' w='xs' size='md' onClick={addReview} >Add Review</Button>


                <Box mt={10}>
                {
                  reviews.map((item)=>{
                    return <ReviewItem user={item.user} review ={item.review} addReview= {addReview}  />; 
                  })
                }
                
                </Box> 

                </Box>
              </Box>


            </Center>
          </VStack>
        </Show>        

        </WrapItem>
        
      </Wrap>
        
        
        

      
    </>
  )
}

export default ProductDetail