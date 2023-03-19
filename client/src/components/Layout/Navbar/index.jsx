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
  Center,
  Text,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';

import { SearchIcon,PlusSquareIcon,TriangleDownIcon,AddIcon,InfoOutlineIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Links = ['Search','Publish a ride'];

const NavLink = ({ children }) => (
  <Link
  px={2}
  py={1}
  rounded={'md'}
  _hover={{
    textDecoration: 'none',
    bg: useColorModeValue('gray.200', 'gray.700'),
  }}
  href={'#'}>
  {children}
  </Link>
  );
  
  export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    return (
      <>
      <Box bg={useColorModeValue('white', 'gray.900')} px={4}>
      {/* <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}> */}
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'} 
      // pl={isOpen?}
      pl={["0rem","4rem","8rem"]}
      pr={["0rem","4rem","8rem"]}
      >
      {/* pl={"8rem"} pr={"10rem"}> */}
      <IconButton
      size={'md'}
      icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
      aria-label={'Open Menu'}
      display={{ md: 'none' }}
      onClick={isOpen ? onClose : onOpen}
      />
      <HStack spacing={8} alignItems={'center'}>
      {/* <Image src="https://nextlevel-arch.com/wp-content/uploads/2021/04/MUJ-Prospectus.jpg"/> */}
      <Box fontWeight={"800"} fontSize={"28"}>MUJs CarPool</Box>
      </HStack>
      <Flex alignItems={'center'}>
      <HStack
      marginRight={"2rem"}
      as={'nav'}
      spacing={4}
      display={{ base: 'none', md: 'flex' }}>
      {/* desktop view */}
      <NavLink key={Links[0]}>
      <Flex>
      <Box p={"0px"} fontSize={"19"} color={"#e06b34"}>
      <SearchIcon/>
      </Box>
      <Box p={"4px"} ml={"3px"} fontSize={"15"} fontWeight={"700"} color={"#e06b34"}>
      <Text>
      {Links[0]}
      </Text>
      </Box>
      </Flex>
      </NavLink>
      <NavLink key={Links[1]} >                  
      <Flex>
      <Box p={"0px"} fontSize={"19"} color={"#e06b34"}>
      <PlusSquareIcon/>
      </Box>
      <Box p={"4px"} ml={"3px"} fontSize={"15"} fontWeight={"700"} color={"#e06b34"}>
      <Text>
      {Links[1]}
      </Text>
      </Box>
      </Flex>
      </NavLink>
      </HStack>
      <Menu>
      <MenuButton
      as={Button}
      rounded={'full'}
      variant={'link'}
      cursor={'pointer'}
      minW={0}>
      <Avatar
      size={'md'}
      src={
        'https://nextlevel-arch.com/wp-content/uploads/2021/04/MUJ-Prospectus.jpg'
      }
      />
      <TriangleDownIcon ml={"1rem"} mt={"1rem"}/>
      </MenuButton>
      <MenuList>
      <MenuItem>Login</MenuItem>
      <MenuItem>Signup</MenuItem>
      </MenuList>
      </Menu>
      </Flex>
      </Flex>
      
      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
        <Stack as={'nav'} spacing={4}>
        {/* phone view */}
        <NavLink key={Links[0]}>{Links[0]}</NavLink>
        <NavLink key={Links[1]}>{Links[1]}</NavLink>
        </Stack>
        </Box>
        ) : null}
        </Box>
        <Center bgColor={"gray.200"}>
        
        <Box 
        p={3}  
        display={"flex"} 
        justifyContent={"center"} 
        alignItems={"center"} 
        textAlign={"center"}
        > 
        <Text 
        fontSize={["xs","sm","md"]} 
        fontWeight={"600"} 
        color={"gray.500"} 
        verticalAlign={"middle"}
        mr={"0.4rem"}
        >
        <InfoOutlineIcon mt={"-2px"}/>
        </Text>
        <Text 
        verticalAlign={"middle"}
        fontSize={["xs","sm","sm"]} 
        fontWeight={"600"} 
        color={"gray.500"}
        >
        Coronavirus: for more information about the current situation, please read our
        </Text>
        <Text 
        fontSize={["xs","sm","sm"]} 
        fontWeight={"700"} 
        ml={"5px"} 
        verticalAlign={"middle"}
        color={"#e06b34"}
        > 
        Help Centre
        </Text>
        </Box>
        </Center>
        </>
        );
      }