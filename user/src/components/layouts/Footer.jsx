import {
  ChakraProvider,
  theme,
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import { FaInstagram, FaGoogle, FaGithub } from 'react-icons/fa';
import { ReactNode } from 'react';

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode,
  label: string,
  href: string,
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={'3vh'}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <ChakraProvider theme={theme}>
      <Box
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}
        bottom={0}
        left={0}
        right={0}
        position={'fixed'}
      >
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}
        >
          <Text>© 2022 Tanay Srivastava. All rights reserved</Text>
          <Stack direction={'row'} spacing={6}>
            <SocialButton label={'Gmail'} href={'mailto:srv.tanay@gmail.com'}>
              <FaGoogle />
            </SocialButton>
            <SocialButton label={'GitHub'} href={'https://www.github.com/Ta5r'}>
              <FaGithub />
            </SocialButton>
            <SocialButton
              label={'Instagram'}
              href={'https://www.instagram.com/tanay.srv/'}
            >
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </ChakraProvider>
  );
}
