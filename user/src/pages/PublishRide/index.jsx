import {
  ChakraProvider,
  theme,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Stack,
  Button,
  Input,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import axios from 'axios';
import jwt from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../../components/User/Navbar';
import FadeInUp from '../../components/Animation/FadeInUp';

export default function PublishRide() {
  const navigate = useNavigate();
  const UID = localStorage.getItem('UID');
  const [publisherID, setPublisherID] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [nop, setNop] = useState('');
  const [doj, setDoj] = useState('');
  const [price, setPrice] = useState('');
  const [msg, setmsg] = useState('Please fill the following details');

  const handleFromChange = e => setFrom(e.target.value);
  const handleToChange = e => setTo(e.target.value);
  const handleNopChange = e => setNop(e.target.value);
  const handleDojChange = e => setDoj(e.target.value);
  const handlePriceChange = e => setPrice(e.target.value);

  const [S_fname, setFName] = useState('');
  const [S_lname, setLName] = useState('');
  const [S_email, setEmail] = useState('');
  const [S_phone, setPhone] = useState('');

  useEffect(() => {
    try {
      fetch('/user/dashboard/', {
        method: 'GET',
        headers: {
          token: localStorage.getItem('tokenID'),
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }).then(response => {
        response.json().then(response => {
          console.log(response);
          setPublisherID(response.UID);
          setFName(response.fname);
          setLName(response.lname);
          setEmail(response.email);
          setPhone(response.phone);
        });
      });
    } catch (err) {
      console.log('Error occured ');
      console.log(err);
    }
  }, []);
  const navigato_UDB = async event => {
    navigate('/user/dashboard');
  };
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      let dat = await axios.post(`http://127.0.0.1:5000/users/${UID}/rides/`, {
        from_location: from,
        to_location: to,
        passenger_count: nop,
        doj: doj,
        price: price,
      });
      console.log(dat);
      console.log('status : ' + dat.status);
      if (dat.status == 200) {
        console.log('Ride Successfully placed ');
        setmsg('Ride Successfully placed');
        setTimeout(navigato_UDB(), 1000);
      } else {
        setmsg("Couldn't place Ride");
        console.log("Couldn't place Ride");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Navbar
        eid={publisherID}
        name={S_fname}
        lname={S_lname}
        email={S_email}
        phone={S_phone}
      />
      <FadeInUp>
        <Flex
          minH={'93vh'}
          align={'center'}
          justify={'center'}
          bg={useColorModeValue('gray.50', 'gray.800')}
        >
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'}> Publish a Ride</Heading>
              <Text fontSize={'lg'} color={'gray.600'}>
                {msg}
              </Text>
            </Stack>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}
            >
              <Stack spacing={4}>
                <form onSubmit={handleSubmit}>
                  <FormControl id="publish_ride">
                    <FormLabel>From</FormLabel>
                    <Input
                      placeholder={'Enter a pick-up point'}
                      id="from"
                      type="text"
                      onChange={handleFromChange}
                    />

                    <FormLabel>To</FormLabel>
                    <Input
                      placeholder={'Enter a drop point'}
                      id="to"
                      type="text"
                      onChange={handleToChange}
                    />

                    <FormLabel>Date of Journey</FormLabel>
                    <Input
                      placeholder={'Date of Journey'}
                      id="doj"
                      type="text"
                      onChange={handleDojChange}
                    />

                    <FormLabel>Number of Co-Passengers</FormLabel>
                    <Input
                      placeholder={'Number of co-passengers'}
                      id="no"
                      type="text"
                      onChange={handleNopChange}
                    />

                    <FormLabel>Price per head</FormLabel>
                    <Input
                      placeholder={'Price per head'}
                      id="price"
                      type="text"
                      onChange={handlePriceChange}
                    />
                  </FormControl>
                  <br />
                  <Stack spacing={10}>
                    <Button
                      bg={'blue.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}
                      my={'1rem'}
                      type="submit"
                    >
                      Submit Request
                    </Button>
                  </Stack>
                </form>
                <Stack spacing={10}>
                  {/* <Button
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                    onClick={navigato_UDB}
                  >
                    Back to DashBoard
                  </Button> */}
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </FadeInUp>
    </ChakraProvider>
  );
}
