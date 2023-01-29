import { IconAssets } from '@assets/index'
import { Box, GridItem } from '@chakra-ui/react'
import CartDrawer from '@components/Cart/CartDrawer'
import IconHeader from '@components/IconHeader'
import { mainColor } from '@theme/theme'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { selectCart } from 'redux/cart/cartSlice'
import { useAppSelector } from 'redux/hooks'

const GridIconHeader = () => {
    const [drawerType, setDrawerType] = useState('')
    const cartState = useAppSelector(selectCart)
    const router = useRouter()
    const { data } = useSession()
    const name = data?.user?.name

    const renderUsername = () => {
        if (name) {
            if (name.length > 7) {
                return name.slice(0, 7).split(/(\s+)/)[0]
            } else {
                return name
            }
        } else {
            return 'sign in'
        }
    }

    const handleSignin = () => {
        !name ? router.push('/login') : router.push('/profile')
    }

    return (
        <>
            <GridItem className="flex relative justify-end mr-2" colSpan={3}>
                <IconHeader
                    icon={<IconAssets.ReactIcon.IconAi.AiOutlineHeart size="2rem" />}
                    text="wish list"
                    colorIcon={mainColor.white}
                />
                <IconHeader
                    icon={<IconAssets.ReactIcon.IconAi.AiFillGift size="2rem" />}
                    text="voucher"
                    colorIcon={mainColor.white}
                />
                <IconHeader
                    icon={<IconAssets.ReactIcon.IconAi.AiOutlineUser size="2rem" />}
                    text={renderUsername()}
                    onClick={handleSignin}
                    colorIcon={mainColor.white}
                />
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
            </GridItem>

            {drawerType === 'cart' && (
                <CartDrawer onClose={() => setDrawerType('')} />
            )}
        </>
    )
}
export default GridIconHeader
