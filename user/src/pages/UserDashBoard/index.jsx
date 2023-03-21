import React from 'react';
import MyRides from '../MyRides';
import jwt from "jwt-decode";
import { useState, useEffect } from 'react';

const UserDashBoard = () => {
  const [S_UID, setUID] = useState('');

  useEffect(() => {
    var x = localStorage.getItem('tokenID');
    const user = jwt(x);
    console.log(x);
    console.log("Hello");
    console.log(user);

    try {
      console.log('userdahboard token read from localStorage : ' + x);
      fetch('/user/dashboard/', {
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
          setUID(response.EID);
        });
      });
    } catch (err) {
      console.log('Error occured ');
      console.log(err);
    }
  }, []);

  return (
    <div>
      <MyRides uid={S_UID} />
    </div>
  );
};
export default UserDashBoard;
