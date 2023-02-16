import { Box, Flex, Text } from "@chakra-ui/react";
import OrderHistoryItem from "@components/Items/OrderHistoryItem";
import SearchBar from "@components/Search/SearchBar";
import CustomToast from "@components/Toast";
import Translation from "@components/Translate";
import { selectAuth } from "@redux/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { fetchCheckout2, fetchOrderList, selectOrder } from "@redux/order/orderSlice";
import { mainColor } from "@theme/theme";
import { debounce } from "lodash";
import { FC, useEffect } from "react";


type OrderHistoryViewProps = {
    user?: any
};
const OrderHistoryView: FC<OrderHistoryViewProps> = ({
    user
}) => {
    const dispatch = useAppDispatch()
    const orderState = useAppSelector(selectOrder)
    const toast = CustomToast()
    console.log(orderState)

    const arrTab = ['all', 'wait for pay', 'shipp type', 'shipping', 'completed', 'canceled', 'refund']

    const handleChange = () => {

    }

    useEffect(() => {
        dispatch(fetchOrderList(user._id))
    }, [])

    return (
        <Box position='relative'>
            <Flex bg={mainColor.white} position='sticky' className=" top-0 left-0" zIndex={2}>
                {arrTab.map(item => (
                    <Flex key={item} minW={'5rem'} className="items-center hover-primary justify-center cursor-pointer" py={4} flex={1} borderBottom={'2px solid rgba(0,0,0,.09)'}>
                        <Translation className="text-lg" text={item} firstCapital />
                    </Flex>
                ))}
            </Flex>
            <SearchBar my={2} onChange={debounce(handleChange, 300)} bg={mainColor.gray4} placeholder="Bạn có thể tìm kiếm theo tên Shop, ID đơn hàng hoặc Tên Sản phẩm" />

            <OrderHistoryItem />
        </Box>
    );
};

export default OrderHistoryView
