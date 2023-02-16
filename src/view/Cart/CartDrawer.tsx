import { Button, Flex } from '@chakra-ui/react'
import DrawerCPN from '@components/Drawer'
import CartDrawerItem from '@components/Items/CartDrawerItem'
import Translation from '@components/Translate'
import { createCheckout, selectCheckout } from '@redux/checkout/checkoutSlice'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { selectCart } from 'redux/cart/cartSlice'
import { useAppDispatch, useAppSelector } from 'redux/hooks'

type CartDrawerProps = {
    onClose: () => void
}
const CartDrawer: FC<CartDrawerProps> = ({ onClose }) => {
    const cartState = useAppSelector(selectCart)
    const checkoutState = useAppSelector(selectCheckout)
    const dispatch = useAppDispatch()
    const router = useRouter()

    useEffect(() => {
        const close = (e: KeyboardEvent) => {
            e.keyCode === 27 && onClose
        }
        document.addEventListener('keydown', close)
        return () => {
            document.addEventListener('keydown', close)
        }
    }, [])

    useEffect(() => {
        checkoutState.success && router.push('/checkout')
    }, [checkoutState.success, router])


    const handleCheckOut = () => {
        if (cartState.list && cartState.list?.length > 0) {
            dispatch(createCheckout(cartState.list.filter(item => item.checked)?.reduce((initArray, cartItem) => [...initArray,
            { sample_id: cartItem.product_sample?._id, product_id: cartItem.product?._id, quantity: cartItem.quantity }
            ], [])))
        }
    }

    return (
        <DrawerCPN
            size="lg"
            onClose={onClose}
            title='shopping cart'
            body={
                cartState.list && cartState.list?.length > 0 ? (
                    cartState.list?.map(item => (
                        <CartDrawerItem
                            item={item}
                            key={item._id}
                        />
                    ))
                ) : (
                    <Translation
                        className="text-center capitalize"
                        text="empty_cart"
                    />
                )
            }
            footer={
                <Flex className="flex-row w-full">
                    <Button
                        className="w-full mx-2"
                        colorScheme="blue"
                        disabled={!cartState.list?.some(item => item.checked === true)}
                        onClick={handleCheckOut}
                    >
                        <Translation text="checkout" firstCapital />
                    </Button>
                    <Link href="/cart" shallow>
                        <Button className="w-full mx-2" colorScheme="blue">
                            <Translation className="capitalize" text="view_cart" />
                        </Button>
                    </Link>
                </Flex>
            }
        />
    )
}

export default CartDrawer
