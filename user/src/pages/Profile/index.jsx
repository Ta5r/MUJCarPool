import React from 'react';
import Navbar from '../../components/User/Navbar';
import { Text, ChakraProvider, theme } from '@chakra-ui/react';
import jwt from 'jwt-decode';

const Profile = () => {
  var x = localStorage.getItem('tokenID');
  const user = jwt(x);

  return (
    <ChakraProvider theme={theme}>
      <Navbar />

      <Text fontWeight={'bold'} fontSize="38px" my="4rem" mx="5rem">
        Welcome {user.fname} {user.lname} !
      </Text>

      <br />
    </ChakraProvider>
  );
};

export default Profile;
