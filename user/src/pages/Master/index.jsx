import axios from 'axios';
import { React, useState } from 'react';
import {
  ChakraProvider,
  theme,
  Button,
  Text,
  Box,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

import MasterModalBox from '../../components/layouts/MasterModalBox';
import { SimpleGrid } from '@chakra-ui/react';
import { Checkbox, CheckboxGroup } from '@chakra-ui/react';
import FadeInUp from '../../components/Animation/FadeInUp';

const Master = () => {
  var result = [''];
  const [complaint, setcomplaint] = useState([]);
  const [allAdmin, setAllAdmin] = useState([]);
  const [filterReqs, setFilterReq] = useState([]);
  const [reqStatuscheck, setReqStatuscheck] = useState({
    completed: {
      checked: false,
    },
    pending: {
      checked: false,
    },
  });
  const [sectcheck, setSectorCheck] = useState({
    a: {
      checked: false,
    },
    b: {
      checked: false,
    },
    c: {
      checked: false,
    },
  });
  const [deptcheck, setDeptCheck] = useState({
    civl: {
      checked: false,
    },
    elct: {
      checked: false,
    },
    tlcm: {
      checked: false,
    },
    intr: {
      checked: false,
    },
  });

  const [sectAcheck, setSectorACheck] = useState({
    a: {
      checked: false,
    },
    b: {
      checked: false,
    },
    c: {
      checked: false,
    },
  });
  const [deptAcheck, setDeptACheck] = useState({
    civl: {
      checked: false,
    },
    elct: {
      checked: false,
    },
    tlcm: {
      checked: false,
    },
    intr: {
      checked: false,
    },
  });

  const [posAcheck, setposACheck] = useState({
    je: {
      checked: false,
    },
    sse: {
      checked: false,
    },
  });

  const callMaster = async () => {
    try {
      result = await axios.get('http://localhost:8000/master');
      setcomplaint(result.data);
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFilterA = () => {
    const val = sectcheck.a.checked ? false : true;
    setSectorCheck({ ...sectcheck, a: { checked: val } });
  };
  const handleFilterB = () => {
    const val = sectcheck.b.checked ? false : true;
    setSectorCheck({ ...sectcheck, b: { checked: val } });
  };
  const handleFilterC = () => {
    const val = sectcheck.c.checked ? false : true;
    setSectorCheck({ ...sectcheck, c: { checked: val } });
  };

  const handleFilterCivl = () => {
    const val = deptcheck.civl.checked ? false : true;
    setDeptCheck({ ...deptcheck, civl: { checked: val } });
  };
  const handleFilterElct = () => {
    const val = deptcheck.elct.checked ? false : true;
    setDeptCheck({ ...deptcheck, elct: { checked: val } });
  };
  const handleFilterTlcm = () => {
    const val = deptcheck.tlcm.checked ? false : true;
    setDeptCheck({ ...deptcheck, tlcm: { checked: val } });
  };

  const handleFilterIntr = () => {
    const val = deptcheck.intr.checked ? false : true;
    setDeptCheck({ ...deptcheck, intr: { checked: val } });
  };

  // ________________________________________________________________________

  const handleAFilterA = () => {
    const val = sectAcheck.a.checked ? false : true;
    setSectorACheck({ ...sectAcheck, a: { checked: val } });
  };
  const handleAFilterB = () => {
    const val = sectAcheck.b.checked ? false : true;
    setSectorACheck({ ...sectAcheck, b: { checked: val } });
  };
  const handleAFilterC = () => {
    const val = sectAcheck.c.checked ? false : true;
    setSectorACheck({ ...sectAcheck, c: { checked: val } });
  };

  const handleAFilterCivl = () => {
    const val = deptAcheck.civl.checked ? false : true;
    setDeptACheck({ ...deptAcheck, civl: { checked: val } });
  };
  const handleAFilterElct = () => {
    const val = deptAcheck.elct.checked ? false : true;
    setDeptACheck({ ...deptAcheck, elct: { checked: val } });
  };
  const handleAFilterTlcm = () => {
    const val = deptAcheck.tlcm.checked ? false : true;
    setDeptACheck({ ...deptAcheck, tlcm: { checked: val } });
  };

  const handleAFilterIntr = () => {
    const val = deptAcheck.intr.checked ? false : true;
    setDeptACheck({ ...deptAcheck, intr: { checked: val } });
  };

  const handleAFilterJE = () => {
    const val = posAcheck.je.checked ? false : true;
    setposACheck({ ...posAcheck, je: { checked: val } });
  };

  const handleAFilterSSE = () => {
    const val = posAcheck.sse.checked ? false : true;
    setposACheck({ ...posAcheck, sse: { checked: val } });
  };

  const handleFilterCompleted = () => {
    const val = reqStatuscheck.completed.checked ? false : true;
    setReqStatuscheck({ ...reqStatuscheck, completed: { checked: val } });
  };
  const handleFilterPending = () => {
    const val = reqStatuscheck.pending.checked ? false : true;
    setReqStatuscheck({ ...reqStatuscheck, pending: { checked: val } });
  };

  // _________________________________________________________________________

  const handleSubmit = async event => {
    event.preventDefault();
    console.log(sectcheck);
    console.log(deptcheck);
    console.log(reqStatuscheck);
    try {
      const res = await axios.post('http://localhost:8000/masterfilter', {
        sect: sectcheck,
        dept: deptcheck,
        status: reqStatuscheck,
      });
      setFilterReq(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleSubmitAdmin = async event => {
    event.preventDefault();
    console.log(sectAcheck);
    console.log(deptAcheck);
    try {
      const res = await axios.post('http://localhost:8000/masterfilterAdmin', {
        sect: sectAcheck,
        dept: deptAcheck,
        pos: posAcheck,
      });
      setAllAdmin(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  console.log(filterReqs);
  console.log(allAdmin);

  return (
    <ChakraProvider theme={theme}>
      <Heading
        fontSize={'26px'}
        fontWeight={'bold'}
        my={'2rem'}
        mx={'6rem'}
        p={'2rem'}
        px={'4rem'}
        bgColor={'#e5e6e7'}
      >
        Master dashboard
      </Heading>
      <Box>
        <Text fontSize={'26px'} fontWeight={'bold'} my={'1rem'} mx={'6rem'}>
          Reported complaints
        </Text>
        <br />
        <Button onClick={callMaster} mx={'6rem'}>
          Refresh
        </Button>

        <SimpleGrid columns={[2, 2, 3, 4]} mx={'6rem'} my={'2rem'}>
          {complaint.map(res =>
            res.master === true ? (
              <MasterModalBox
                id={res._id} //complaint id
                EID={res.EID} //emp id
                name={res.name}
                designation={res.designation}
                sector={res.sector}
                block={res.block}
                qrtr={res.qrtr}
                phone={res.phone}
                timestamp={res.timestamp}
                category={res.category}
                subcategory={res.subcategory}
                description={res.description}
                status={res.status}
                asgnTO_ID={res.asgnTO_ID} //admin id
                asgnTO_name={res.asgnTO_name}
                asgnTO_contact={res.asgnTO_contact}
                asgnTO_desig={res.asgnTO_desig}
                feedback={res.feedback}
                completedTime={res.completedTime}
                OTP={res.OTP}
                adminRemoved={res.adminRemoved}
              />
            ) : null
          )}
        </SimpleGrid>
      </Box>
      <Box>
        <Text fontSize={'26px'} fontWeight={'bold'} my={'2rem'} mx={'6rem'}>
          Find Complaints
        </Text>
        <form onSubmit={handleSubmit}>
          <Text fontWeight={'bold'} fontSize={['md', 'lg', 'lg']} mx={'6rem'}>
            Sector
          </Text>
          <CheckboxGroup colorScheme="green">
            <Stack spacing={[1, 5]} direction={['column', 'row']} mx={'6rem'} my={"1rem"}>
              <Checkbox onChange={handleFilterA} name="filtera" value="A">
                A
              </Checkbox>
              <Checkbox onChange={handleFilterB} name="filterb" value="B">
                B
              </Checkbox>
              <Checkbox onChange={handleFilterC} name="filterc" value="C">
                C
              </Checkbox>
            </Stack>
            <br />
          </CheckboxGroup>
            <Text fontWeight={'bold'} fontSize={['md', 'lg', 'lg']} mx={'6rem'}>
              Category
            </Text>
          <CheckboxGroup colorScheme="green">
            <Stack spacing={[1, 5]} direction={['column', 'row']} mx={'6rem'} my={"1rem"}>
              <Checkbox
                onChange={handleFilterCivl}
                name="filtercivl"
                value="civil"
              >
                Civil
              </Checkbox>
              <Checkbox
                onChange={handleFilterElct}
                name="filterelct"
                value="electrical"
              >
                Electrical
              </Checkbox>
              <Checkbox
                onChange={handleFilterTlcm}
                name="filtertlcm"
                value="telecom"
              >
                Telecom
              </Checkbox>
              <Checkbox
                onChange={handleFilterIntr}
                name="filterintr"
                value="internet"
              >
                Internet
              </Checkbox>
            </Stack>
          </CheckboxGroup>
          <Text fontWeight={'bold'} fontSize={['md', 'lg', 'lg']} mx={'6rem'}>
              Status
            </Text>
          <CheckboxGroup colorScheme="green">
            <Stack spacing={[1, 5]} direction={['column', 'row']} mx={'6rem'} my={"1rem"}>
              <Checkbox
                onChange={handleFilterCompleted}
                name="filtercompleted"
                value="completed"
              >
                Completed
              </Checkbox>
              <Checkbox
                onChange={handleFilterPending}
                name="filterpending"
                value="pending"
              >
                Pending
              </Checkbox>
            </Stack>
          </CheckboxGroup>
          <br />
          <Button type="submit" mx={'6rem'}>
            Search Complaints
          </Button>
        </form>
        <br />
        <SimpleGrid columns={[2, 2, 2, 3, 4]} spacingY={'5rem'} mx={'6rem'}>
          {filterReqs.map(res => (
            <MasterModalBox
              id={res._id} //complaint id
              EID={res.EID} //emp id
              name={res.name}
              designation={res.designation}
              sector={res.sector}
              block={res.block}
              qrtr={res.qrtr}
              phone={res.phone}
              timestamp={res.timestamp}
              category={res.category}
              subcategory={res.subcategory}
              description={res.description}
              status={res.status}
              asgnTO_ID={res.asgnTO_ID} //admin id
              asgnTO_name={res.asgnTO_name}
              asgnTO_contact={res.asgnTO_contact}
              asgnTO_desig={res.asgnTO_desig}
              feedback={res.feedback}
              completedTime={res.completedTime}
              OTP={res.OTP}
              adminRemoved={res.adminRemoved}
            />
          ))}
        </SimpleGrid>
      </Box>
      <br />
      <Box>
        <Text fontSize={'26px'} fontWeight={'bold'} mx={'6rem'}>
          Engineers on Duty
        </Text>
        <Text fontSize={'26px'} fontWeight={'bold'} my={'2rem'} mx={'6rem'}>
          Find Engineers
        </Text>
        <form onSubmit={handleSubmitAdmin}>
          <CheckboxGroup colorScheme="green">
            <Text fontWeight={'bold'} fontSize={['md', 'lg', 'lg']} mx={'6rem'}>
              Sector
            </Text>

            <Stack spacing={[1, 5]} direction={['column', 'row']} mx={'6rem'}>
              <Checkbox onChange={handleAFilterA} name="filtera" value="A">
                A
              </Checkbox>
              <Checkbox onChange={handleAFilterB} name="filterb" value="B">
                B
              </Checkbox>
              <Checkbox onChange={handleAFilterC} name="filterc" value="C">
                C
              </Checkbox>
            </Stack>
          </CheckboxGroup>
          <CheckboxGroup colorScheme="green">
            <br />
            <Text fontWeight={'bold'} fontSize={['md', 'lg', 'lg']} mx={'6rem'}>
              Designation
            </Text>

            <Stack spacing={[1, 5]} direction={['column', 'row']} mx={'6rem'}>
              <Checkbox onChange={handleAFilterSSE} name="filtera" value="A">
                SSE
              </Checkbox>
              <Checkbox onChange={handleAFilterJE} name="filterb" value="B">
                JE
              </Checkbox>
            </Stack>
          </CheckboxGroup>
          <CheckboxGroup colorScheme="green">
            <br />
            <Text fontWeight={'bold'} fontSize={['md', 'lg', 'lg']} mx={'6rem'}>
              Department
            </Text>
            <Stack spacing={[1, 5]} direction={['column', 'row']} mx={'6rem'}>
              <Checkbox
                onChange={handleAFilterCivl}
                name="filtercivl"
                value="civil"
              >
                Civil
              </Checkbox>
              <Checkbox
                onChange={handleAFilterElct}
                name="filterelct"
                value="electrical"
              >
                Electrical
              </Checkbox>
              <Checkbox
                onChange={handleAFilterTlcm}
                name="filtertlcm"
                value="telecom"
              >
                Telecom
              </Checkbox>
              <Checkbox
                onChange={handleAFilterIntr}
                name="filterintr"
                value="internet"
              >
                Internet
              </Checkbox>
            </Stack>
          </CheckboxGroup>
          <br />
          <Button type="submit" mx={'6rem'}>
            Search Employees
          </Button>
        </form>
        <br />
        <SimpleGrid
          columns={[2, 3, 4, 6]}
          spacingY="50px"
          mx={'6rem'}
          pb={'5rem'}
        >
          {allAdmin.map(res => (
            <Box
              py="2rem"
              px="1.5rem"
              width="13vw"
              borderRadius="16px"
              boxShadow="0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19)"
              height={{ sm: '150px' }}
              _hover={{
                boxShadow:
                  '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
              }}
              position="relative"
            >
              {res.name}({res.designation})
              <br />
              {res.AID}
              <br />
              {res.department}
              <br />
            </Box>
          ))}
        </SimpleGrid>
        <br />

        <br />
        <AddAdmins />
      </Box>
      <Button onClick={callMaster}>Click me</Button>
    </ChakraProvider>
  );
};

const AddAdmins = () => {
  const [msg, setmsg] = useState('Please fill in the following details');
  const [AID, setAID] = useState('209301');
  const [password, setPassword] = useState('123456');
  const [cpassword, setCpassword] = useState('123456');
  const [phone, setContact] = useState('9140426929');
  const [sector, setSector] = useState('');
  const [email, setEmail] = useState('');
  const [designation, setDesig] = useState('JE');
  const [department, setDepartment] = useState('');
  const [name, setName] = useState('');
  const [stat, setStat] = useState('Register User');

  const handleAIDChange = e => setAID(e.target.value);
  const handlepasswordChange = e => setPassword(e.target.value);
  const handleCpasswordChange = e => setCpassword(e.target.value);
  const handleContactChange = e => setContact(e.target.value);
  const handleSector = e => setSector(e.target.value);
  const handleEmailChange = e => setEmail(e.target.value);
  const handleDesigChange = e => setDesig(e.target.value);
  const handleDeptChange = e => setDepartment(e.target.value);
  const handleNameChange = e => setName(e.target.value);

  const handleSubmit = async event => {
    event.preventDefault();
    console.log(AID);
    console.log(password);

    try {
      let dat = await axios.post('http://localhost:8000/admin/register', {
        AID,
        name,
        email,
        phone,
        password,
        cpassword,
        sector,
        department,
        designation,
      });

      if (dat.status === 201) {
        setmsg('Successful Registration');
        setStat('Registered');
        setTimeout(() => {
          setStat('Register User');
        }, 2000);
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
              <Heading fontSize={'4xl'}>Add Engineers</Heading>
              <Text fontSize={'lg'} color={'gray.600'}>
                Add engineers on duty to handle more service requests
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
                  <FormControl id="AID">
                    <FormLabel>UNIQUE ADMIN ID</FormLabel>
                    <Input
                      type="text"
                      id="AID"
                      value={AID}
                      onChange={handleAIDChange}
                    />
                  </FormControl>
                  <FormControl id="Contact">
                    <FormLabel>Contact</FormLabel>
                    <Input
                      type="text"
                      id="AID"
                      value={phone}
                      onChange={handleContactChange}
                    />
                  </FormControl>
                  <FormControl id="Name">
                    <FormLabel>Name</FormLabel>
                    <Input
                      type="text"
                      id="Name"
                      value={name}
                      onChange={handleNameChange}
                    />
                  </FormControl>
                  <FormControl id="Desig">
                    <FormLabel>Designation</FormLabel>
                    <Input
                      type="text"
                      id="Desig"
                      value={designation}
                      onChange={handleDesigChange}
                    />
                  </FormControl>
                  <FormControl id="AID">
                    <FormLabel>Department</FormLabel>
                    <Input
                      type="text"
                      id="AID"
                      value={department}
                      onChange={handleDeptChange}
                    />
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel>Sector</FormLabel>
                    <Input
                      type="text"
                      id="secot"
                      value={sector}
                      onChange={handleSector}
                    />
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      id="email"
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      id="password"
                      value={password}
                      onChange={handlepasswordChange}
                    />
                  </FormControl>
                  <FormControl id="cpassword">
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                      type="password"
                      id="password"
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
      </FadeInUp>
    </ChakraProvider>
  );
};

export default Master;
