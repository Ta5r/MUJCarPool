import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/User/Navbar';
import { Text, ChakraProvider,Box, theme } from '@chakra-ui/react';
import MyRide from '../../components/User/MyRide';
import LoadingCard from '../../components/layouts/LoadingCard';

const MyRides = () => {
  const [allRides, setAllRides] = useState([]);
  const UID = localStorage.getItem('UID');
  const [loading, setLoad] = useState(false);

  useEffect(() => {
    try {
      setLoad(true);
      axios.get(`https://muj-travel-buddy.onrender.com/users/${UID}/rides`).then(response => {
        setLoad(false);  
        setAllRides(response.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Navbar/>

      <Box align={'center'}>
      <Text fontWeight={'bold'} fontSize="38px" my="4rem" mx="5rem">
        My Ongoing Rides
      </Text>

      {(loading===true)?
      <LoadingCard/>
      :null}

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
        })
        }
        {
          (allRides.length===0)?
        <p>Oops! Looks like you have not published any rides.</p>:null
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

export default MyRides;
