import { ReactIcon } from '@assets/icon';
import { Box, Container, Flex } from '@chakra-ui/react';
import Translation from '@components/Translate';
import { mainColor } from '@theme/theme';
import classNames from 'classnames';
import { FC, useState } from 'react'
import styles from './MiniChat.module.css'
import ChatBoxHeader from './ChatBoxHeader';
import IconCircle from '@components/Icons/IconCircle';
import ChatBoxBody from './ChatBoxBody';
import ChatBoxFooter from './ChatBoxFooter';


type MiniChatProps = {

};
const MiniChat: FC<MiniChatProps> = ({

}) => {

    const [openChat, setOpenChat] = useState(false)

    const handleOpenChat = () => {
        setOpenChat(!openChat)
        console.log('abc');
    }
    return (
        <Flex className='sticky bottom-0 justify-end mr-10'>
            <Flex className={classNames(!openChat && styles.chatbox_min, 'opacity-0 items-center cursor-pointer relative rounded-md')} px={3} py={2} color={mainColor.white} onClick={handleOpenChat} bg={mainColor.orange}>
                <ReactIcon.IconIo5.IoChatbubblesOutline className='mr-2' size='2rem' />
                <Translation text='chat' className='capitalize' fontSize='xl' />
                <IconCircle position='absolute' top='-2' right={-2} bg={mainColor.red3} children={'16'} />
            </Flex>
            <Box className={classNames(openChat ? styles.chatbox_max : 'opacity-0')}>
                <ChatBoxHeader />
                <ChatBoxBody />
                <ChatBoxFooter />
            </Box>
        </Flex>
    );
};

export default MiniChat