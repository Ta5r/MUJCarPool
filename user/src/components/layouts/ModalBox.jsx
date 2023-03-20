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
} from '@chakra-ui/react';
import axios from 'axios';
import { Grid, GridItem } from '@chakra-ui/react';
import { Text, Link, Box } from '@chakra-ui/react';

import React from 'react';
import { BiPhoneCall } from 'react-icons/bi';
import { GrUserWorker } from 'react-icons/gr';
import { useState } from 'react';

const ModalBox = props => {
  const completedTime = props.completedTime;
  const timestamp = props.timestamp.slice(0, 25);
  const timestamp2 = new Date(props.timestamp);
  const completeTime = new Date(props.completedTime);
  const cid = props.cID;
  const [msg, setMsg] = useState(props.status);

  const removeReq = async () => {
    console.log("To Remove"+cid);
    try {
      let dat = await axios.post('http://localhost:8000/remove', {
        cid
      });
      console.log(dat.data);
      if(dat.status=== 200){
        setMsg("Removed");
      }
      else{
        setMsg("urrghh");
      }
    } catch (err) {
      console.log('Error occured ');
      console.log(err);
    }
  }

  const diff_days = Math.floor(
    (completeTime.getTime() - timestamp2.getTime()) / (1000 * 3600 * 24)
  );
  const diff_hours = Math.floor(
    (completeTime.getTime() - timestamp2.getTime()) / (1000 * 3600)
  );
  const diff_mins = Math.floor(
    (completeTime.getTime() - timestamp2.getTime()) / (1000 * 60)
  );

  if (diff_days !== 0) {
    console.log(diff_days + ' days');
  } else if (diff_hours === 0) {
    console.log(diff_mins + ' mins');
  } else {
    console.log(diff_hours + ' hours');
  }

  const description = props.description;
  const category = props.category;
  const subcategory = props.subcategory;
  const OTP = props.OTP;
  const phone = props.phone;
  const status = props.status;
  const name = 'Mr. ' + props.name;
  const status_color = status === 'COMPLETED' ? 'blue.200' : 'yellow.300';
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Details</Button>

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

            <Grid templateColumns="repeat(2, 1fr)" gap={2} pb={'2rem'}>
              <GridItem w="100%" h="10" py={'2rem'}>
                <Text fontWeight={'bold'}></Text>
                <Text display={'flex'} flexDirection={'row'}>
                  <Text pr={'0.5rem'}>
                    <GrUserWorker />
                  </Text>
                  {name}
                </Text>
              </GridItem>
              <GridItem w="100%" h="10" py={'2rem'}>
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
            <Grid bgColor="#e6e7e8">
              <GridItem
                w="100%"
                py={'2rem'}
                textAlign={'center'}
                verticalAlign={'middle'}
                bgColor={status_color}
              >
                <Text fontWeight={'bold'} fontSize={'20px'}>
                  {msg.toUpperCase()}
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
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={removeReq}>Remove</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalBox;
