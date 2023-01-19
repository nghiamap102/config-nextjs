import { Button, Flex } from '@chakra-ui/react'
import DrawerCPN from '@components/Drawer'
import Translation from '@components/Translate'
import cartService from '@redux/cart/cartService'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { removeItemFromCart, selectCart, setCartList } from 'redux/cart/cartSlice'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import CartDrawerItem from '../Items/CartDrawerItem'

type CartDrawerProps = {
    onClose: () => void
}
const CartDrawer: FC<CartDrawerProps> = ({ onClose }) => {
    const [checkout, setCheckout] = useState<any[]>([])
    const cartState = useAppSelector(selectCart)
    const dispatch = useAppDispatch()
    const router = useRouter()

    useEffect(() => {
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            e.keyCode === 27 && onClose
        })
    }, [])


    useEffect(() => {
        const getCartDetail = async () => {
            const res = await cartService.getCartDetails()
            dispatch(setCartList(res.data))
            console.log(res.data)
        }
        getCartDetail()
    }, [])

    const handleOnClickCheck = (e: React.ChangeEvent<HTMLInputElement>, cart: any) => {
        if (e.target.checked) {
            // const newArr = [...checkout]
            // newArr.push(cart)
            // setCheckout([...newArr])
        } else {
            // const newArr = checkout.filter(check => {
            //     if (check.product.id !== cart.product.id) {
            //         return check
            //     }
            // })
            // setCheckout(newArr)
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
                    cartState.list?.map(item => (
                        <CartDrawerItem
                            onChangeCheck={e => handleOnClickCheck(e, item)}
                            item={item}
                            key={item.productId}
                            onRemoveItem={() => dispatch(removeItemFromCart(item))}
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
                        disabled
                        onClick={handleCheckOut}
                    >
                        <Translation
                            className="capitalize"
                            text="checkout"
                        />
                    </Button>
                    <Link href="/cart">
                        <Button className="w-full mx-2" colorScheme="blue">
                            <Translation
                                className="capitalize"
                                text="view_cart"
                            />
                        </Button>
                    </Link>
                </Flex>
            }
        />
    )
}

export default CartDrawer
