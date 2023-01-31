import { Box, Grid, GridItem } from "@chakra-ui/react"
import { mainColor } from "@theme/theme"
import ChatBoxFooter from "./ChatBoxFooter"

const ChatBoxBody = () => {
    return (
        <Grid templateColumns='repeat(12,1fr)' bg={mainColor.white} h={'75%'}>
            <GridItem colSpan={5} borderRight={`1px solid ${mainColor.gray2}`} p={1} overflow={'scroll'}>
                {Array(10).fill(null).map((item, index) => (
                    <Box key={index}>
                        abc
                    </Box>
                ))}
            </GridItem>
            {/* infinite scroll */}
            <GridItem colSpan={7} overflow={'scroll'}>
                <ChatBoxFooter />
            </GridItem>
        </Grid>
    )
}

export default ChatBoxBody
