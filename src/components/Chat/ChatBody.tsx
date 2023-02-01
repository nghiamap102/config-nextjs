import { Grid, GridItem } from "@chakra-ui/react"
import ChatItem from "@components/Items/ChatItem"
import { mainColor } from "@theme/theme"
import ChatBox from "./ChatBox"

const ChatBody = () => {
    return (
        <Grid templateColumns='repeat(12,1fr)' bg={mainColor.white} h={'75%'}>
            <GridItem colSpan={5} borderRight={`1px solid ${mainColor.gray2}`} p={1}  overflowX='hidden' className="custom-scroll" bg={mainColor.white}>
                {Array(10).fill(null).map((item, index) => (
                    <ChatItem key={index} />
                ))}
            </GridItem>
            {/* infinite scroll */}
            <GridItem colSpan={7}>
                <ChatBox/>
            </GridItem>
        </Grid>
    )
}

export default ChatBody
