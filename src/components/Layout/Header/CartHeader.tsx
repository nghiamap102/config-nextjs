import { IconAssets } from "@assets/index";
import { Box } from "@chakra-ui/react";
import IconHeader from "@components/IconHeader";
import { fetchCartList, selectCart } from "@redux/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { mainColor } from "@theme/theme";
import CartDrawer from "@view/Cart/CartDrawer";
import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";

type CartHeaderProps = {
    user?: any
}

const CartHeader: FC<CartHeaderProps> = ({ user }) => {
    const [drawerType, setDrawerType] = useState('')
    const cartState = useAppSelector(selectCart)
    const dispatch = useAppDispatch()
    const { data } = useSession()

    useEffect(() => {
        data && data.user && dispatch(fetchCartList(data.user._id))
    }, [data])

    return (
        <Box>
            <IconHeader
                icon={<IconAssets.ReactIcon.IconAi.AiOutlineShoppingCart size="3rem" />}
                colorIcon={mainColor.white}
                onClick={() => setDrawerType('cart')}
            >
                <Box
                    className="absolute top-0 -right-1 rounded-full px-2"
                    bg="white"
                    color={mainColor.orange}
                >
                    {cartState.list?.length || 0}
                </Box>
            </IconHeader>
            {drawerType === 'cart' && <CartDrawer onClose={() => setDrawerType('')} />}
        </Box>
    )
};

export default CartHeader