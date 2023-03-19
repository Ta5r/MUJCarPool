import React from 'react'
import { ChakraProvider, Image,Text, Box,theme,Center, Stack } from '@chakra-ui/react'
import {SunIcon} from '@chakra-ui/icons'

const Usp = () => {
    return (
        <ChakraProvider theme={theme}>
        <Center pt={"3rem"}>

        <Stack 
        // p={"2rem"} 
        direction={['column','column','row', 'row']} 
        mx={["1rem","2rem","3rem","10rem"]} 
        >

        <Box 
        maxW={"20rem"}
        >
        <SunIcon fontSize={"4xl"} color={"gray.500"} mb={"1.5rem"}/>
            <Text 
            fontSize={["sm","sm","sm","sm"]} 
            fontWeight={"700"} 
            color={"gray.700"}
            >
                Your pick of rides at low prices
            </Text>
            <Text fontSize={["sm","sm","sm","sm"]} fontWeight={"600"} color={"gray.500"}>
                No matter where you’re going, by bus or carpool, find the perfect ride from our wide range of destinations and routes at low prices.
            </Text>
        </Box>
        <Box maxW={"20rem"}>
        <SunIcon fontSize={"4xl"} color={"gray.500"} mb={"1.5rem"}/>

        <Text fontSize={["sm","sm","sm","sm"]} fontWeight={"700"} color={"gray.700"}>
        Trust who you travel with
        </Text>
        <Text fontSize={["sm","sm","sm","sm"]} fontWeight={"600"} color={"gray.500"}>
        We take the time to get to know each of our members and bus partners. We check reviews, profiles and IDs, so you know who you’re travelling with and can book your ride at ease on our secure platform.
        </Text>
        </Box>
        <Box 
        maxW={"20rem"}
        >
        <SunIcon fontSize={"4xl"} color={"gray.500"} mb={"1.5rem"}/>

        <Text fontSize={["sm","sm","sm","sm"]} fontWeight={"700"} color={"gray.700"}>
        Scroll, click, tap and go!
        </Text>
        <Text fontSize={["sm","sm","sm","sm"]} fontWeight={"600"} color={"gray.500"}>
        Booking a ride has never been easier! Thanks to our simple app powered by great technology, you can book a ride close to you in just minutes.
        </Text>
        </Box>
        </Stack>
        </Center>
        </ChakraProvider>    
        )
    }
    
    export default Usp;