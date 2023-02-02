import { Button, Flex } from '@chakra-ui/react'
import DrawerCPN from '@components/Drawer'
import Translation from '@components/Translate'
import { checkout } from '@redux/checkout/checkoutSlice'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { removeItemFromCart, selectCart } from 'redux/cart/cartSlice'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import CartDrawerItem from '../Items/CartDrawerItem'

type CartDrawerProps = {
    onClose: () => void
}
const CartDrawer: FC<CartDrawerProps> = ({ onClose }) => {
    const [listItemChecked, setListItemChecked] = useState<any[]>([])
    const cartState = useAppSelector(selectCart)
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

    const handleOnClickCheck = (e: React.ChangeEvent<HTMLInputElement>, cart: any) => {
        if (e.target.checked) {
            const newArr = [...listItemChecked]
            newArr.push(cart)
            setListItemChecked([...newArr])
        } else {
            const newArr = listItemChecked.filter(check => {
                if (check.product.id !== cart.product.id) {
                    return check
                }
            })
            setListItemChecked(newArr)
        }
    }

    const handleCheckOut = () => {
        if (listItemChecked.length > 0) {
            router.push('/checkout')
            dispatch(checkout(listItemChecked))
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
                            onChangeCheck={e => handleOnClickCheck(e, item)}
                            item={item}
                            key={item._id}
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
                    <Link href="/cart" shallow>
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
