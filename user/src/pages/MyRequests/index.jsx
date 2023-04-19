import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/User/Navbar';
import { Button, Text, ChakraProvider, theme } from '@chakra-ui/react';
import RideCard from '../../components/User/MyRequests';

const RidesSearch = props => {
  const [myRequests, setMyRequests] = useState([]);
  const UID = parseInt(localStorage.getItem('UID'));

  useEffect(() => {
    try {
      axios
        .get(`https://muj-travel-buddy-backend-production.up.railway.app/requests?requestee_id=${UID}`)
        .then(response => {
          setMyRequests(response.data);
        });
    } catch (err) {
      console.log('Error occured ');
      console.log(err);
    }
  }, []);

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
      {myRequests.map(res => (
        <RideCard
          key={`${res.ride_id}-${res.publisher_id}`}
          // myName={fname}
          uid={parseInt(localStorage.getItem('UID'))}
          rideID={res.ride_id}
          pid={res.publisher_id}
          requestStatus={res.request_status}
        />
      ))}
    </ChakraProvider>
  );
};

export default RidesSearch;
