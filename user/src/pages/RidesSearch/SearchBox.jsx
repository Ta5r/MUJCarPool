import axios from 'axios';
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
  HStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const SearchBox = () => {
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
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      let dat = await axios.post(
        `https://muj-travel-buddy-backend-production.up.railway.app/users/${UID}/rides/`,
        {
          from_location: from,
          to_location: to,
          passenger_count: nop,
          doj: doj,
          price: price,
        }
      );
      console.log(dat);
      console.log('status : ' + dat.status);
      if (dat.status == 200) {
        console.log('Ride Successfully placed ');
        setmsg('Ride Successfully placed');
        // setTimeout(navigato_UDB(), 1000);
      } else {
        setmsg("Couldn't place Ride");
        console.log("Couldn't place Ride");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={2} px={6}>
      <Stack align={'center'}>
        <Heading fontSize={'4xl'}> Search Rides</Heading>
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
              <HStack>
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
              </HStack>
              <br />
              <HStack>
                <FormLabel>Date of Journey</FormLabel>
                <Input
                  placeholder={'Date of Journey'}
                  id="doj"
                  type="date"
                  onChange={handleDojChange}
                />
              </HStack>
              <br />
              <HStack>
                <FormLabel>Price per head</FormLabel>
                <Input
                  placeholder={'Price per head'}
                  id="price"
                  type="text"
                  onChange={handlePriceChange}
                />
              </HStack>
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
                Search Ride
              </Button>
            </Stack>
          </form>
          <Stack spacing={10}></Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default SearchBox;
