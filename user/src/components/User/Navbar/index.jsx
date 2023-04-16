import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  ChakraProvider,
  theme,
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

export default function Navbar(props) {
  const fname = props.name;
  const lname = props.lname;
  const email = props.email;
  const phone = props.phone;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleLogout = async event => {
    console.log('Loggin user out');
    localStorage.setItem('tokenID', '');

    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <Link href="/user/dashboard">
                <Text
                  fontWeight={'bold'}
                  fontFamily={'heading'}
                  color={useColorModeValue('gray.800', 'white')}
                >
                  My Rides
                </Text>
              </Link>
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              <Link href="/user/dashboard/publish">Publish a Ride</Link>
              <Link href="/user/dashboard/search">Browse Rides</Link>
              <Link href="/user/dashboard/myrequests">
                Upcoming Rides and Requests
              </Link>
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar
                  size={'sm'}
                  src={'https://avatars.githubusercontent.com/u/10548085?v=4'}
                />
              </MenuButton>
              <MenuList>
                <Text
                  fontSize={'23px'}
                  fontWeight={'bold'}
                  px={'10px'}
                  py={'5px'}
                  pb={'15px'}
                >
                  {/* {fname} {lname} */}
                  <br />
                </Text>
                <Text
                  fontSize={'18px'}
                  fontWeight={'bold'}
                  px={'10px'}
                  py={'5px'}
                  pb={'15px'}
                >
                  {/* {email} */}
                  <br />
                  +91
                  {/* {phone} */}
                  {email}
                  <br/>
                  +91 
                  {phone}
                </Text>
                <MenuDivider />
                <MenuItem onClick={handleLogout}>Log Out </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}
