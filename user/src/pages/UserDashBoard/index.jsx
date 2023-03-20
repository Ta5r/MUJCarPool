import React from 'react';
import RequestStatus from '../../pages/RequestStatus';
import jwt from "jwt-decode";
import { useState, useEffect } from 'react';

const UserDashBoard = () => {
  const [S_EID, setEID] = useState('');

  useEffect(() => {
    var x = localStorage.getItem('tokenID');
    const user = jwt(x);
    console.log(x);
    console.log("Hello");
    console.log(user);

    try {
      console.log('userdahboard token read from localStorage : ' + x);
      fetch('/user/dashboard/requestform', {
        method: 'GET',
        headers: {
          token: x,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }).then(response => {
        response.json().then(response => {
          console.log(response);
          setEID(response.EID);
        });
      });
    } catch (err) {
      console.log('Error occured ');
      console.log(err);
    }
  }, []);

  return (
    <div>
      <RequestStatus eid={S_EID} />
    </div>
  );
};
export default UserDashBoard;
