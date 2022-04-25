
import { Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './components/Header';
import ProductDetail from './components/ProductDetail';
import ProductList from './components/ProductList';
import { Container } from '@chakra-ui/react';

function App() {



  return (
    <>
      <Container maxW="8xl">
        <Header />
        <Routes>
          <Route path='/' exact element={<ProductList />} />
          <Route path='/product/:productId' exact element={<ProductDetail />} />
          <Route>404 Not Found</Route>
        </Routes> 
      </Container>
    </>
  );
}

export default App;
