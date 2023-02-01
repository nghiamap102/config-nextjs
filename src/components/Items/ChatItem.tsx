import { NoImage } from '@assets/image';
import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { IMessage } from '@redux/chat/chatModel';
import { IUser } from '@redux/user/userModel';
import { mainColor } from '@theme/theme';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FC } from 'react'

type ChatItemProps = {
    user?: IUser
    message?: IMessage
};
const ChatItem: FC<ChatItemProps> = ({
    user,
    message
}) => {

    const { data: session } = useSession()

    const renderMsg = () => {
        if (user?._id === session?.user._id) {
            return ''
        } else {
            return ''
        }
    }

    return (
        <Flex p={2}>
            <Flex className='mr-4 items-center'>
                <Image src={'https://res.cloudinary.com/bededuxe/image/upload/v1674467944/hoodie_xanh_e66bbh.jpg'} alt='avatar' height={40} width={40} />
            </Flex>
            {/* {user?.name} */}
            <Flex className='items-center flex-col'>
                <Flex className='items-center justify-between' w='100%'>
                    <Text className='mb-1' fontWeight='semibold' fontSize='md' color={mainColor.black} >nghiamap102</Text>
                    {/* {unread.length} */}
                    <Box className='px-2 rounded-full inline-block' fontSize='x-small' bg={mainColor.red} color={mainColor.white}>3</Box>
                </Flex>
                <Flex className='items-baseline justify-between' w='100%'>
                    <Text fontSize='sm' className='mr-2'>Bạn: chào bạn nhé abc...</Text>
                    {/* {message?.post_at} */}
                    <Text fontSize='x-small'>14:00</Text>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default ChatItem