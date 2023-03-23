import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  HStack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';

const Reqs = props => {
  const name = props.rn;
  const RideID = props.riid;
  const requestID = props.reid;
  console.log(name);
  // const onAccept = () => {console.log("Accepted");};
  // const onReject = () => {console.log("Rejected");};

  // return (
  //   <>
  //     <HStack>
  //       <Text>{name}</Text>
  //       <Button colorScheme="blue" mr={3} onClick={onAccept}>
  //         Accept
  //       </Button>
  //       <Button colorScheme="blue" mr={3} onClick={onReject}>
  //         Reject
  //       </Button>
  //     </HStack>
  //   </>
  // );
};

const ModalBox = props => {
  const RideID = props.rideID;
  const [reqs, setReqs] = useState();

  useEffect(async () => {
    try {
      let dat = await axios.get(
        `http://localhost:8000/ride/request/show/${RideID}`
      );
      console.log('==================================');
      console.log(dat.data);
      setReqs(dat.data);
      console.log('==================================');
    } catch (err) {
      console.log('Error occured ');
      console.log(err);
    }
  }, []);
  console.log('11111111111111111111111111111111111111111');
  console.log(reqs);
  console.log('11111111111111111111111111111111111111111');
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
          {/*  */}
          <ModalBody>
            Hello
            {/* {reqs[0].RequestName} */}
            {/* {reqs.map(res =>(
              // res.PublisherID != UID ? (
                <Reqs
                  // riid={res.RideID}
                  // reid={res.RequestID}
                  rn={res.RequestName}
                />)
              // ) : null
            )} */}
          </ModalBody>
          {/*  */}

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
