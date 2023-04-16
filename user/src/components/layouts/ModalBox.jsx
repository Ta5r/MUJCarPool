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
import React from 'react';
import { useState, useEffect } from 'react';

const ModalBox = props => {
  const RideID = props.rideID;
  console.log(RideID);
  // const [reqs, setReqs] = useState();

  // useEffect(async () => {
  //   try {
  //     let dat = await axios.get(
  //       `http://localhost:8000/ride/request/show/${RideID}`
  //     );
  //     console.log(dat.data);
  //     setReqs(dat.data);
  //   } catch (err) {
  //     console.log('Error occured ');
  //     console.log(err);
  //   }
  // }, []);
  // console.log(reqs);
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
            Pending Ride Requests
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Hello
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Remove</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalBox;
