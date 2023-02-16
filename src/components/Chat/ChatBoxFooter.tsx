import { ReactIcon } from '@assets/icon'
import { Box, Button, Flex, Input } from '@chakra-ui/react'
import Translation from '@components/Translate'
import { SEND_MESSAGE } from '@redux/chat/chatModel'
import { selectChat, sendMessage } from '@redux/chat/chatSlice'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { mainColor } from '@theme/theme'
import { useSession } from 'next-auth/react'
import React, { useState, FC } from 'react'


type ChatBoxFooterProps = {
    socket?: any
}

const ChatBoxFooter: FC<ChatBoxFooterProps> = ({ handleSendMsg, socket }) => {
    const dispatch = useAppDispatch()
    const chatState = useAppSelector(selectChat)
    const { data, status } = useSession()
    const [message, setMessage] = useState('')

    const handleSendMessage = () => {
        if (chatState.currenChat?._id) {
            const messageData = {
                sender_id: data?.user && data?.user?._id,
                content: message,
                chat_id: chatState.currenChat && chatState.currenChat._id,
                createdAt: new Date().toISOString().toString()
            }
            socket.emit(SEND_MESSAGE, messageData)
            dispatch(sendMessage(messageData))
            setMessage('')
        }
    }

    const handleChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage()
        }
    }

    return (
        <Flex className="flex-col" p={2}>
            <Flex className="items-center justify-between">
                <Input
                    w='90%'
                    type="text"
                    placeholder="Write message"
                    className="message"
                    value={message}
                    size='sm'
                    onKeyDown={handleKeyPress}
                    onChange={handleChangeMessage}
                />
                <Box onClick={handleSendMessage} className='cursor-pointer px-2' >
                    <ReactIcon.IconAi.AiOutlineSend size='1.5rem' color={mainColor.newTag} />
                </Box>
            </Flex>
            {/* <Flex className='my-1 items-center'>
                <ReactIcon.IconMd.MdTagFaces size='1rem' color={mainColor.newTag} className='mx-1' />
                <ReactIcon.IconBs.BsFileImage size='1rem' color={mainColor.newTag} />
                <ReactIcon.IconMd.MdOutlineVideoLibrary size='1rem' color={mainColor.newTag} />
                <Button size='xs' variant='unstyled'>
                    ...
                </Button>
            </Flex> */}
        </Flex>
    )
}

export default ChatBoxFooter
