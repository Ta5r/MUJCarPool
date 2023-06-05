import React from 'react';
import {
  ChakraProvider,
  Text,
  Stack,
  Flex,
  Button,
  Image,
  Link,
  Heading,
  theme,
} from '@chakra-ui/react';
import FadeInUp from '../../components/Animation/FadeInUp';
import Footer from '../../components/layouts/Footer';
function App() {
  return (
    <ChakraProvider theme={theme}>
      <FadeInUp>
        <Stack minH={'80vh'} direction={{ base: 'column', md: 'row' }}>
          <Flex p={8} flex={1} align={'center'} justify={'center'}>
            <Stack spacing={6} w={'full'} maxW={'lg'}>
              <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                <Text
                  as={'span'}
                  position={'relative'}
                  _after={{
                    content: "''",
                    width: 'full',
                    position: 'absolute',
                    bottom: 1,
                    left: 0,
                    bg: 'blue.400',
                    zIndex: -1,
                  }}
                >
                  Manipal University Jaipur
                </Text>
                <br />{' '}
                <Text color={'orange.400'} as={'span'}>
                  Travel Buddy
                </Text>{' '}
              </Heading>
              <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
                This platform is an exclusive resource for the people of MUJ. 
                It provides an easy and accessible way to pool vehicles and get
                co-passengers for the go.
              </Text>
              <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                <Link href="/user/login">
                  <Button
                    rounded={'full'}
                    bg={'orange.400'}
                    color={'white'}
                    _hover={{
                      bg: 'orange.500',
                    }}
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button rounded={'full'}>Sign-Up</Button>
                </Link>
              </Stack>
            </Stack>
          </Flex>
          <Flex flex={1}>
            <Image
              alt={'MUJ-IMAGE'}
              objectFit={'cover'}
//               h="100vh"
              // w="50vw"
            h={['70vh', '80vh', '100vh', '100vh']}
            width={[
              '100vw', // 0-30em
              '100vw', // 30em-48em
              '50vw', // 48em-62em
              '50vw', // 62em+
            ]}
              src={
                "https://mujslcm.jaipur.manipal.edu:122/keen/themes/keen/theme/demo1/dist/assets/media/misc/bg_1.jpg"
              }
            />
          </Flex>
        </Stack>
      </FadeInUp>
      <Footer />
    </ChakraProvider>
  );
}

export default App;
