import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/User/Navbar';
import { Button, Text, ChakraProvider, theme } from '@chakra-ui/react';
import MyRide from '../../components/User/MyRide';

const MyRides = props => {
  const [UID, setUID] = useState('');
  const [S_name, setName] = useState('');
  const [S_lname, setlname] = useState('');
  const [S_email, setemail] = useState('');
  const [S_phone, setphone] = useState('');
  const [allRides, setAllRides] = useState([]);

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
          setUID(response.UID);
          setName(response.fname);
          setlname(response.lname);
          setemail(response.email);
          setphone(response.phone);
        });
      });
    } catch (err) {
      console.log('Error occured ');
      console.log(err);
    }
  }, []);

  const handleLoad = () => {
    try {
      axios.get('http://localhost:8000/rides/all/').then(response => {
        setAllRides(response.data);
        console.log(response);
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
      {allRides.map(res =>
        res.PublisherID == UID ? (
          <MyRide
            UID={UID}
            key={res._id}
            from={res.from}
            to={res.to}
            doj={res.doj}
            price={res.price}
            rideID={res._id}
            nop={res.no_of_pass}
          />
        ) : null
      )}

      <Button
        bgcolor="red"
        mx="10rem"
        my={'1rem'}
        mb={'7rem'}
        onClick={handleLoad}
      >
        Show My Rides
      </Button>
      <br />
    </ChakraProvider>
  );
};

export default MyRides;
