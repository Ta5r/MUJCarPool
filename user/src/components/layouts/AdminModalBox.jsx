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
import { Grid, GridItem } from '@chakra-ui/react';
import { Text, Link, Box } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { BiPhoneCall } from 'react-icons/bi';
import { GrUserWorker } from 'react-icons/gr';

const AdminModalBox = props => {
  const id = props.id;
  const timestamp = props.timestamp;
  const completedTime = props.completedTime;
  const description = props.description;
  const category = props.category;
  const subcategory = props.subcategory;
  const block = props.block;
  const sector = props.sector;
  const qrtr = props.qrtr;
  const phone = props.phone;
  const status = props.status;
  const designation = props.designation;
  const name = 'Mr. ' + props.name;
  const status_color = status === 'COMPLETED' ? 'blue.200' : 'yellow.300';
  const { isOpen, onOpen, onClose } = useDisclosure();
  const removeReq = () => {axios
    .post('http://localhost:8000/admin/remove', {
      _id:id,
    })
    .then(res => {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });};
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

            <Box
              mb={'2rem'}
              display={'flex'}
              flexDirection={'row'}
              fontSize={'18px'}
              bgColor={'#e5e6e7'}
              justifyContent={'center'}
            >
              <Text fontWeight={'bold'} fontSize="18px" pr={'0.5rem'}>
                Address
              </Text>
              {sector}-{block}/{qrtr}
            </Box>

            <Grid templateColumns="repeat(2, 1fr)" gap={2} pb={'2rem'}>
              <GridItem w="100%" h="10" py={'2rem'}>
                <Text fontWeight={'bold'}></Text>
                <Text display={'flex'} flexDirection={'row'}>
                  <Text pr={'0.5rem'}>
                    <GrUserWorker />
                  </Text>
                  {name} <br />({designation})
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

            <Grid templateColumns="repeat(2, 1fr)" gap={2} py={'2rem'}>
              <GridItem w="100%">
                <Text fontWeight={'bold'}>Placed At</Text>
                <br />
                {timestamp}
              </GridItem>
              <GridItem w="100%">
                <Text fontWeight={'bold'}>Completed At</Text>
                <br />
                {completedTime ? (
                  <p>{completedTime}</p>
                ) : (
                  <p>Not yet completed</p>
                )}
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
                  {status}
                </Text>
              </GridItem>
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close Panel
            </Button>
            <Button colorScheme="blue" mr={3} onClick={removeReq}>
              Remove
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AdminModalBox;
