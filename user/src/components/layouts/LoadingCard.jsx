import React from 'react';
import Card from '../layouts/Card';
import {  SimpleGrid, Box,Skeleton, SkeletonText  } from '@chakra-ui/react';

const LoadingCard = () => {
  return (
      <Card
        py="3rem"
        my="2rem"
        px="2rem"
        bg={'white'}
        position="relative"
        mx={['1rem', '2rem', '3rem', '4rem']}
        width="80vw"
        borderRadius="16px"
        boxShadow=" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        height={{ xs: '400px', sm: '300px', md: '150px', lg: '150px' }}
      >
        <SimpleGrid columns={[1, 3, 4, 5, 6,7]} spacing="40px">
          <Box
            w="100%"
            textAlign={'center'}
            verticalAlign={'middle'}
            h={'60px'}
          >
          <SkeletonText mt='4' noOfLines={2} spacing='4' skeletonHeight='2' />
           
          </Box>
          <Box
            w="100%"
            textAlign={'center'}
            verticalAlign={'middle'}
            h={'60px'}
          >
          <SkeletonText mt='4' noOfLines={2} spacing='4' skeletonHeight='2' />
          </Box>

          <Box w="100%" textAlign={'center'}>
          <SkeletonText mt='4' noOfLines={2} spacing='4' skeletonHeight='2' />

          </Box>
          <Box w="100%" textAlign={'center'}>
          <SkeletonText mt='4' noOfLines={2} spacing='4' skeletonHeight='2' />
          </Box>
          <Box w="100%" textAlign={'center'}>
          <SkeletonText mt='4' noOfLines={2} spacing='4' skeletonHeight='2' />

          </Box>
          <Box w="100%" textAlign={'center'}>
          <SkeletonText mt='4' noOfLines={2} spacing='4' skeletonHeight='2' />
          </Box>
          <Box w="100%" textAlign={'center'}>
          <Skeleton height='40px' />
          </Box>
        </SimpleGrid>
      </Card>
  );
};
export default LoadingCard;