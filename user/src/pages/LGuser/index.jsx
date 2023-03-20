import {
  ChakraProvider,
  theme,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FadeInUp from '../../components/Animation/FadeInUp';

export default function LoginUser() {
  const navigate = useNavigate();
  const [EID, setEID] = useState('');
  const [password, setpassword] = useState('');
  const [msg, setmsg] = useState('Please fill in your credentials');
  const [token, setToken] = useState('');
  const [stat, setStat] = useState('Sign in');
  const handleEIDChange = e => setEID(e.target.value);
  const handlepasswordChange = e => setpassword(e.target.value);

  useEffect(() => {
    localStorage.setItem('tokenID', token);
  }, [token]);

  const handleSubmit = async event => {
    event.preventDefault();
    console.log(EID);
    console.log(password);

    try {
      let dat = await axios.post('http://localhost:8000/user/login', {
        UID:EID,
        password,
      });
      console.log('data : ' + dat.data);
      console.log(dat.data.user);
      const stringToken = '' + dat.data.token;
      console.log('String Token : ' + stringToken);
      setToken(dat.data.token);
      console.log(dat.data.token);
      console.log('status : ' + dat.status);
      if (dat.status === 200) {
        setmsg('SUCCEFULL SIGNIN !');
        setStat('Signin successful');
        setTimeout(() => {
          navigate('/user/dashboard');
        }, 2000);
      } else {
        setStat('Please Try Again');
        setmsg('INCORRECT CREDENTIALS');
      }
    } catch (error) {
      setStat('Please Try Again');
      setTimeout(() => {
        setStat('Sign in');
        setmsg('Please fill in your credentials')
      }, 3000)
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
          bg={useColorModeValue('gray.50', 'gray.800')}
        >
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'}>Sign in to your account</Heading>
              <Text fontSize={'lg'} color={'gray.600'}>
                User Login
              </Text>
              <Text>{msg}</Text>
            </Stack>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}
            >
              <Stack spacing={4}>
                <form onSubmit={handleSubmit}>
                  <FormControl id="EID">
                    <FormLabel>Registration Number</FormLabel>
                    <Input
                    placeholder={"Registration Number"}
                      id="EID"
                      type="text"
                      value={EID}
                      onChange={handleEIDChange}
                    />
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input
                      placeholder={"Password"}
                      type="password"
                      id="password"
                      value={password}
                      onChange={handlepasswordChange}
                    />
                  </FormControl>
                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: 'column', sm: 'row' }}
                      align={'start'}
                      justify={'space-between'}
                    >
                      <Checkbox>Remember me</Checkbox>
                      <Link color={'orange.400'}>Forgot password?</Link>
                    </Stack>
                    <Button
                      bg={'orange.400'}
                      color={'white'}
                      _hover={{
                        bg: 'orange.500',
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
      </FadeInUp>
    </ChakraProvider>
  );
}
