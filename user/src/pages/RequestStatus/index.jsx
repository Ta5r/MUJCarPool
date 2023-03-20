import axios from 'axios';
import React, { useState, useEffect } from 'react';
import UserDBNavBar from '../../components/User/UserDBNavBar';
import { Button, Text, ChakraProvider, theme } from '@chakra-ui/react';
import SRCard from '../../components/User/SRCard';

const RequestStatus = props => {
  const eid = props.eid;
  
  const [S_EID, setEID] = useState('');
  const [S_name, setName] = useState('');
  const [complaints, setComplaints] = useState([]);
  
  useEffect(() => {
    try {
      fetch('/user/dashboard/requestform', {
        method: 'GET',
        headers: {
          token: localStorage.getItem('tokenID'),
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }).then(response => {
        response.json().then(response => {
          console.log(response);
          setEID(response.EID);
          setName(response.name);
        });
      });
    } catch (err) {
      console.log('Error occured ');
      console.log(err);
    }

    
  }, []);

  const handleLoad = () => {
    try {
      axios.get('http://localhost:8000/user/show/' + S_EID).then(response => {
        setComplaints(response.data);
      });
    } catch (err) {
      console.log('Error occured ');
      console.log(err);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <UserDBNavBar eid={S_EID} name={S_name} />
      

<Text fontWeight={'bold'} fontSize="38px" my="4rem" mx="5rem">
        Pending Requests
        </Text>   
      {complaints.map(res => (
      res.status.toLowerCase() == 'pending' ? 
        <SRCard
          sector={res.sector}
          block={res.block}
          qrtr={res.qrtr}
          completedTime={res.completedTime}
          asgnTO_desig={res.asgnTO_desig}
          feedback="Feedback"
          asgnTO_ID={res.asgnTO_ID}
          asgnTO_name={res.asgnTO_name}
          timestamp={res.timestamp}
          status={res.status}
          description={res.description}
          subcategory={res.subcategory}
          category={res.category}
          asgnTO_contact={res.asgnTO_contact}
          OTP={res.OTP}
          complaintID = {res._id}
        />
      :null))}

<Text fontWeight={'bold'} fontSize="38px" my="4rem" mx="5rem">
        Completed Requests
        </Text>   
      {complaints.map(res => (
      res.status.toLowerCase() == 'completed' ? 
        <SRCard
          sector={res.sector}
          block={res.block}
          qrtr={res.qrtr}
          completedTime={res.completedTime}
          asgnTO_desig={res.asgnTO_desig}
          feedback="Feedback"
          asgnTO_ID={res.asgnTO_ID}
          asgnTO_name={res.asgnTO_name}
          timestamp={res.timestamp}
          status={res.status}
          description={res.description}
          subcategory={res.subcategory}
          category={res.category}
          asgnTO_contact={res.asgnTO_contact}
          OTP={res.OTP}
        />
      :null))}
      <Button bgcolor="red" mx="10rem" my={"1rem"} mb={"7rem"} onClick={handleLoad}>
        Show Requests
      </Button>
      <br/>
    </ChakraProvider>
  );
};

export default RequestStatus;