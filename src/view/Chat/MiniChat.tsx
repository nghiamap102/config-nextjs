import { ReactIcon } from '@assets/icon';
import { Box, Flex } from '@chakra-ui/react';
import IconCircle from '@components/Icons/IconCircle';
import Translation from '@components/Translate';
import { useAppDispatch } from '@redux/hooks';
import { mainColor } from '@theme/theme';
import classNames from 'classnames';
import { SocketContext } from 'pages/_app';
import { FC, useContext, useEffect, useState } from 'react';
import ChatBody from './ChatBody';
import ChatHeader from './ChatHeader';
import styles from './MiniChat.module.css';
import { fetchAllChats } from '@redux/chat/chatSlice';
import { useSession } from 'next-auth/react';

type MiniChatProps = {

};
const MiniChat: FC<MiniChatProps> = ({

}) => {
    const socket = useContext(SocketContext)
    const dispatch = useAppDispatch()
    const [openChat, setOpenChat] = useState(false)
    const { data } = useSession()

    const handleChatToggle = () => {
        setOpenChat(!openChat)
    }

    useEffect(() => {
        dispatch(fetchAllChats(data?.user._id))
    }, [])

    return (
        <Flex className='fixed bottom-0 right-0' zIndex={10}>
            <Flex className={classNames(!openChat ? 'fade-in' : 'fade-out', 'absolute items-center cursor-pointer bottom-0 rounded-md')}
                right={10} px={3} py={2} color={mainColor.white}
                onClick={handleChatToggle} bg={mainColor.orange}
            >
                <ReactIcon.IconIo5.IoChatbubblesOutline className='mr-2' size='2rem' />
                <Translation text='chat' className='capitalize' fontSize='xl' />
                <IconCircle position='absolute' top='-2' right={-2} bg={mainColor.red3} >16</IconCircle>
            </Flex>
            <Box className={classNames(openChat ? styles.chatbox_max : styles.chatbox_min, styles.chatbox, ' absolute bottom-0 overflow-hidden')} right={20}>
                <ChatHeader handleCloseChatView={handleChatToggle} />
                <ChatBody socket={socket} />
            </Box>
        </Flex>
    );
};

export default MiniChat