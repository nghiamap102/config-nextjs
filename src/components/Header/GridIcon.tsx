import { IconAssets } from "@assets/index";
import { Box, Button, Flex, GridItem } from "@chakra-ui/react";
import CartItem from "@components/Cart/CartItem";
import DrawerCPN from "@components/Drawer";
import IconHeader from "@components/IconHeader";
import Translation from "@components/Translate";
import { mainColor } from "@theme/theme";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { removeItemFromCart, selectCart } from "redux/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";

const GridIconHeader = () => {

    const [drawerType, setDrawerType] = useState('')
    const cartState = useAppSelector(selectCart)
    const router = useRouter()
    const dispatch = useAppDispatch()
    return (
        <>
            <GridItem className="flex relative justify-end mr-2" colSpan={3}>
                <IconHeader
                    icon={<IconAssets.ReactIcon.IconAi.AiOutlineHeart size='2rem' />}
                    text='wish list'
                    colorIcon={mainColor.white}
                />
                <IconHeader
                    icon={<IconAssets.ReactIcon.IconAi.AiFillGift size='2rem' />}
                    text='voucher'
                    colorIcon={mainColor.white}
                />
                <IconHeader
                    icon={<IconAssets.ReactIcon.IconAi.AiOutlineUser size='2rem' />}
                    text='sign in'
                    onClick={() => router.push('/login')}
                    colorIcon={mainColor.white}
                />
                <IconHeader
                    icon={<IconAssets.ReactIcon.IconAi.AiOutlineShoppingCart size='3rem' />}
                    colorIcon={mainColor.white}
                    onClick={() => setDrawerType('cart')}
                >
                    <Box className="absolute top-0 -right-1 rounded-full px-2" bg='white' color={mainColor.orange}>{cartState.list?.length}</Box>
                </IconHeader>
            </GridItem>

            {drawerType === 'cart' &&
                <DrawerCPN
                    size="lg"
                    onClose={() => setDrawerType('')}
                    title={'shopping cart'}
                    body={(cartState.list && cartState.list?.length > 0
                        ? cartState.list?.map(cart =>
                            <CartItem onClickCheck={() => console.log('ac')} item={cart} key={cart.product && cart.product.id} onRemoveItem={() => dispatch(removeItemFromCart(cart))} />)
                        : <Translation className="text-center capitalize" text="empty_cart" type={['cart']} />
                    )}
                    footer={(
                        <Flex className="flex-col w-full">
                            <Link href='/checkout'><Button className="w-full"><Translation className="capitalize" text="checkout" type={['cart']} /></Button></Link>
                            <Link href='/cart'><Button className="w-full"><Translation className="capitalize" text="view_cart" type={['cart']} /></Button></Link>
                        </Flex>
                    )}
                />
            }
        </>
    );
};
export default GridIconHeader