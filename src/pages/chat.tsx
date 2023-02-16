import ChatBar from '@components/test/ChatBar'
import ChatBody from '@components/test/ChatBody'
import ChatFooter from '@components/test/ChatFooter'
import { useEffect, useRef, useState } from 'react'

const ChatPage = ({ socket }) => {
    const [messages, setMessages] = useState([])
    const [typingStatus, setTypingStatus] = useState("")
    const lastMessageRef = useRef(null);

    useEffect(() => {
        socket.on("message_response", data => setMessages([...messages, data]))
    }, [socket, messages])

    useEffect(() => {
        socket.on("typingResponse", data => setTypingStatus(data))
    }, [socket])

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="chat">
            <ChatBar socket={socket} />
            <div className='chat__main'>
                <ChatBody messages={messages} typingStatus={typingStatus} lastMessageRef={lastMessageRef} />
                <ChatFooter socket={socket} />
            </div>
        </div>
    )
}

export default ChatPage
