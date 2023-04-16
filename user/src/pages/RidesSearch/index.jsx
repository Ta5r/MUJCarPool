import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/User/Navbar';
import { Button, Text, ChakraProvider, theme } from '@chakra-ui/react';
import RideCard from '../../components/User/RideCard';

const RidesSearch = props => {
  const eid = props.uid;
  const [allRides, setAllRides] = useState([]);
  const UID = localStorage.getItem('UID');

    try {
      axios.get('http://127.0.0.1:5000/rides').then(response => {
        setAllRides(response.data);
      });
    } catch (err) {
      console.log('Error occured ');
      console.log(err);
    }

  return (
    <ChakraProvider theme={theme}>
      <Navbar
        eid={UID}
        // name={fname}
        // lname={S_lname}
        // email={S_email}
        // phone={S_phone}
      />

      <Text fontWeight={'bold'} fontSize="38px" my="4rem" mx="5rem">
        Browse Ongoing Rides
      </Text>


      {allRides.map(res => 
        (res.publisher_id !== parseInt(localStorage.getItem('UID'))) ? (
          <RideCard
          key={res.id}
            // myName={fname}
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
    </ChakraProvider>
  );
};

export default RidesSearch;
