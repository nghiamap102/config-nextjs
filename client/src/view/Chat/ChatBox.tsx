import { Box, Flex } from "@chakra-ui/react";
import { DotLoading } from "@components/DotLoading";
import { MESSAGE_RESPONSE } from "@redux/chat/chatModel";
import chatService from "@redux/chat/chatService";
import { respMessage, selectChat } from "@redux/chat/chatSlice";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { mainColor } from "@theme/theme";
import { useSession } from "next-auth/react";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import ChatBoxFooter from "./ChatBoxFooter";
import ChatMessage from "./ChatMessage";
let page = 1

type ChatBoxProps = {
    socket?: any
};
const ChatBox: FC<ChatBoxProps> = ({
    socket,
}) => {
    const { data } = useSession()
    const chatState = useAppSelector(selectChat)
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [msg, setMsg] = useState([
        {
            "_id": "63e30e0db3b677f0a47bdd4a",
            "sender_id": "63e21c3bdc39f1345c6bdccf",
            "chat_id": "63e224e07f74618534420d43",
            "createdAt": "2023-02-08T02:50:53.704Z",
            "updatedAt": "2023-02-08T02:50:53.704Z",
            "__v": 0,
            "content": "hello how r u"
        },
        {
            "_id": "63e30fdf8df07ce5774433a7",
            "sender_id": "63e21cb5ad66ea90aceffa7d",
            "chat_id": "63e224e07f74618534420d43",
            "createdAt": "2023-02-08T02:58:39.500Z",
            "updatedAt": "2023-02-08T02:58:39.500Z",
            "__v": 0,
            "content": "im fine"
        },
        {
            "_id": "63e32e2d9240cb5bf797fe42",
            "sender_id": "63e21c3bdc39f1345c6bdccf",
            "chat_id": "63e224e07f74618534420d43",
            "content": "fk u guy",
            "createdAt": "2023-02-08T05:07:57.509Z",
            "updatedAt": "2023-02-08T05:07:57.509Z",
            "__v": 0
        },
        {
            "_id": "63e35cf8c819e06c2958608a",
            "sender_id": "63e21c3bdc39f1345c6bdccf",
            "chat_id": "63e224e07f74618534420d43",
            "content": "chafo",
            "createdAt": "2023-02-08T08:27:36.374Z",
            "updatedAt": "2023-02-08T08:27:36.374Z",
            "__v": 0
        },
        {
            "_id": "63e35f1d331e2b2e8f4e931e",
            "sender_id": "63e21cb5ad66ea90aceffa7d",
            "chat_id": "63e224e07f74618534420d43",
            "content": "nghe nef",
            "createdAt": "2023-02-08T08:36:45.858Z",
            "updatedAt": "2023-02-08T08:36:45.858Z",
            "__v": 0
        },
        {
            "_id": "63e30e0db3b677f0a47bdd4a",
            "sender_id": "63e21c3bdc39f1345c6bdccf",
            "chat_id": "63e224e07f74618534420d43",
            "createdAt": "2023-02-08T02:50:53.704Z",
            "updatedAt": "2023-02-08T02:50:53.704Z",
            "__v": 0,
            "content": "hello how r u"
        },
        {
            "_id": "63e30fdf8df07ce5774433a7",
            "sender_id": "63e21cb5ad66ea90aceffa7d",
            "chat_id": "63e224e07f74618534420d43",
            "createdAt": "2023-02-08T02:58:39.500Z",
            "updatedAt": "2023-02-08T02:58:39.500Z",
            "__v": 0,
            "content": "im fine"
        },
        {
            "_id": "63e32e2d9240cb5bf797fe42",
            "sender_id": "63e21c3bdc39f1345c6bdccf",
            "chat_id": "63e224e07f74618534420d43",
            "content": "fk u guy",
            "createdAt": "2023-02-08T05:07:57.509Z",
            "updatedAt": "2023-02-08T05:07:57.509Z",
            "__v": 0
        },
        {
            "_id": "63e35cf8c819e06c2958608a",
            "sender_id": "63e21c3bdc39f1345c6bdccf",
            "chat_id": "63e224e07f74618534420d43",
            "content": "chafo",
            "createdAt": "2023-02-08T08:27:36.374Z",
            "updatedAt": "2023-02-08T08:27:36.374Z",
            "__v": 0
        },
        {
            "_id": "63e35f1d331e2b2e8f4e931e",
            "sender_id": "63e21cb5ad66ea90aceffa7d",
            "chat_id": "63e224e07f74618534420d43",
            "content": "nghe nef",
            "createdAt": "2023-02-08T08:36:45.858Z",
            "updatedAt": "2023-02-08T08:36:45.858Z",
            "__v": 0
        },
        {
            "_id": "63e30e0db3b677f0a47bdd4a",
            "sender_id": "63e21c3bdc39f1345c6bdccf",
            "chat_id": "63e224e07f74618534420d43",
            "createdAt": "2023-02-08T02:50:53.704Z",
            "updatedAt": "2023-02-08T02:50:53.704Z",
            "__v": 0,
            "content": "hello how r u"
        },
        {
            "_id": "63e30fdf8df07ce5774433a7",
            "sender_id": "63e21cb5ad66ea90aceffa7d",
            "chat_id": "63e224e07f74618534420d43",
            "createdAt": "2023-02-08T02:58:39.500Z",
            "updatedAt": "2023-02-08T02:58:39.500Z",
            "__v": 0,
            "content": "im fine"
        },
        {
            "_id": "63e32e2d9240cb5bf797fe42",
            "sender_id": "63e21c3bdc39f1345c6bdccf",
            "chat_id": "63e224e07f74618534420d43",
            "content": "fk u guy",
            "createdAt": "2023-02-08T05:07:57.509Z",
            "updatedAt": "2023-02-08T05:07:57.509Z",
            "__v": 0
        },
        {
            "_id": "63e35cf8c819e06c2958608a",
            "sender_id": "63e21c3bdc39f1345c6bdccf",
            "chat_id": "63e224e07f74618534420d43",
            "content": "chafo",
            "createdAt": "2023-02-08T08:27:36.374Z",
            "updatedAt": "2023-02-08T08:27:36.374Z",
            "__v": 0
        },
        {
            "_id": "63e35f1d331e2b2e8f4e931e",
            "sender_id": "63e21cb5ad66ea90aceffa7d",
            "chat_id": "63e224e07f74618534420d43",
            "content": "nghe nef",
            "createdAt": "2023-02-08T08:36:45.858Z",
            "updatedAt": "2023-02-08T08:36:45.858Z",
            "__v": 0
        }
    ])

    const onLoadMore = async () => {
        const res = await chatService.fetchCurrentChat('63e224e07f74618534420d43', `page=${page}`)
        page += 1
        setMsg([...res.data.messages, ...msg])
        res.data.messages.length < 1 && setHasNextPage(false)
    }

    const [infiniteRef, { rootRef }] = useInfiniteScroll({
        loading,
        hasNextPage: true,
        onLoadMore: onLoadMore,
    })

    useEffect(() => {
        socket.on(MESSAGE_RESPONSE, data => dispatch(respMessage([...chatState.currenChat?.messages, data])))
    }, [socket, chatState.currenChat?.messages, dispatch])


    const scrollableRootRef = useRef<HTMLDivElement | null>(null);
    const lastScrollDistanceToBottomRef = useRef<number>();

    useEffect(() => {
        const scrollableRoot = scrollableRootRef.current;
        const lastScrollDistanceToBottom = lastScrollDistanceToBottomRef.current || 0;
        if (scrollableRoot) {
            scrollableRoot.scrollTop = scrollableRoot.scrollHeight - lastScrollDistanceToBottom;
        }
    }, [msg, scrollableRootRef]);

    const rootRefSetter = useCallback((node: HTMLDivElement) => {
        rootRef(node)
        scrollableRootRef.current = node
    }, [rootRef])

    const handleRootScroll = () => {
        const rootNode = scrollableRootRef.current;
        if (rootNode) {
            const scrollDistanceToBottom = rootNode.scrollHeight - rootNode.scrollTop;
            lastScrollDistanceToBottomRef.current = scrollDistanceToBottom;
        }
    };

    return (
        <Flex className="flex-col" w='100%' h='100%' maxH='100%' bg={mainColor.white}>
            <Flex maxH='85%' h='85%' >
                <Flex
                    w='full'
                    p={2}
                    ref={rootRefSetter}
                    onScroll={handleRootScroll}
                    overflowY='scroll'
                    className="flex-col custom-scroll"
                >
                    {(hasNextPage) && (
                        <Flex
                            ref={infiniteRef}
                            justify='center'
                            className='my-2'
                        >
                            <DotLoading />
                        </Flex>
                    )}
                    {msg?.map((item, index) => (
                        <ChatMessage key={index} message={item.content} left={item.sender_id === data?.user?._id} />
                    ))}
                </Flex>
            </Flex>
            <Box maxH='15%' h='15%'>
                <ChatBoxFooter socket={socket} />
            </Box>
        </Flex>
    );
};

export default ChatBox