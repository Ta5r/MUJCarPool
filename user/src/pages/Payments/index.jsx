import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/User/Navbar';
import { Text, ChakraProvider, theme } from '@chakra-ui/react';
import jwt from 'jwt-decode';

const Payments = () => {
  var x = localStorage.getItem('tokenID');
  const user = jwt(x);
  console.log(x);
  console.log('Hello');
  console.log(user);

  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Text fontWeight={'bold'} fontSize="38px" my="4rem" mx="3rem">
        Your payment history is as follows
      </Text>

      <Text fontSize="28px" my="4rem" mx="6rem">
        Nothing to show at the moment
      </Text>

      <br />
    </ChakraProvider>
  );
};

export default Payments;
