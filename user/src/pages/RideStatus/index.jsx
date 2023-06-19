import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/User/Navbar';
import { Text, ChakraProvider, theme, Box } from '@chakra-ui/react';
import ReqCard from './ReqCard';
import LoadingCard from '../../components/layouts/LoadingCard';

const RideStatus = () => {
  const { slug } = useParams();
  const [reqs, setReqs] = useState([]);
  const [rideDetails, setRideDetails] = useState({});
  const [loading, setLoad] = useState(false);

  // useEffect(async () => {
    useEffect( () => {
    try {
      setLoad(true);
      // let dat = await axios.get(
      let dat;
       axios.get(
        `https://muj-travel-buddy.onrender.com/rides/${slug}/requests/`
      ).then((response)=>{
        dat = response;
        setLoad(false);
        setReqs(dat.data);
      });
    } catch (err) {
      console.log(err);
    }

    try {
      axios
        .get(
          `https://muj-travel-buddy.onrender.com/rides/${slug}`
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
        <Text fontWeight={'bold'} fontSize="38px" mt="3rem" mb="1.5rem" mx="5rem">
          Ride Details
        </Text>
        <Box>
          From : {rideDetails.from_location || `Loading...`}
          <br />
          To : {rideDetails.to_location || `Loading...`}
          <br />
          Passenger Count : {rideDetails.passenger_count || `Loading...`}
          <br />
          Date of Journey : {rideDetails.doj || `Loading...`}
          <br />
          Price : {rideDetails.price || `Loading...`}
          <br />
        </Box>
        <Box>
          <Text fontWeight={'bold'} fontSize="38px" mt="3rem" mb="1.5rem" mx="5rem">
            Pending Requests
          </Text>
          {(loading===true)?<LoadingCard/>:null}
          {reqs.map(res =>
            res.request_status === 'pending' ? (
              <ReqCard
                requesteeID={res.requestee_id}
                status={res.request_status}
                rideID={slug}
              />
            ) : `Nothing to show at the moment.`
          )}
        </Box>
        <Box>
          <Text fontWeight={'bold'} fontSize="38px" mt="3rem" mb="1.5rem" mx="5rem">
            Accepted Requests
          </Text>
          {reqs.map(res =>
            res.request_status === 'accepted' ? (
              <ReqCard
                requesteeID={res.requestee_id}
                status={res.request_status}
              />
            ) : <p>There are currently no accepted requests.</p>
          )}
        </Box>
        <Box>
          <Text fontWeight={'bold'} fontSize="38px" mt="3rem" mb="1.5rem" mx="5rem">
            Rejected Requests
          </Text>
          {reqs.map(res =>
            res.request_status === 'rejected' ? (
              <ReqCard
                requesteeID={res.requestee_id}
                status={res.request_status}
              />
            ) : <p>There are currently no rejected requests.</p>
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
