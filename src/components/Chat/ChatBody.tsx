import { Flex, Grid, GridItem } from "@chakra-ui/react"
import ChatItem from "@components/Items/ChatItem"
import { fetchAllChats, selectChat } from "@redux/chat/chatSlice"
import { useAppDispatch, useAppSelector } from "@redux/hooks"
import { mainColor } from "@theme/theme"
import { useSession } from "next-auth/react"
import { FC, useEffect } from "react"
import ChatBox from "./ChatBox"

type ChatBodyProps = {
    socket: any
}
const ChatBody: FC<ChatBodyProps> = ({ socket }) => {

    const chatState = useAppSelector(selectChat)
    const dispatch = useAppDispatch()
    const { data, status } = useSession()

    useEffect(() => {
        dispatch(fetchAllChats(data?.user._id))
    }, [])

    return (
        <Flex bg={mainColor.white} h='92%' maxH='92%'>
            <Flex h='100%' maxH='100%' w='40%'
                borderRight={`1px solid ${mainColor.gray2}`} p={1} overflowX='hidden'
                className="flex-col custom-scroll" bg={mainColor.white}>
                {chatState.list?.map((item, index) => (
                    <ChatItem key={index} chatItem={item} />
                ))}
            </Flex>
            {/* infinite scroll */}
            <Flex h='100%' maxH='100%' w='60%'>
                <ChatBox socket={socket} />
            </Flex>
        </Flex>
    )
}

export default ChatBody
