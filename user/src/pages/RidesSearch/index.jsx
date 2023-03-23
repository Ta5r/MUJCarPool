import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/User/Navbar';
import { Button, Text, ChakraProvider, theme } from '@chakra-ui/react';
import RideCard from '../../components/User/RideCard';

const RidesSearch = props => {
  const eid = props.uid;
  console.log('eid from main component --> ' + eid);

  const [S_lname, setlname] = useState('');
  const [S_email, setemail] = useState('');
  const [S_phone, setphone] = useState('');
  const [UID, setUID] = useState('');
  const [fname, setName] = useState('');
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
          console.log(response);
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
  console.log('UID from main component --> ' + UID);
  console.log(fname);

  const handleLoad = () => {
    console.log('Load request');
    try {
      axios.get('http://localhost:8000/rides/all/').then(response => {
        console.log(response);
        setAllRides(response.data);
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
        name={fname}
        lname={S_lname}
        email={S_email}
        phone={S_phone}
      />

      <Text fontWeight={'bold'} fontSize="38px" my="4rem" mx="5rem">
        Browse Ongoing Rides
      </Text>
      {allRides.map(res =>
        res.PublisherID != UID ? (
          <RideCard
            myName = {fname}
            uid={UID}
            to={res.to}
            from={res.from}
            doj={res.doj}
            nop={res.no_of_pass}
            price={res.price}
            rideID={res._id}
            pid={res.PublisherID}
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
        Show All Rides
      </Button>
      <br />
    </ChakraProvider>
  );
};

export default RidesSearch;
