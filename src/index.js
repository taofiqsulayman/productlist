import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import Store from './redux/Store';

import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Provider store={Store} >
        <BrowserRouter>
          <App />        
        </BrowserRouter>
        
      </Provider>
      
    </ChakraProvider>
    
  </React.StrictMode>
);

