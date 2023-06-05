import { React, useState, useEffect } from 'react';
import { SimpleGrid, Box, Text, Button } from '@chakra-ui/react';
import axios from 'axios';
import FadeInUp from '../../components/Animation/FadeInUp';
import Card from '../../components/layouts/Card';

const ReqCard = props => {
  const uid = parseInt(localStorage.getItem('UID'));
  const rideID = props.rideID;
  const requesteeID = props.requesteeID;
  const [riderName, setriderName] = useState('');
  const [riderData, setriderData] = useState('');
  useEffect(() => {
    try {
      axios
        .get(
          `https://muj-travel-buddy.onrender.com/users/${requesteeID}`
        )
        .then(response => {
          setriderName(response.data.fname);
          setriderData(response.data);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);
  console.log(riderData);
  const riderStar = '4';
  const riderType = 'Student';
  const status = props.status.toLowerCase(); //pending , accepted, rejected
  var statusColor = 'grey.200';
  if (status == 'accepted') statusColor = 'green.400';
  else statusColor = 'red.500';

  const acceptReq = async () => {
    document.getElementById('rjct_btn').disabled = true;
    try {
      const d = await axios.put(
        `https://muj-travel-buddy.onrender.com/users/${uid}/requests/${rideID}`,
        { action: 'accept', requestee_id: requesteeID }
      );
    } catch (err) {
      alert(`Error: ${err}`);
    }
    console.log('accept request');
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };
  const rejectReq = async () => {
    document.getElementById('acpt_btn').disabled = true;
    try {
      const d = await axios.put(
        `https://muj-travel-buddy.onrender.com/users/${uid}/requests/${rideID}`,
        { action: 'reject', requestee_id: requesteeID }
      );
    } catch (err) {
      alert(`Error: ${err}`);
    }
    console.log('reject request');
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };

  const callNum = () => {
    const dummyNum = riderData.phone;
    window.open(`tel:+91${dummyNum}`);
  };
  const callEmail = () => {
    const dummyMail = riderData.email;
    window.open(`mailto:${dummyMail}`);
  };

  return (
    <FadeInUp>
      <Card
        py="3rem"
        my="2rem"
        px="2rem"
        mx={['1rem', '2rem', '3rem', '4rem']}
        width="80vw"
        borderRadius="16px"
        boxShadow=" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        height={{ xs: '400px', sm: '300px', md: '150px', lg: '150px' }}
        bg={'white'}
        position="relative"
      >
        <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={'40px'}>
          <Box
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
          </Box>
          <Box
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
          </Box>

          <Box w="100%" textAlign={'center'}>
            <Text fontWeight={'bold'}>Rider Rating:</Text>
            {riderStar} stars
          </Box>
          <Box w="100%" textAlign={'center'}>
            <Text fontSize={'2xl'}>{riderType}</Text>
          </Box>
          <Box w="100%" textAlign={'center'}>
            {status == 'pending' ? (
              <Box>
                <Button id={'acpt_btn'} onClick={acceptReq}>
                  Accept
                </Button>
                <Button id={'rjct_btn'} onClick={rejectReq} ml="1rem">
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
                    <Button onClick={callNum}>Call</Button>
                    <Button onClick={callEmail} ml={'1rem'}>
                      Email
                    </Button>
                  </Box>
                ) : null}
              </Box>
            )}
          </Box>
        </SimpleGrid>
      </Card>
    </FadeInUp>
  );
};

export default ReqCard;
