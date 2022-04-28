import { Box, Heading } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <Box p={4} shadow="md">
      <Link to={'/'} >
        <Heading>Fake Store</Heading>
      </Link>
      </Box>
    </div>
  )
}

export default Header
