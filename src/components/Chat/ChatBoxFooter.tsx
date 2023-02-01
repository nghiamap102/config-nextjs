import { ReactIcon } from '@assets/icon'
import { Box, Button, Flex, Input } from '@chakra-ui/react'
import Translation from '@components/Translate'
import { mainColor } from '@theme/theme'
import React, { useState, FC } from 'react'


type ChatBoxFooterProps = {
    handleSendMsg?: () => void
}

const ChatBoxFooter: FC<ChatBoxFooterProps> = ({ handleSendMsg }) => {
    const [message, setMessage] = useState('')
    const handleSendMessage = e => {
        typeof handleSendMsg === 'function' && handleSendMsg()
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
                    onChange={e => setMessage(e.target.value)}
                />
                <ReactIcon.IconAi.AiOutlineSend size='1.5rem' color={mainColor.newTag} />
            </Flex>
            <Flex className='my-1 items-center'>
                <ReactIcon.IconMd.MdTagFaces size='1rem' color={mainColor.newTag} />
                <ReactIcon.IconBs.BsFileImage size='1rem' color={mainColor.newTag} />
                <ReactIcon.IconMd.MdOutlineVideoLibrary size='1rem' color={mainColor.newTag} />
                <Button size='xs' variant='unstyled'>
                    ...
                </Button>
            </Flex>
        </Flex>
    )
}

export default ChatBoxFooter
