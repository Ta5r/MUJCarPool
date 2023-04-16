import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/User/Navbar';
import { Button, Text, ChakraProvider, theme } from '@chakra-ui/react';
import RideCard from '../../components/User/RideCard';

const RidesSearch = props => {

  return (
    <ChakraProvider theme={theme}>
      <Navbar
        // eid={UID}
        // name={fname}
        // lname={S_lname}
        // email={S_email}
        // phone={S_phone}
      />

      <Text fontWeight={'bold'} fontSize="38px" my="4rem" mx="5rem">
        My Requests Status
      </Text>
      <br />
    </ChakraProvider>
  );
};

export default RidesSearch;
