import axios from 'axios';
import React, { useState } from 'react';
import Navbar from '../../components/User/Navbar';
import RideCard from '../../components/User/RideCard';
import LoadingCard from '../../components/layouts/LoadingCard';
import {
  ChakraProvider,
  Text,
  theme,
  Box,
  FormControl,
  FormLabel,
  Stack,
  Button,
  Input,
  Heading,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react';
const RidesSearch = () => {
  const [allRides, setAllRides] = useState([]);

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [doj, setDoj] = useState('');
  const [price, setPrice] = useState('');
  const [msg, setmsg] = useState('Please fill the following details');
  const [loading, setLoad] = useState(false);

  const handleFromChange = e => setFrom(e.target.value);
  const handleToChange = e => setTo(e.target.value);
  const handleDojChange = e => setDoj(e.target.value);
  const handlePriceChange = e => setPrice(e.target.value);
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setLoad(true);
      let dat = await axios.get(
        `https://muj-travel-buddy.onrender.com/rides/`,
        {
          params: {
            from_location: from,
            to_location: to,
            doj: doj,
            price: price,
          },
        }
      );
      setAllRides(dat.data);
      if (dat.status === 200) {
        setLoad(false);
        setmsg('Scroll to view rides');
      } else {
        setmsg("Couldn't find rides");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Navbar />
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
      <Box align={'center'}>
      {(loading===true)?
      <LoadingCard/>
      :null}
        {allRides.map(res =>
          res.publisher_id !== parseInt(localStorage.getItem('UID')) ? (
            <RideCard
              key={res.id}
              uid={parseInt(localStorage.getItem('UID'))}
              to={res.to_location}
              from={res.from_location}
              doj={res.doj}
              nop={res.passenger_count}
              price={res.price}
              rideID={res.id}
              pid={res.publisher_id}
              publisher={res.publisher}
            />
          ) : null
        )}
      </Box>
      <br />
      <br />
    </ChakraProvider>
  );
};

export default RidesSearch;
