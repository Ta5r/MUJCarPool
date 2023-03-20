import { ChakraProvider, Button } from '@chakra-ui/react';
import React from 'react';
import axios from 'axios';

const Closed = props => {
  const _id = props.cid;

  const handleRemove = async event => {
    console.log('Removing' + _id);
    axios
      .post('http://localhost:8000/admin/remove', {
        _id,
      })
      .then(res => {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
  };

  return <Button onClick={handleRemove}>Remove</Button>;
};

export default Closed;
