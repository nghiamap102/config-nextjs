import { NoImage } from '@assets/image';
import { Box, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

const ChatHeader = () => {
    return (
        <Flex>
            <Box className='flex items-center'>
                <Box className='relative mr-2'>
                    <Image src={NoImage} alt='abc'/>
                </Box>

                <Flex className='flex flex-col capitalize'>
                    <Text className='m-0'>abc</Text>

                    <Flex>
                        <Box className='mr-4'>
                        </Box>
                    </Flex>

                </Flex>
            </Box>
        </Flex>
    );
};

export default ChatHeader;