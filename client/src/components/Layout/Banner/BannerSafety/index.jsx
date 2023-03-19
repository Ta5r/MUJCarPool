import React from 'react'
import { ChakraProvider,Stack, Image,Center,Text, Box,theme } from '@chakra-ui/react'

const BannerSafety = () => {
  return (
      <ChakraProvider theme={theme}>
        <Box maxH={"50vh"} bgColor={"lightblue"} w={"100vw"}>
        <Center>
            <Stack direction={["column","column","row","row"]}
        mx={["1rem","2rem","3rem","10rem"]} 
            >
                <Box width={"400px"}>
                    <Image src="https://cdn.blablacar.com/kairos/assets/images/scamDetective-653544b71d88f51797db..svg"/>
                </Box>
                <Box>
                    <Text> Your safety is our priority</Text>
                    <Text>At BlaBlaCar, we're working hard to make our platform as secure as it can be. But when scams do happen, we want you to know exactly how to avoid and report them. Follow our tips to help us keep you safe.</Text>
                </Box>
            </Stack>
        </Center>
        </Box>
    </ChakraProvider>
  )
}

export default BannerSafety;