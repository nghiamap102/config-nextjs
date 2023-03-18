import { ReactIcon } from "@assets/icon";
import { Box, Button, Container, Flex } from "@chakra-ui/react";
import { ButtonPrimary } from "@components/Button";
import Translation from "@components/Translate";
import { mainColor } from "@theme/theme";
import { useRouter } from "next/router";
import { FC } from "react";

type CheckoutSucessProps = {

};
const CheckoutSucess: FC<CheckoutSucessProps> = (props: Props) => {

    const router = useRouter()

    const handleChangeRoute = () => {
        router.push('/order', undefined, { shallow: true })
    }

    return (
        <Container maxW='container.xl' my={5} px={0}>
            <Flex bg={mainColor.orange} className="items-center justify-center flex-col" p={4} py={16} borderRadius='xl'>
                <Box borderRadius='full' bg={mainColor.white}>
                    <ReactIcon.IconBs.BsCheckCircleFill size='4rem' color={mainColor.success} />
                </Box>
                <Translation text="checkout_success" my={3}/>
                <Button onClick={handleChangeRoute} >
                    Order detail page
                </Button>
            </Flex>
        </Container>
    );
};

export default CheckoutSucess