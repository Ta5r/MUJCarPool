import React from 'react';
import Card from '../../layouts/Card';
import Closed from '../Closed/';
import { Link, Text, Button, ChakraProvider, theme } from '@chakra-ui/react';
import { Grid, GridItem } from '@chakra-ui/react';
import axios from 'axios';
import FadeInUp from '../../Animation/FadeInUp';
import AdminModalBox from '../../layouts/AdminModalBox';

const ACard = props => {
  const OTP = props.OTP;
  const name = props.name;
  const designation = props.designation;
  const id = props.id;
  const sector = props.sector;
  const block = props.block;
  const qrtr = props.qrtr;
  const phone = props.phone;
  const adminRemoved = props.adminRemoved;
  const completedTime = props.completedTime.slice(0, 25);
  const timestamp = props.timestamp.slice(0, 25);
  const status = props.status;
  const category = props.category;
  const subcategory = props.subcategory;
  const description = props.description;
  const today = new Date();
  const complaintDate = new Date(props.timestamp);
  const days =  Math.floor((today.getTime() - complaintDate.getTime()) / (1000*3600*24));
  const hours = Math.floor((today.getTime() - complaintDate.getTime()) / (1000*3600));
  const mins = Math.floor((today.getTime() - complaintDate.getTime()) / (1000*60));


  const handleCloseReq = () => {
    var password = prompt('Password');
    if (password === OTP) {
      console.log('Can Close req : ' + id);
      axios
        .post('http://localhost:8000/admin/close', {
          id,
        })
        .then(res => {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });
    } else {
      alert('Wrong PIN');
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <FadeInUp>
        <Card
          py="3rem"
          my="2rem"
          px="2rem"
          mx="4rem"
          width="60vw"
          borderRadius="16px"
          boxShadow=" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
          height={{ sm: '150px' }}
          bg="white"
          position="relative"
        >
          <Grid templateColumns="repeat(7, 1fr)" gap={6}>
            <GridItem w="100%" textAlign={'center'} fontWeight={'bold'}>
              Mr.{name} ({designation}){' '}
            </GridItem>
            <GridItem w="60%">
              <Text fontSize="18px">
                {sector}-{block}/{qrtr}
              </Text>
            </GridItem>
            <GridItem w="100%" textAlign={'center'}>
              <Link href={`tel:${phone}`}>{phone}</Link>
            </GridItem>
            <GridItem w="100%" textAlign={'center'}>
              {subcategory}
            </GridItem>
            <GridItem w="75%" textAlign={'center'}>
              {(days!==0)?(<p>{days}days ago</p>):((hours===0)?<p>{mins} min ago</p>:<p>{hours} hours ago</p>)}
            </GridItem>

            <GridItem w="100%" textAlign={'center'}>
              <AdminModalBox
                design={designation}
                sector={sector}
                block={block}
                qrtr={qrtr}
                timestamp={timestamp}
                completedTime={completedTime}
                description={description}
                category={category}
                subcategory={subcategory}
                phone={phone}
                status={status}
                adminRemoved={adminRemoved}
                name={name}
                designation={designation}
                id={id}
              />
            </GridItem>
            <GridItem w="100%" textAlign={'center'}>
              {status.toLowerCase() === 'pending' ? (
                <Button onClick={handleCloseReq}>Close Request</Button>
              ) : (
                <Closed cid={id} />
              )}
            </GridItem>
          </Grid>
        </Card>
      </FadeInUp>
    </ChakraProvider>
  );
};

export default ACard;
