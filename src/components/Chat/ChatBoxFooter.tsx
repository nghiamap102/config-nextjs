import React, { useState, FC } from 'react'


type ChatBoxFooterProps = {
    handleSendMsg?: () => void
}

const ChatBoxFooter: FC<ChatBoxFooterProps> = ({ handleSendMsg }) => {
    const [message, setMessage] = useState('')
    const handleSendMessage = e => {
        handleSendMsg()
    }

    return (
        <div className="chat__footer">
            <form className="form" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    placeholder="Write message"
                    className="message"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
                <button className="sendBtn">SEND</button>
            </form>
        </div>
    )
}

export default ChatBoxFooter
