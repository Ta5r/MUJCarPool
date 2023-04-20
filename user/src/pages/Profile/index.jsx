import React from 'react';
import Navbar from '../../components/User/Navbar';
import {
  Text,
  ChakraProvider,
  theme,
  Box,
  Table,
  Thead,
  Th,
  Td,
  Tr,
  Tbody,
  Button,
  TableContainer,
} from '@chakra-ui/react';
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
      <Box align="center" px={"2rem"} maxW={["460px","700px","1000px","1300px"]}>
        <TableContainer mb={'2rem'}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Category</Th>
                <Th>Data</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>First Name</Td>
                <Td>{user.fname}</Td>
              </Tr>
              <Tr>
                <Td>Last Name</Td>
                <Td>{user.lname}</Td>
              </Tr>
              <Tr>
                <Td>Email</Td>
                <Td>{user.email}</Td>
              </Tr>
              <Tr>
                <Td>Phone</Td>
                <Td>{user.phone}</Td>
              </Tr>
              <Tr>
                <Td>User Type</Td>
                <Td>{user.user_type}</Td>
              </Tr>

              <Tr>
                <Td>Designation</Td>
                <Td>{user.designation}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
        <Button>Update Data</Button>
      </Box>

      <br />
      <br />
      <br />
      <br />
    </ChakraProvider>
  );
};

export default Profile;
