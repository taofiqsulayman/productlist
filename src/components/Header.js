import { Box, Center, Heading } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <Box p={4} shadow="md">
      <Link to={'/'} >
        <Center><Heading>Fake Store</Heading></Center>
      </Link>
      </Box>
    </div>
  )
}

export default Header
