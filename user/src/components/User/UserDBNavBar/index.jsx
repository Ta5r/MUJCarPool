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

export default function UserDBNavbar(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const name = props.name;
  const navigate = useNavigate();

  const handleLogout = async event => {
    console.log('Loggin user out');
    localStorage.setItem('tokenID', '');
    localStorage.setItem('AdminTokenID', '');

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
              <Link href="">
                <Text
                  fontWeight={'bold'}
                  fontFamily={'heading'}
                  color={useColorModeValue('gray.800', 'white')}
                >
                  {name}
                </Text>
              </Link>
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              <Link href="/user/dashboard/request">Make Service Request</Link>
              <Link href="/user/dashboard/status">Complaint Status</Link>
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
                  src={
                    'https://i.pinimg.com/736x/6a/72/4b/6a724b9501764fd83a4abcd37b58144d.jpg'
                  }
                />
              </MenuButton>
              <MenuList>
                <Text
                  fontSize={'18px'}
                  fontWeight={'bold'}
                  px={'10px'}
                  py={'5px'}
                  pb={'15px'}
                >
                  {name}
                  <br />
                </Text>
                {/* <MenuItem>Edit Profile</MenuItem> */}
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
