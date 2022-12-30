import { ReactIcon } from '@assets/icon'
import { Box, Container, Flex } from '@chakra-ui/react'
import { mainColor } from '@theme/theme'
type Props = {}
const PaymentProgress = () => {
    return (
        <Container maxW="6xl" className="flex">
            <Box
                className="rounded-full inline-block p-2"
                bg={mainColor.orange}
                color={mainColor.white}
            >
                <ReactIcon.IconAi.AiOutlineShoppingCart size="2rem" />
            </Box>

            <Flex className=" w-full items-center mx-3">
                <Box bg={mainColor.gray1} className="w-full" h={'0.2rem'} />
            </Flex>

            <Box
                className="rounded-full inline-block p-2"
                border={`1px solid ${mainColor.black}`}
                bg={mainColor.black}
                color={mainColor.white}
            >
                <ReactIcon.IconIo.IoMdCheckboxOutline size="2rem" />
            </Box>

            <Flex className="inline-block w-full items-center mx-3">
                <Box bg={mainColor.gray1} className="w-full" h={'0.2rem'} />
            </Flex>

            <Box
                className="rounded-full inline-block p-2"
                bg={mainColor.orange}
                color={mainColor.white}
            >
                <ReactIcon.IconMd.MdPayment size="2rem" />
            </Box>

            <Flex className="inline-block w-full items-center mx-3">
                <Box bg={mainColor.gray1} className="w-full" h={'0.2rem'} />
            </Flex>

            <Box
                className="rounded-full inline-block p-2"
                bg={mainColor.orange}
                color={mainColor.white}
            >
                <ReactIcon.IconMd.MdDoneAll size="2rem" />
            </Box>
        </Container>
    )
}
export default PaymentProgress
