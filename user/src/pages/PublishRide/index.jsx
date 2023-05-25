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
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../../components/User/Navbar';
import FadeInUp from '../../components/Animation/FadeInUp';

export default function PublishRide() {
  const navigate = useNavigate();
  const UID = localStorage.getItem('UID');
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
          // setFName(response.fname);
          // setLName(response.lname);
          // setEmail(response.email);
          // setPhone(response.phone);
        });
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  const navigato_UDB = async event => {
    navigate('/user/dashboard');
  };
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      let dat = await axios.post(
        `https://muj-travel-buddy.onrender.com/users/${UID}/rides`,
        {
          from_location: from,
          to_location: to,
          passenger_count: nop,
          doj: doj,
          price: price,
        }
      );
      if (dat.status == 200) {
        setmsg('Ride Successfully placed');
        setTimeout(navigato_UDB(), 800);
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
      <Navbar />
      <FadeInUp>
        <Flex
          minH={'93vh'}
          align={'center'}
          justify={'center'}
          bg={useColorModeValue('gray.50', 'gray.800')}
        >
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={1} px={6}>
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
                      type="date"
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
                      bg={'orange.400'}
                      color={'white'}
                      _hover={{
                        bg: 'orange.500',
                      }}
                      my={'1rem'}
                      type="submit"
                    >
                      Publish Ride
                    </Button>
                  </Stack>
                </form>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </FadeInUp>
                <br/>
                <br/>
    </ChakraProvider>
  );
}
