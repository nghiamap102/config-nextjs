import { Button, Flex } from '@chakra-ui/react'
import MiniCartItem from '@components/Cart/MiniCartItem'
import DrawerCPN from '@components/Drawer'
import Translation from '@components/Translate'
import { CartData } from '@redux/cart/cartModel'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { removeItemFromCart, selectCart } from 'redux/cart/cartSlice'
import { useAppDispatch, useAppSelector } from 'redux/hooks'

type CartDrawerProps = {
    onClose: () => void
}
const CartDrawer: FC<CartDrawerProps> = ({ onClose }) => {
    const [checkout, setCheckout] = useState<CartData[]>([])
    const cartState = useAppSelector(selectCart)
    const dispatch = useAppDispatch()
    const router = useRouter()
    useEffect(() => {
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            e.keyCode === 27 && onClose
        })
    }, [])

    const handleOnClickCheck = (
        e: React.ChangeEvent<HTMLInputElement>,
        cart: CartData,
    ) => {
        if (e.target.checked) {
            const newArr = [...checkout]
            newArr.push(cart)
            setCheckout([...newArr])
        } else {
            const newArr = checkout.filter(check => {
                if (check.product.id !== cart.product.id) {
                    return check
                }
            })
            setCheckout(newArr)
        }
    }

    const handleCheckOut = () => {
        if (checkout.length > 0) {
            sessionStorage.setItem('checkout', JSON.stringify(checkout))
            router.push('/checkout')
        }
    }

    return (
        <DrawerCPN
            size="lg"
            onClose={onClose}
            title={'shopping cart'}
            body={
                cartState.list && cartState.list?.length > 0 ? (
                    cartState.list?.map(cart => (
                        <MiniCartItem
                            onChangeCheck={e => handleOnClickCheck(e, cart)}
                            item={cart}
                            key={cart.product && cart.product.id}
                            onRemoveItem={() =>
                                dispatch(removeItemFromCart(cart))
                            }
                        />
                    ))
                ) : (
                    <Translation
                        className="text-center capitalize"
                        text="empty_cart"
                        type={['cart']}
                    />
                )
            }
            footer={
                <Flex className="flex-row w-full">
                    <Button
                        className="w-full mx-2"
                        colorScheme="blue"
                        disabled={
                            checkout.length < 1 || cartState.list?.length < 1
                        }
                        onClick={handleCheckOut}
                    >
                        <Translation
                            className="capitalize"
                            text="checkout"
                            type={['cart']}
                        />
                    </Button>
                    <Link href="/cart">
                        <Button className="w-full mx-2" colorScheme="blue">
                            <Translation
                                className="capitalize"
                                text="view_cart"
                                type={['cart']}
                            />
                        </Button>
                    </Link>
                </Flex>
            }
        />
    )
}

export default CartDrawer
