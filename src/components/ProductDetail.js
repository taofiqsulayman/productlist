import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectedProduct, removeSelectedProduct } from '../redux/actions/ProductActions';
import Loading from './Loading';
import { Wrap, Image, WrapItem, Center, Heading, Tag, Badge, Text, Box, HStack, VStack, Show, Button, Input } from "@chakra-ui/react";
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

        <Show breakpoint='(min-width: 420px)'>
          <HStack  spacing='30px'>
            <Center pt='5' w='lg'>
            <Image w="80%" h="350px" src={image} alt={title} />
            </Center>

            <Center>
              <Box display='flex' flexDir='column' justifyContent='space-between'>
                <Heading p='5' size='lg'>{title}</Heading>
                <Box pl='5'>
                  <Tag size='lg' variant='solid' colorScheme='teal' borderRadius='full' mr='10'>$ {price}</Tag>
                  <Badge ml='1' fontSize='xl' colorScheme='green'>{category}</Badge>
                </Box>
                
                <Text p='5' fontSize='lg'>{description}</Text>
                <Button w='xs' size='xs' colorScheme='green'>Buy Now</Button>
              </Box>              
            </Center>

          </HStack> 
        </Show>

        </WrapItem>

        <WrapItem>

        <Show breakpoint='(max-width: 420px)'>
          <VStack spacing='30px'>
            <Center pt='5' w='lg'>
            <Image w="75%" h="350px" src={image} alt={title} />
            </Center>
            <Center pt={5} w='lg'>
              <Box display='flex' flexDir='column' alignItems='center'>
                <Heading p='5' size='md'>{title}</Heading>
                <Box mb={5}>
                  <Tag size='lg' variant='solid' colorScheme='teal' borderRadius='full'>$ {price}</Tag>
                  <Badge ml='5' fontSize='xl' colorScheme='green'>{category}</Badge>
                </Box>

                <Box pl='11%' pr='11%' fontSize='sm'>
                  {description}
                </Box>
                <Button mt={5} colorScheme='teal' w='md' size='md' >Buy Now</Button>
              </Box>              
            </Center>
          </VStack>
        </Show>


        </WrapItem>

      </Wrap>

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
      <Input value={val} id='review' height='150px' maxWidth='480px' ref={userReviewRef}
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