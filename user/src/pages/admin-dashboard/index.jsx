import React from 'react';
import { useState, useEffect } from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import AdminDBNavbar from '../../components/Admin/AdminDBNavbar';
import ServiceRequests from '../../components/User/ServiceRequests';
import axios from 'axios';

const AdminDashboard = () => {
  const [S_AID, setAID] = useState('');
  const [S_name, setName] = useState('');
  const [S_sector, setsector] = useState('');

  console.log(S_AID);

  useEffect(() => {
    try {
      const headers = {
        token: localStorage.getItem('AdminTokenID'),
      };
      axios
        .get('http://localhost:8000/admin/dashboard/', { headers })
        .then(response => {
          console.log(response.data);
          setAID(response.data.AID);
          setName(response.data.name);
          setsector(response.data.sector);
        });
    } catch (err) {
      console.log(err);
    }
  }, [S_AID]);
  return (
    <ChakraProvider theme={theme}>
        <AdminDBNavbar name={S_name} sector={S_sector} />
        <ServiceRequests aid={S_AID} />
        <hr />
    </ChakraProvider>
  );
};

export default AdminDashboard;
