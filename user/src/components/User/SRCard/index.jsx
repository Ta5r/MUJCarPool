import React from 'react';
import Card from '../../layouts/Card';
import { Link, Text, Button } from '@chakra-ui/react';
import { Grid, GridItem } from '@chakra-ui/react';
import ModalBox from '../../layouts/ModalBox';
import FadeInUp from '../../Animation/FadeInUp';
import axios from 'axios';
import { useState } from 'react';

const SRCard = props => {
  var color = 'white';
  var statusColor = 'blue.200';

  const [report,setReport]=useState("Report");

  var completedTime = props.completedTime.slice(0, 25);
  const asgnTO_desig = props.asgnTO_desig;
  const asgnTO_contact = props.asgnTO_contact;
  const asgnTO_name = props.asgnTO_name;
  const timestamp = props.timestamp.slice(0, 25);
  const status = props.status.toUpperCase();
  const description = props.description;
  const subcategory = props.subcategory;
  const OTP = props.OTP;
  const phone = props.asgnTO_contact;
  const category = props.category;
  const complaintID = props.complaintID;


  const today = new Date();
  const complaintDate = new Date(props.timestamp);
  const days =  Math.floor((today.getTime() - complaintDate.getTime()) / (1000*3600*24));
  const hours = Math.floor((today.getTime() - complaintDate.getTime()) / (1000*3600));
  const mins = Math.floor((today.getTime() - complaintDate.getTime()) / (1000*60));

  if (completedTime === '') {
    completedTime = '-- --';
  }
  if (status === 'PENDING') {
    statusColor = 'yellow.300';
  }

  const reportToMaster = async () => {
    var feedback = prompt('Feedback');
    var dat = await axios.post("http://localhost:8000/report",{
      complaintID,
      feedback
    });
    if(dat.status==200){
      setReport("Reported");
    }
    console.log(dat);
  }


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
        bg={color}
        position="relative"
      >
        <Grid templateColumns="repeat(7, 1fr)" gap={10}>
          <GridItem
            w="100%"
            bgColor={statusColor}
            textAlign={'center'}
            verticalAlign={'middle'}
            h={"30px"}
            borderRadius={"50px"}
          >
            <Text>{status}</Text>
          </GridItem>
          <GridItem w="200%">
            <Text fontWeight={'bold'} fontSize="18px">
              Mr.{asgnTO_name} <br /> ({asgnTO_desig})
            </Text>
          </GridItem>
          <GridItem w="100%" textAlign={'center'}>
            <Link href={`tel:${asgnTO_contact}`}>
              <b>Call</b>
              <br />
              {asgnTO_contact}
            </Link>
          </GridItem>
          <GridItem w="100%" textAlign={'center'}>
            <Text fontWeight={'bold'}>Request</Text>
            {subcategory}
          </GridItem>
          <GridItem w="100%" textAlign={'center'}>
            {timestamp.slice(4, 16)}
            {(days!==0)?(<p>{days}days ago</p>):((hours===0)?<p>{mins} min ago</p>:<p>{hours} hours ago</p>)}
          </GridItem>
          <GridItem w="50%" textAlign={'center'} fontWeight={'bold'}>
            OTP:
            <br />
            {OTP}
          </GridItem>
          <GridItem w="100%">

          <ModalBox
            status={status}
            name={asgnTO_name}
            phone={phone}
            OTP={OTP}
            timestamp={timestamp}
            completedTime={completedTime}
            description={description}
            category={category}
            subcategory={subcategory}
            cID = {complaintID}
            />
            <br/>
          <Button mt={"0.75rem"} onClick={reportToMaster}>{report}</Button>
            </GridItem>
        </Grid>
        <br />
        <br />
      </Card>
    </FadeInUp>
  );
};

export default SRCard;
