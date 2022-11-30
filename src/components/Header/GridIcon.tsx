import { ReactIcon } from "@assets/icon";
import { Box, GridItem } from "@chakra-ui/react";
import DrawerCPN from "@components/Drawer";
import IconHeader from "@components/IconHeader";
import { mainColor } from "@theme/theme";
import FormLoginWrapper from "@view/Login";
import { useState } from "react";
import { selectCart } from "redux/cart/cartSlice";
import { useAppSelector } from "redux/hooks";

const GridIconHeader = () => {

    const [drawerType, setDrawerType] = useState('')
    const cartState = useAppSelector(selectCart)
    return (
        <>
            <GridItem className="flex relative justify-end mr-2" colSpan={3}>
                <IconHeader
                    icon={<ReactIcon.IconAi.AiOutlineHeart size='2rem' />}
                    text='wish list'
                    colorIcon={mainColor.white}
                />
                <IconHeader
                    icon={<ReactIcon.IconAi.AiFillGift size='2rem' />}
                    text='voucher'
                    colorIcon={mainColor.white}
                />
                <IconHeader
                    icon={<ReactIcon.IconAi.AiOutlineUser size='2rem' />}
                    text='sign in'
                    onClick={() => setDrawerType('login')}
                    colorIcon={mainColor.white}
                />
                <IconHeader
                    icon={<ReactIcon.IconAi.AiOutlineShoppingCart size='3rem' />}
                    colorIcon={mainColor.white}
                    onClick={() => setDrawerType('cart')}
                >
                    <Box className="absolute top-0 -right-1 rounded-full px-2" bg='white' color={mainColor.orange}>{cartState.list?.length}</Box>
                </IconHeader>
            </GridItem>

            {drawerType === 'cart' && <DrawerCPN onClose={() => setDrawerType('')} title={drawerType} />}
        </>
    );
};
export default GridIconHeader