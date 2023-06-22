import React from 'react';
import { Skeleton, SkeletonText, SkeletonCircle, Text, Box, HStack, VStack, Flex, Spacer } from '@chakra-ui/react';

const LoadingCard = () => {
  return (
    <Flex
      minW={'340px'}
      bgColor={'white'}
      p={'2rem'}
      mx={'1rem'}
      my={'2rem'}
      borderRadius="16px"
      width={['90vw', '80vw', '70vw', '55vw']}
      boxShadow=" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
    >
      <VStack>
        <Flex direction={"column"} justifyContent={'space-around'}>
        <Box p={"6px"}  height={['','','','150px']}>
          <SkeletonText mt='1' noOfLines={3} spacing='5' skeletonHeight='3' w={["60px","80px","120px"]}/>
        </Box>
        <HStack>
        <SkeletonCircle/>
        <Box>
          <SkeletonText mt={'1'} noOfLines={2} spacing='3' skeletonHeight='2' w={["35px","55px","75px"]}/>
        </Box>
        </HStack>
        </Flex>
      </VStack>
      <Spacer />

      <VStack>
      <Box>
          <SkeletonText mt={'1'} noOfLines={2} spacing='3' skeletonHeight='2' w={["35px","55px","75px"]}/>
        </Box>

        <br/>
      <Box>
          <SkeletonText mt={'1'} noOfLines={2} spacing='3' skeletonHeight='2' w={["35px","55px","75px"]}/>
        </Box>
      </VStack>
      <Spacer />

      <VStack>
      <Flex direction={"column"} justifyContent={"space-around"} justifyItems={"center"}>
      <Box>
          <SkeletonText mt={'1'} noOfLines={2} spacing='3' skeletonHeight='1' w={["35px","55px","75px"]}/>
      </Box>
      <Skeleton height={"30px"} width={['60px']} mt={["40px"]}/>
      </Flex>
      </VStack>
    </Flex>
  );
};
export default LoadingCard;
