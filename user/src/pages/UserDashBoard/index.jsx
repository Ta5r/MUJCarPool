import React from 'react';
import MyRides from '../MyRides';
import jwt from 'jwt-decode';
import { useState, useEffect } from 'react';

const UserDashBoard = () => {
  const [S_UID, setUID] = useState('');

  useEffect(() => {
    var x = localStorage.getItem('tokenID');
    const user = jwt(x);
    setUID(user.UID);

    try {
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
          setUID(response.EID);
        });
      });
    } catch (err) {
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
