import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/User/Navbar';
import { Button, Text, ChakraProvider, theme } from '@chakra-ui/react';
import RideCard from '../../components/User/RideCard';

const RideStatus = props => {
  const {slug} = useParams();
  console.log(slug);


  return (
    <ChakraProvider theme={theme}>
      <Navbar/>
      <Text fontWeight={'bold'} fontSize="38px" my="4rem" mx="5rem">
        My Rides Status
      </Text>
      {slug}
    </ChakraProvider>
  );
};

export default RideStatus;
