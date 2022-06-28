import React from 'react';
import { ChakraProvider, Box, theme } from '@chakra-ui/react';
import HomePage from './HomePage';
function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <HomePage />
      </Box>
    </ChakraProvider>
  );
}

export default App;
