import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { Box } from '@chakra-ui/react';
import Data from './Data';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    const { data } = await axios
      .get('https://reqres.in/api/products')
      .catch(err => console.log(err));

    setProducts(data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box flexGrow={1} mb={2}>
      <Data data={products} />
    </Box>
  );
};

export default HomePage;
