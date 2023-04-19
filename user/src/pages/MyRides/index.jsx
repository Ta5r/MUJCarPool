import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/User/Navbar';
import { Button, Text, ChakraProvider, theme } from '@chakra-ui/react';
import MyRide from '../../components/User/MyRide';

const MyRides = props => {
  const [S_name, setName] = useState('');
  const [S_lname, setlname] = useState('');
  const [S_email, setemail] = useState('');
  const [S_phone, setphone] = useState('');
  const [allRides, setAllRides] = useState([]);
  const UID = localStorage.getItem('UID');

  useEffect(() => {
    try {
      axios.get(`https://muj-travel-buddy-backend-production.up.railway.app/users/${UID}/rides`).then(response => {
        setAllRides(response.data);
        console.log(allRides);
      });
    } catch (err) {
      console.log('Error occured ');
      console.log(err);
    }
  }, []);

  const handleLoad = () => {
    try {
      axios.get(`https://muj-travel-buddy-backend-production.up.railway.app/users/${UID}/rides`).then(response => {
        setAllRides(response.data);
        console.log(allRides);
      });
    } catch (err) {
      console.log('Error occured ');
      console.log(err);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Navbar
        eid={UID}
        name={S_name}
        lname={S_lname}
        email={S_email}
        phone={S_phone}
      />

      <Text fontWeight={'bold'} fontSize="38px" my="4rem" mx="5rem">
        My Ongoing Rides
      </Text>
      {allRides.map(res => {
        return (
          <MyRide
            UID={parseInt(localStorage.getItem('UID'))}
            key={res.id}
            from={res.from_location}
            to={res.to_location}
            doj={res.doj}
            price={res.price}
            rideID={res.id}
            nop={res.passenger_count}
          />
        );
      })}

      <br />
    </ChakraProvider>
  );
};

export default MyRides;
