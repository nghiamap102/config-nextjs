import { Flex } from "@chakra-ui/react"
import ChatItem from "@components/Items/ChatItem"
import { selectChat } from "@redux/chat/chatSlice"
import { useAppSelector } from "@redux/hooks"
import { mainColor } from "@theme/theme"
import { FC } from "react"
import ChatBox from "./ChatBox"

type ChatBodyProps = {
    socket: any
}
const ChatBody: FC<ChatBodyProps> = ({ socket }) => {
    const chatState = useAppSelector(selectChat)

    return (
        <Flex bg={mainColor.white} h='92%' maxH='92%'>
            <Flex h='100%' maxH='100%' w='40%'
                borderRight={`1px solid ${mainColor.gray2}`} p={1} overflowX='hidden'
                className="flex-col custom-scroll" bg={mainColor.white}
            >
                {chatState.list?.map((item, index) => <ChatItem key={index} chatItem={item} />)}
            </Flex>
            <Flex h='100%' maxH='100%' w='60%'>
                {chatState.currenChat?.messages && chatState.currenChat?.messages?.length > 0 && <ChatBox socket={socket} />}
            </Flex>
        </Flex>
    )
}

export default ChatBody
