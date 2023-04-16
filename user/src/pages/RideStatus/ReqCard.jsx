import { React, useState, useEffect } from 'react';
import { Grid, Box, GridItem, Link, Text, Button } from '@chakra-ui/react';
import axios from 'axios';
import FadeInUp from '../../components/Animation/FadeInUp';
import Card from '../../components/layouts/Card';

const ReqCard = props => {
  const requesteeID = props.requesteeID;
  const [riderName, setriderName] = useState('');
  const [riderData, setriderData] = useState('');
  useEffect(() => {
    try {
      axios.get(`http://127.0.0.1:5000/users/${requesteeID}`).then(response => {
        setriderName(response.data.fname);
        setriderData(response.data);
      });
    } catch (err) {
      console.log(err);
    }
    // return () => {
    //   second
    // }
  }, []);
  console.log(riderData);
  const riderStar = '4';
  const riderID = '209301000';
  const riderType = 'Student';
  const status = props.status.toLowerCase(); //pending , accepted, rejected
  var statusColor = 'grey.200';
  if (status == 'accepted') statusColor = 'green.400';
  else statusColor = 'red.500';

  //   const requestRide = async () => {
  //     try {
  //       const d = await axios.post(
  //         `http://127.0.0.1:5000/users/${uid}/requests`,
  //         { publisher_id: pid, ride_id: rideID }
  //       );
  //       setMsg('Ride Requested');
  //     } catch (err) {
  //       alert(`Error: ${err}`);
  //     }
  //   };

  const acceptReq = () => {
    console.log('accept request');
  };
  const rejectReq = () => {
    console.log('reject request');
  };

  return (
    <FadeInUp>
      <Card
        py="3rem"
        my="2rem"
        px="2rem"
        mx="4rem"
        width="80vw"
        borderRadius="16px"
        boxShadow=" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        height={{ sm: '200px' }}
        bg={'white'}
        position="relative"
      >
        <Grid templateColumns="repeat(5, 1fr)" gap={3}>
          <GridItem
            w="100%"
            bgColor={'orange.200'}
            textAlign={'center'}
            verticalAlign={'middle'}
            h={'60px'}
            borderRadius={'50px'}
          >
            <Text fontWeight={600} fontSize={'2xl'}>
              {riderName}
            </Text>
          </GridItem>
          <GridItem
            w="100%"
            bgColor={'orange.200'}
            textAlign={'center'}
            verticalAlign={'middle'}
            h={'60px'}
            borderRadius={'50px'}
          >
            <Text fontWeight={600} fontSize={'2xl'}>
              {riderData.UID}
            </Text>
          </GridItem>

          <GridItem w="100%" textAlign={'center'}>
            <Text fontWeight={'bold'}>Rider Rating:</Text>
            {riderStar} stars
          </GridItem>
          <GridItem w="100%" textAlign={'center'}>
            <Text fontSize={'2xl'}>{riderType}</Text>
          </GridItem>
          <GridItem w="100%" textAlign={'center'}>
            {status == 'pending' ? (
              <Box>
                <Button onClick={acceptReq}>Accept</Button>
                <Button onClick={rejectReq} ml="1rem">
                  Reject
                </Button>
              </Box>
            ) : (
              <Box>
                <Text bgColor={statusColor} fontSize={'xl'} fontWeight={'bold'}>
                  {status.toUpperCase()}
                  <br />
                </Text>
                {status == 'accepted' ? (
                  <Box mt={'10px'}>
                    <Button>Call</Button>
                    <Button ml={'1rem'}>Email</Button>
                  </Box>
                ) : null}
              </Box>
            )}
          </GridItem>
        </Grid>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </Card>
    </FadeInUp>
  );
};

export default ReqCard;
