import React from 'react'
import { ChakraProvider, Image,Text, Box,theme } from '@chakra-ui/react'
import mySvg from '../../../assets/carpool_img.svg'

const Hero = () => {
  return (
    <ChakraProvider theme={theme}>
    <div
       style={{ 
        // backgroundImage: `url(${mySvg})`,
        // backgroundImage: `url("https://images.unsplash.com/photo-1661961110671-77b71b929d52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")`,
        backgroundRepeat:"no-repeat",
        objectFit:"cover",
        backgroundColor:"lightblue",
        width:"100vw",
        // zIndex:-1
        // objectFit:"contain",
        // backgroundPosition:"center",
        height:"45vh",
        }}
    > 
    <Box zIndex={"1"}>

      {/* <Image src="https://cdn.blablacar.com/kairos/assets/images/carpool_only_large-1fb250954893109fa160..svg" /> */}
    </Box>
    {/* <Center> */}
        <Text color={"white"} 
        fontSize={["lg","xl","3xl","5xl"]} 
        fontWeight={"700"} 
        letterSpacing={"0.1rem"}
        textAlign={"center"}
        pt={"1.5rem"}
        >
             Your pick of rides at low prices
        </Text>
    {/* </Center> */}
    
    </div>
    
    </ChakraProvider>
  )
}

export default Hero;