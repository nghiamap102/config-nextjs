import { ReactIcon } from '@assets/icon'
import { Button, Flex } from '@chakra-ui/react'
import Translation from '@components/Translate'
import { mainColor } from '@theme/theme'
import { FC } from 'react'

type ChatBoxHeaderProps = {
    handleCloseChatView?: () => void
}

const ChatBoxHeader: FC<ChatBoxHeaderProps> = ({ handleCloseChatView }) => {
    return (
        <Flex bg={mainColor.orange} className='rounded-t-xl py-2 px-2 justify-between' color={mainColor.white}>
            <Flex className='items-center'>
                <ReactIcon.IconIo5.IoChatbubblesOutline size='1.5rem' className='mr-2' />
                <Translation text='chat' className='capitalize' />
            </Flex>
            <Button bg={'transparent'}
                _hover={{ opacity: 0.8, bg: mainColor.orange2, _active: { bg: 'transparent' } }} size='sm'
                onClick={handleCloseChatView}
            >
                <ReactIcon.IconAi.AiOutlineCloseCircle size='1.4rem' />
            </Button>
        </Flex>
    )
}

export default ChatBoxHeader
