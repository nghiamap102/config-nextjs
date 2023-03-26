import { NoImage } from '@assets/image';
import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { IChat, IMessage } from '@redux/chat/chatModel';
import { fetchCurentChat } from '@redux/chat/chatSlice';
import { useAppDispatch } from '@redux/hooks';
import { mainColor } from '@theme/theme';
import { isSameDate } from '@utils/helper';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FC } from 'react'

type ChatItemProps = {
    chatItem?: IChat
};
const ChatItem: FC<ChatItemProps> = ({
    chatItem,
}) => {
    const { data: session } = useSession()
    const dispatch = useAppDispatch()
    const message = chatItem?.last_message

    const renderMsg = () => {
        if (session?.user && message.sender_id === session?.user?._id) {
            return `You: ${message?.content}`
        } else {
            return message?.content
        }
    }

    const renderTime = () => {
        if (message?.createdAt && isSameDate(message?.createdAt)) {
            return moment(message?.createdAt).format('hh:mm')
        }
    }

    const handleOpenChat = () => {
        chatItem?._id && dispatch(fetchCurentChat(chatItem?._id))
    }

    return (
        <Flex p={2} className='hover-bg-gray cursor-pointer' onClick={handleOpenChat}>
            <Flex className='mr-4 items-center'>
                <Image src={'https://res.cloudinary.com/bededuxe/image/upload/v1674467944/hoodie_xanh_e66bbh.jpg'} alt='avatar' height={40} width={40} />
            </Flex>
            <Flex className='items-center flex-col' w='100%'>
                <Flex className='items-center justify-between' w='100%'>
                    <Text className='mb-1' fontWeight='semibold' fontSize='md' color={mainColor.black}>{chatItem?.partner.name}</Text>
                    <Box className='px-2 rounded-full inline-block' fontSize='x-small' bg={mainColor.red} color={mainColor.white}>3</Box>
                </Flex>
                <Flex className='items-baseline justify-between' w='100%'>
                    <Text fontSize='sm' className='mr-2'>{renderMsg()}</Text>
                    <Text fontSize='x-small'>{renderTime()}</Text>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default ChatItem