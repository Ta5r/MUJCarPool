import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
} from '@chakra-ui/react';
import axios from 'axios';
import { Grid, GridItem } from '@chakra-ui/react';
import { Text, Link, Box } from '@chakra-ui/react';
import React from 'react';
import { BiPhoneCall } from 'react-icons/bi';
import { GrUserWorker } from 'react-icons/gr';
import { useState } from 'react';

const MasterModalBox = props => {
  const complaintID = props.id;
  // const EID = props.EID;
  // const designation = props.designation;
  // const asgnTO_ID = props.asgnTO_ID;
  const name = 'Mr. ' + props.name;
  const sector = props.sector;
  const block = props.block;
  const qrtr = props.qrtr;
  const phone = props.phone;
  const timestamp = props.timestamp.slice(0, 25);
  const category = props.category;
  const subcategory = props.subcategory;
  const description = props.description;
  const status = props.status;
  const asgnTO_name = props.asgnTO_name;
  const asgnTO_contact = props.asgnTO_contact;
  const asgnTO_desig = props.asgnTO_desig;
  const feedback = props.feedback;
  const completedTime = props.completedTime.slice(0, 25);
  const OTP = props.OTP;
  // const adminRemoved = props.adminRemoved;
  const adminRemoved = (props.adminRemoved)?"REMOVED BY ENGINEER":"";

  // --------------------------------------------

  const handleSubmit = async event => {
    event.preventDefault();
    console.log('escalate' + escAID);
    console.log(complaintID);
    const AID = escAID;
    const newAdmin = await axios.post('http://localhost:8000/get/admin', {
      AID,
    });
    console.log(newAdmin.data);

    const result = await axios.post('http://localhost:8000/escalate', {
      complaintID,
      asgnTO_ID: newAdmin.data.AID,
      asgnTO_name: newAdmin.data.name,
      asgnTO_contact: newAdmin.data.phone,
      asgnTO_desig: newAdmin.data.designation,
    });
    console.log(result);
  };
  const [escAID, setEscAID] = useState('');
  const handleEscAIDChange = e => setEscAID(e.target.value);

  // --------------------------------------------

  const timestamp2 = new Date(props.timestamp);
  const completeTime = new Date(props.completedTime);
  const cid = props.cID;
  const [msg, setMsg] = useState(props.status);

  const removeReq = async () => {
    console.log('To Remove' + cid);
    try {
      let dat = await axios.post('http://localhost:8000/remove', {
        cid,
      });
      console.log(dat.data);
      if (dat.status === 200) {
        setMsg('Removed');
      } else {
        setMsg('urrghh');
      }
    } catch (err) {
      console.log('Error occured ');
      console.log(err);
    }
  };

  const diff_days = Math.floor(
    (completeTime.getTime() - timestamp2.getTime()) / (1000 * 3600 * 24)
  );
  const diff_hours = Math.floor(
    (completeTime.getTime() - timestamp2.getTime()) / (1000 * 3600)
  );
  const diff_mins = Math.floor(
    (completeTime.getTime() - timestamp2.getTime()) / (1000 * 60)
  );

  const status_color = status === 'COMPLETED' ? 'blue.200' : 'yellow.300';
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box
        onClick={onOpen}
        py="3rem"
        px="2rem"
        width="20vw"
        borderRadius="16px"
        boxShadow="0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19)"
        height={{ sm: '300px' }}
        _hover={{
          boxShadow:
            '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        }}
        position="relative"
      >
        {asgnTO_name}({asgnTO_desig}) , {asgnTO_contact} <br />
        <br />
        {/* {timestamp}<br/> {completedTime}, <br /> */}
        {/* <b>name</b> : {name}({designation})<br /> */}
        <b>Phone</b> : {phone}, <br />
        <b>Address</b> : {sector}-{block}/{qrtr}, <br />
        <b>Status</b> : {status}, <br />
        <b>Complaint type</b> : {category} || {subcategory}, <br />
        {(feedback)?(
        <p><b>Feedback</b> : {feedback}, <br /></p>
        ):null}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} borderRadius={'15px'}>
        <ModalOverlay
          bg="none"
          backdropFilter="auto"
          backdropInvert="20%"
          backdropBlur="2px"
        />
        <ModalContent>
          <ModalHeader bg={'#e6e7e8'} fontSize="20px" borderTopRadius={'10px'}>
            {category} - {subcategory}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight={'bold'} fontSize="18px" my="1rem">
              Description
            </Text>
            <Text pb={'4rem'}>{description}</Text>
            <Grid templateColumns="repeat(2, 1fr)" gap={2} py={'2rem'}>
              <GridItem w="100%" h="10">
                <Text fontWeight={'bold'}>Placed At</Text>
                <br />
                {timestamp}
              </GridItem>
              <GridItem w="100%" h="10">
                <Text fontWeight={'bold'}>Completed At</Text>
                <br />
                {completedTime ? (
                  <Text>{completedTime}</Text>
                ) : (
                  <Text>Not yet completed</Text>
                )}
              </GridItem>
            </Grid>
            <Box
              mt={'2rem'}
              display={'flex'}
              flexDirection={'row'}
              fontSize={'18px'}
              bgColor={'#e5e6e7'}
              justifyContent={'center'}
            >
              <Text fontWeight={'bold'} fontSize="18px" pr={'0.5rem'}>
                OTP
              </Text>
              {OTP}
            </Box>
            <br />
            By
            <Grid templateColumns="repeat(2, 1fr)" gap={2}>
              <GridItem w="100%" h="10">
                <Text fontWeight={'bold'}></Text>
                <Text display={'flex'} flexDirection={'row'}>
                  <Text pr={'0.5rem'}>
                    <GrUserWorker />
                  </Text>
                  {name}
                </Text>
              </GridItem>
              <GridItem w="100%" h="10">
                <Text fontWeight={'bold'}></Text>
                <Link
                  href={`tel:${phone}`}
                  display={'flex'}
                  flexDirection={'row'}
                >
                  <Text pr={'0.5rem'}>
                    <BiPhoneCall fontSize={'20px'} />
                  </Text>
                  {phone}
                </Link>
              </GridItem>
            </Grid>
            To,
            <Grid templateColumns="repeat(2, 1fr)" gap={2}>
              <GridItem w="100%" h="10">
                <Text fontWeight={'bold'}></Text>
                <Text display={'flex'} flexDirection={'row'}>
                  <Text pr={'0.5rem'}>
                    <GrUserWorker />
                  </Text>
                  {asgnTO_name}
                </Text>
              </GridItem>
              <GridItem w="100%" h="10">
                <Text fontWeight={'bold'}></Text>
                <Link
                  href={`tel:${asgnTO_contact}`}
                  display={'flex'}
                  flexDirection={'row'}
                >
                  <Text pr={'0.5rem'}>
                    <BiPhoneCall fontSize={'20px'} />
                  </Text>
                  {asgnTO_contact}
                </Link>
              </GridItem>
            </Grid>
            <Grid bgColor="#e6e7e8">
              <GridItem
                w="100%"
                py={'2rem'}
                textAlign={'center'}
                verticalAlign={'middle'}
                bgColor={status_color}
              >
                <Text fontWeight={'bold'} fontSize={'20px'}>
                  {msg.toUpperCase()}<br/>{adminRemoved}
                </Text>
              </GridItem>
            </Grid>
            {status.toUpperCase() === 'COMPLETED' ? (
              <Grid>
                <GridItem
                  w="100%"
                  py={'2rem'}
                  textAlign={'center'}
                  verticalAlign={'middle'}
                  bgColor={'#e5e6e7'}
                >
                  Your Request was attended and completed in
                  {diff_days !== 0 ? (
                    <Text fontSize={'lg'} fontWeight={'bold'}>
                      {diff_days} days
                    </Text>
                  ) : diff_hours === 0 ? (
                    <Text fontSize={'lg'} fontWeight={'bold'}>
                      {diff_mins} mins
                    </Text>
                  ) : (
                    <Text fontSize={'lg'} fontWeight={'bold'}>
                      {diff_hours} hours
                    </Text>
                  )}
                </GridItem>
              </Grid>
            ) : null}

            {
              status.toUpperCase() === 'PENDING' ? (
                <form onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="ID to transfer task"
                id="escAID"
                value={escAID}
                onChange={handleEscAIDChange}
              />
              <Button type="submit">Escalate</Button>
            </form>
              ) : null
            }
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={removeReq}>
              Remove
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MasterModalBox;
