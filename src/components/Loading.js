import { Center, Spinner } from '@chakra-ui/react'
import React from 'react'

const Loading = () => {
  return (
    <main>
      <Center mt='10'>
        <Spinner />
      </Center>
    </main>
  )
}

export default Loading
