import { Box, Flex } from "@chakra-ui/react";
import { mainColor } from "@theme/theme";
import classNames from "classnames";
import { FC } from "react";

type ChatMessageProps = {
    left?: boolean
    message?: string
};
const ChatMessage: FC<ChatMessageProps> = ({
    left,
    message,
}) => {


    const renderPosition = () => {
        return ''
    }

    return (
        <Flex className={classNames(left ? 'justify-end' : 'justify-start')} >
            <Box
                maxW='85%' bg={left ? mainColor.gray : 'blue.300'} className={classNames(left ? 'rounded-l-lg' : 'rounded-r-lg', 'px-2 py-1 my-1')}
                color={left ? mainColor.black : mainColor.white}
            >
                {message}
            </Box>
        </Flex>
    );
};

export default ChatMessage