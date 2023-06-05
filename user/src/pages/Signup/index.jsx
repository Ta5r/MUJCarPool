import {
  ChakraProvider,
  theme,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Select as ChakraSelect } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FadeInUp from '../../components/Animation/FadeInUp';

export default function Signup() {
  const navigate = useNavigate();
  const [token, setToken] = useState('');

  useEffect(() => {
    localStorage.setItem('tokenID', token);
  }, [token]);

  const [msg, setmsg] = useState('Please fill in the following details');
  const [AID, setAID] = useState();
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [phone, setContact] = useState();
  const [email, setEmail] = useState('');
  const [userType, setType] = useState('STUDENT');
  const [designation, setDesig] = useState('Student');
  const [name, setName] = useState('');
  const [lname, setLName] = useState('');
  const [stat, setStat] = useState('Register User');

  const handleAIDChange = e => setAID(e.target.value);
  const handlepasswordChange = e => setPassword(e.target.value);
  const handleCpasswordChange = e => setCpassword(e.target.value);
  const handleContactChange = e => setContact(e.target.value);
  const handleEmailChange = e => setEmail(e.target.value);
  const handleDesigChange = e => {
    setDesig(e.target.value);
    if (e.target.value == 'Student') {
      setType('STUDENT');
    } else {
      setType('EMPLOYEE');
    }
  };
  const handleNameChange = e => setName(e.target.value);
  const handleLNameChange = e => setLName(e.target.value);

  const handleSubmit = async event => {
    event.preventDefault();
    console.log(AID);
    console.log(password);

    try {
      let dat = await axios.post('https://muj-travel-buddy.onrender.com/users/register', {
//       let dat = await axios.post('https://muj-travel-buddy-backend-production.up.railway.app/users/register', {
        UID: AID,
        user_type: userType,
        fname: name,
        lname: lname,
        email,
        designation,
        phone,
        password,
      });

      if (dat.status === 201) {
        console.log(dat);
        setmsg('Successful Registration');
        setStat('Registered');
        setTimeout(() => {
          setStat('Register User');
        }, 2000);
        navigate('/user/login');
      } else {
        setStat('Registration Failed');
        setmsg('Registration Failed');
        setTimeout(() => {
          setStat('Register User');
        }, 2000);
      }
      console.log('status for admin : ' + dat.status);
    } catch (error) {
      setmsg('Registration Failed');

      console.log(error);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <FadeInUp>
        <Flex
          minH={'100vh'}
          align={'center'}
          justify={'center'}
          bg={useColorModeValue('gray.100', 'gray.800')}
        >
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'}>Sign Up</Heading>
              <Text fontSize={'lg'} color={'gray.600'}>
                Sign up to avail our car pooling services.
              </Text>
              <Text>{msg}</Text>
            </Stack>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={5}
            >
              <Stack spacing={4}>
                <form onSubmit={handleSubmit}>
                  <FormControl id="Name">
                    <FormLabel>First Name</FormLabel>
                    <Input
                      placeholder={'First name'}
                      type="text"
                      id="Name"
                      value={name}
                      onChange={handleNameChange}
                    />
                  </FormControl>
                  <FormControl id="LName">
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      placeholder={'Last name'}
                      type="text"
                      id="LName"
                      value={lname}
                      onChange={handleLNameChange}
                    />
                  </FormControl>
                  <FormControl id="AID">
                    <FormLabel>Registration Number</FormLabel>
                    <Input
                      placeholder={'209301XXX'}
                      type="text"
                      id="AID"
                      value={AID}
                      onChange={handleAIDChange}
                    />
                  </FormControl>
                  <FormControl id="Contact">
                    <FormLabel>Contact</FormLabel>
                    <Input
                      placeholder={'9876543210'}
                      type="text"
                      id="contact"
                      value={phone}
                      onChange={handleContactChange}
                    />
                  </FormControl>
                  <FormControl id="Desig">
                    <FormLabel>Designation</FormLabel>

                    <ChakraSelect onChange={handleDesigChange}>
                      <option value="Student">Student</option>
                      <option value="Teacher">Teacher</option>
                      <option value="Employee">Employee</option>
                    </ChakraSelect>
                  </FormControl>

                  <FormControl id="email">
                    <FormLabel>Email</FormLabel>
                    <Input
                      placeholder={'email@muj.manipal.edu'}
                      type="email"
                      id="email"
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input
                      placeholder={'Choose a password'}
                      type="password"
                      id="password"
                      value={password}
                      onChange={handlepasswordChange}
                    />
                  </FormControl>
                  <FormControl id="cpassword">
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                      placeholder={'Re-enter your password'}
                      type="password"
                      id="cpassword"
                      value={cpassword}
                      onChange={handleCpasswordChange}
                    />
                  </FormControl>

                  <Stack spacing={10} mt={'1rem'}>
                    <Button
                      bg={'blue.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}
                      type="submit"
                    >
                      {stat}
                    </Button>
                  </Stack>
                </form>
              </Stack>
            </Box>
          </Stack>
        </Flex>
          <br/>
          <br/>
      </FadeInUp>
    </ChakraProvider>
  );
}
