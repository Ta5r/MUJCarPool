import { ReactNode } from 'react';
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
  Stack,
  ChakraProvider,
  theme,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const Links = ['Service Requests', 'Teams'];

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}
  >
    {children}
  </Link>
);

export default function AdminDBNavbar(props) {
  const name = props.name;

  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const sector = props.sector;

  const handleLogout = async event => {
    console.log('Logging Admin out');
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
              <Text
                fontWeight={'bold'}
                // textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                fontFamily={'heading'}
                color={useColorModeValue('gray.800', 'white')}
              >
                Mr. {name} - {sector}
              </Text>
            </Box>
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
                <Text py={'0.5rem'} px={'0.9rem'} fontWeight={'bold'}>
                  Mr. {name}
                </Text>
                <MenuItem>Add Employee</MenuItem>
                <MenuItem>Update Inventory</MenuItem>
                <MenuDivider />
                <MenuItem onClick={handleLogout}>Log Out </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map(link => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </ChakraProvider>
  );
}
