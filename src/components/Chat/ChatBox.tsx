import { Box } from "@chakra-ui/react";
import { FC } from "react";
import ChatBoxFooter from "./ChatBoxFooter";
import ChatMessage from "./ChatMessage";
import { mainColor } from "@theme/theme";

type ChatBoxProps = {

};
const ChatBox: FC<ChatBoxProps> = ({

}) => {



    const handleSendMsg = () => {

    }

    return (
        <Box h='100%' bg={mainColor.white}>
            <Box h='90%' p={3} overflow='scroll' className="custom-scroll">
                {Array(14).fill(null).map((items, index) => (
                    <ChatMessage key={index} left={Math.round(Math.random() * 1) === 1} />
                ))}
            </Box>
            <Box h='10%'>
                <ChatBoxFooter handleSendMsg={handleSendMsg} />
            </Box>
        </Box>
    );
};

export default ChatBox