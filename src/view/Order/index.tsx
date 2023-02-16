import { Box, Container } from "@chakra-ui/react";
import OrderItem from "@components/Items/OrderItem";
import Layout from "@components/Layout";
import { useAppSelector } from "@redux/hooks";
import { selectOrder } from "@redux/order/orderSlice";
import { mainColor } from "@theme/theme";

export const OrderView = (props: Props) => {

    const orderState = useAppSelector(selectOrder)
    return (
        <Layout>
            <Container maxW='container.xl' bg={mainColor.white} my={5} px={5} py={7}>
                {orderState.list?.map((item) => (
                    <OrderItem key={item._id} />
                ))}
            </Container>
        </Layout>
    );
};

export default OrderView