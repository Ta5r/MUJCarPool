import axios from 'axios';
import React, { useState, useEffect } from 'react';
import UserDBNavBar from '../../components/User/UserDBNavBar';
import { Button, Text, ChakraProvider, theme } from '@chakra-ui/react';
// import RideCard from '../../components/User/RideCard';
import MyRide from '../../components/User/MyRide';

const RidesSearch = props => {
  const eid = props.uid;

  const [S_EID, setEID] = useState('');
  const [S_name, setName] = useState('');
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
          setEID(response.UID);
          setName(response.fname);
        });
      });
    } catch (err) {
      console.log('Error occured ');
      console.log(err);
    }
  }, []);
  console.log(S_EID);
  console.log(S_name);

  const handleLoad = () => {
    console.log('Load request');
    try {
      axios.get('http://localhost:8000/user/show/' + S_EID).then(response => {
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
      <UserDBNavBar eid={S_EID} name={S_name} />

      <Text fontWeight={'bold'} fontSize="38px" my="4rem" mx="5rem">
        My Ongoing Rides
      </Text>
      {allRides.map(res =>
        // res.publisherID != S_EID ? (
          <MyRide
            from={res.from}
            to={res.to}
            doj={res.doj}
            price={res.price}
            rideID={res._id}
            nop = {res.no_of_pass}
          />
        // ) : null
      )}

      {/* <Text fontWeight={'bold'} fontSize="38px" my="4rem" mx="5rem">
        Completed Rides
      </Text> */}
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

export default RidesSearch;
