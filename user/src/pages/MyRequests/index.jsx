import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/User/Navbar';
import { Box, Text, ChakraProvider, theme } from '@chakra-ui/react';
import RideCard from '../../components/User/MyRequests';
import LoadingCard from '../../components/layouts/LoadingCard';

const MyRequestRides = () => {
  const [myRequests, setMyRequests] = useState([]);
  const UID = parseInt(localStorage.getItem('UID'));
  const [loading, setLoad] = useState(false);

  useEffect(() => {
    try {
      setLoad(true);
      axios
        .get(
          `https://muj-travel-buddy.onrender.com/requests?requestee_id=${UID}`
        )
        .then(response => {
          setLoad(false);
          setMyRequests(response.data);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Navbar />

      <Box align={'center'}>
        <Text fontWeight={'bold'} fontSize="38px" my="4rem" mx="5rem">
          My Requests Status
        </Text>
        {(loading===true)?
      <LoadingCard/>
      :null}
        {myRequests.map(res => (
          <RideCard
            key={`${res.ride_id}-${res.publisher_id}`}
            uid={parseInt(localStorage.getItem('UID'))}
            rideID={res.ride_id}
            pid={res.publisher_id}
            requestStatus={res.request_status}
          />
        ))}
        {
          (myRequests.length===0)?
        <p>You have not requested for any rides.</p>:null
        }
      </Box>
      <br />
      <br />
      <br />
      <br />
      <br />
    </ChakraProvider>
  );
};

export default MyRequestRides;
