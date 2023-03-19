import React from 'react'
import { ChakraProvider, Image, Box } from '@chakra-ui/react'
import Navbar from '../../components/Layout/Navbar'
import Hero from '../../components/Layout/Hero'
import Usp from '../../components/Layout/Usp'
import BannerSafety from '../../components/Layout/Banner/BannerSafety/index.jsx'
// import { ReactComponent as Img_svg } from '../../assets/carpool_img.svg';

const Home = () => {
  return (
    <ChakraProvider>
        <Navbar/>
        <hr/>
        <Hero/>
        <Usp/>
        <BannerSafety/>
    </ChakraProvider>
  )
}

export default Home;