import { Box, Flex } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import ChatBoxFooter from "./ChatBoxFooter";
import ChatMessage from "./ChatMessage";
import { mainColor } from "@theme/theme";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { respMessage, selectChat, sendMessage, sendMessageSuccess } from "@redux/chat/chatSlice";
import { useSession } from "next-auth/react";
import { MESSAGE_RESPONSE } from "@redux/chat/chatModel";

type ChatBoxProps = {
    socket?: any
};
const ChatBox: FC<ChatBoxProps> = ({
    socket
}) => {
    const { data, status } = useSession()
    const chatState = useAppSelector(selectChat)
    const dispatch = useAppDispatch()

    useEffect(() => {
        socket.on(MESSAGE_RESPONSE, data => {
            dispatch(respMessage([...chatState.currenChat?.messages, data]))
        })
    }, [socket, chatState.currenChat?.messages])

    return (
        <Flex className="flex-col" w='100%' h='100%' maxH='100%' bg={mainColor.white}>
            {/* infinite */}
            <Flex maxH='85%' h='85%' p={3} overflow='scroll' className="flex-col custom-scroll">
                {chatState.currenChat?.messages?.map((item, index) => (
                    <ChatMessage key={index} message={item.content} left={item.sender_id === data?.user?._id} />
                ))}
            </Flex>
            <Box maxH='15%' h='15%'>
                <ChatBoxFooter socket={socket} />
            </Box>
        </Flex>
    );
};

export default ChatBox