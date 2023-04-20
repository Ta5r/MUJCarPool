import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/User/Navbar';
import { Text, ChakraProvider, theme, Box } from '@chakra-ui/react';
import ReqCard from './ReqCard';

const RideStatus = () => {
  const { slug } = useParams();
  const [reqs, setReqs] = useState([]);
  const [rideDetails, setRideDetails] = useState({});

  useEffect(async () => {
    try {
      let dat = await axios.get(
        `https://muj-travel-buddy-backend-production.up.railway.app/rides/${slug}/requests/`
      );
      setReqs(dat.data);
    } catch (err) {
      console.log(err);
    }

    try {
      axios
        .get(
          `https://muj-travel-buddy-backend-production.up.railway.app/rides/${slug}`
        )
        .then(response => {
          setRideDetails(response.data);
          console.log(response.data);
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
          Ride Details
        </Text>
        <Box>
          From : {rideDetails.from_location}
          <br />
          To : {rideDetails.to_location}
          <br />
          Passenger Count : {rideDetails.passenger_count}
          <br />
          Date of Journey : {rideDetails.doj}
          <br />
          Price : {rideDetails.price}
          <br />
        </Box>
        <Box>
          <Text fontWeight={'bold'} fontSize="38px" my="4rem" mx="5rem">
            Pending Requests
          </Text>
          {reqs.map(res =>
            res.request_status == 'pending' ? (
              <ReqCard
                requesteeID={res.requestee_id}
                status={res.request_status}
                rideID={slug}
              />
            ) : null
          )}
        </Box>
        <Box>
          <Text fontWeight={'bold'} fontSize="38px" my="4rem" mx="5rem">
            Accepted Requests
          </Text>
          {reqs.map(res =>
            res.request_status == 'accepted' ? (
              <ReqCard
                requesteeID={res.requestee_id}
                status={res.request_status}
              />
            ) : null
          )}
        </Box>
        <Box>
          <Text fontWeight={'bold'} fontSize="38px" my="4rem" mx="5rem">
            Rejected Requests
          </Text>
          {reqs.map(res =>
            res.request_status == 'rejected' ? (
              <ReqCard
                requesteeID={res.requestee_id}
                status={res.request_status}
              />
            ) : null            
          )}
        </Box>
      </Box>
      <br />
      <br />
      <br />
    </ChakraProvider>
  );
};

export default RideStatus;
