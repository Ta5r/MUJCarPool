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
import UserDBNavBar from '../../components/User/UserDBNavBar';
import FadeInUp from '../../components/Animation/FadeInUp';

export default function ServiceRequest() {
  const navigate = useNavigate();
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

  useEffect(() => {
    //Runs only on the first render
    var x = localStorage.getItem('tokenID');
    const user = jwt(x);
    console.log(user);
    setPublisherID(user['UID']);
  }, []);
  console.log(publisherID);
  const navigato_UDB = async event => {
    navigate('/user/dashboard');
  };
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      let dat = await axios.post('http://localhost:8000/add/ride', {
        PublisherID: publisherID,
        from: from,
        to: to,
        no_of_pass: nop,
        doj: doj,
        price: price,
      });
      console.log(dat);
      console.log('status : ' + dat.status);
      if (dat.status == 200) {
        console.log('Service Request Successfully placed ');
        setmsg('Service Request Successfully placed');
      } else {
        setmsg("Couldn't place Service Request");
        console.log("Couldn't place Service Request");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <UserDBNavBar />
      {/* <UserDBNavBar name={S_name} /> */}
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
                      placeholder={'From'}
                      id="from"
                      type="text"
                      // value={from}
                      onChange={handleFromChange}
                    />

                    <FormLabel>To</FormLabel>
                    <Input
                      placeholder={'To'}
                      id="to"
                      type="text"
                      // value={to}
                      onChange={handleToChange}
                    />

                    <FormLabel>Date of Journey</FormLabel>
                    <Input
                      placeholder={'Date of Journey'}
                      id="doj"
                      type="text"
                      // value={doj}
                      onChange={handleDojChange}
                    />

                    <FormLabel>Number of Co-Passengers</FormLabel>
                    <Input
                      placeholder={'Number of co-passengers'}
                      id="no"
                      type="text"
                      // value={no}
                      onChange={handleNopChange}
                    />

                    <FormLabel>Price per head</FormLabel>
                    <Input
                      placeholder={'Price per head'}
                      id="price"
                      type="text"
                      // value={price}
                      onChange={handlePriceChange}
                    />
                  </FormControl>
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
                  <Button
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                    onClick={navigato_UDB}
                  >
                    Back to DashBoard
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </FadeInUp>
    </ChakraProvider>
  );
}
