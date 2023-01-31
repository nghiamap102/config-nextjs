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

    const handleChatToggle = () => {
        setOpenChat(!openChat)
        console.log('abc');
    }

    return (
        <Flex className='sticky bottom-0 justify-end' zIndex={9999}>
            <Flex className={classNames(!openChat ? 'fade-in' : 'fade-out', 'absolute items-center cursor-pointer bottom-0 rounded-md right-10')} px={3} py={2} color={mainColor.white}
                onClick={handleChatToggle} bg={mainColor.orange}>
                <ReactIcon.IconIo5.IoChatbubblesOutline className='mr-2' size='2rem' />
                <Translation text='chat' className='capitalize' fontSize='xl' />
                <IconCircle position='absolute' top='-2' right={-2} bg={mainColor.red3} >16</IconCircle>
            </Flex>
            <Box className={classNames(openChat ? styles.chatbox_max : styles.chatbox_min, 'mr-20')}>
                <ChatBoxHeader handleCloseChatView={handleChatToggle} />
                <ChatBoxBody />
            </Box>
        </Flex>
    );
};

export default MiniChat