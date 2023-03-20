import React from 'react';
import ACard from '../../Admin/ACard';
import { Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
const ServiceRequests = props => {
  const [complaints, setComplaints] = useState([]);
  const aid = props.aid;
  console.log('/services/requests/aid : ' + aid);

  useEffect(() => {
    try {
      axios
        .post('http://localhost:8000/admin/requests', {
          AID: aid,
        })
        .then(response => {
          setComplaints(response.data);
        });
    } catch (err) {
      console.log('Error occured ');
      console.log(err);
    }
  }, [aid]);

  console.log('!!');
  console.log(complaints);
  console.log('!!');

  return (
    <>
    
      <Text fontWeight={'bold'} fontSize="38px" my="4rem" mx="5rem">
        Pending Requests
      </Text>
      {complaints.map(res =>
        res.status.toLowerCase() === 'pending' && res.adminRemoved === false ? 
        (
          <p>
            <ACard
              id={res._id}
              EID={res.EID}
              name={res.name}
              designation={res.designation}
              sector={res.sector}
              block={res.block}
              qrtr={res.qrtr}
              phone={res.phone}
              completedTime={res.completedTime}
              timestamp={res.timestamp}
              adminRemoved = {res.adminRemoved}
              status={res.status}
              category={res.category}
              subcategory={res.subcategory}
              description={res.description}
              OTP={res.OTP}
              feedback="Feedback"
            />
          </p>
        ) 
        : (<Text
          fontWeight={'bold'}
          ml={"6rem"}>Nothing to shoow<br/><br/><br/></Text>)
      )}
      <Text fontWeight={'bold'} fontSize="38px" my="4rem" mx="5rem">
        Completed Requests
      </Text>
      {complaints.map(res =>
        res.status.toLowerCase() === 'completed' && res.adminRemoved === false ? (
          <p>
            <ACard
              id={res._id}
              EID={res.EID}
              name={res.name}
              designation={res.designation}
              sector={res.sector}
              block={res.block}
              qrtr={res.qrtr}
              phone={res.phone}
              completedTime={res.completedTime}
              timestamp={res.timestamp}
              status={res.status}
              category={res.category}
              subcategory={res.subcategory}
              description={res.description}
              OTP={res.OTP}
              feedback="Feedback"
            />
          </p>
        ) : (<Text
        fontWeight={'bold'}
        ml={"6rem"}>Nothing to show<br/><br/><br/></Text>)
      )}
    </>
  );
};

export default ServiceRequests;
