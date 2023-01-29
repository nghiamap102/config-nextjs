import { Button, Checkbox, Container, Flex, Grid, GridItem } from '@chakra-ui/react'
import CartItems from '@components/Items/CartItems'
import Layout from '@components/Layout'
import Meow from '@components/Meow'
import Translation from '@components/Translate'
import { ICartItem } from '@redux/cart/cartModel'
import { selectCart, setCartList } from '@redux/cart/cartSlice'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { mainColor } from '@theme/theme'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import CartToolBar from './CartToolBar'
import cartService from '@redux/cart/cartService'

const CartView: FC = () => {
    const dispatch = useAppDispatch()
    const cartSelector = useAppSelector(selectCart)

    const [listItemChecked, setListItemChecked] = useState<ICartItem[]>([])

    const router = useRouter()

    const handleSelectAllItems = (selected: boolean) => {
        selected && cartSelector.list && setListItemChecked(cartSelector.list)
        !selected && setListItemChecked([])
    }
    const handleSelected = (cartItem: ICartItem, e: React.ChangeEvent<HTMLInputElement>) => {
        const listItem = [...listItemChecked]
        if (e.target.checked) {
            listItem.push(cartItem)
            setListItemChecked(listItem)
        } else {
            const newArr = listItem.filter(item => {
                if (item._id !== cartItem._id) {
                    return item
                }
            })
            setListItemChecked(newArr)
        }
    }

    const handleDelItem = (item: ICartItem) => {
        cartService.deleteItem(item)
        const newArr: any[] = cartSelector.list?.filter(listItem => {
            if (item._id !== listItem._id)
                return listItem
        })
        dispatch(setCartList(newArr))
    }

    return (
        <Layout>
            <Container my={5} maxW="container.xl">
                {cartSelector.list && cartSelector.list?.length > 0 && (
                    <Grid templateColumns="repeat(24, 1fr)" px={7} py={5} bg={mainColor.white} mb={3}>
                        <GridItem colSpan={1} fontSize="md" className='flex items-center'>
                            <Checkbox onChange={(e) => handleSelectAllItems(e.target.checked)} />
                        </GridItem>
                        <GridItem colSpan={12} fontSize="md">
                            <Translation className="capitalize" text='items' />
                        </GridItem>

                        <GridItem
                            colSpan={3}
                            color={mainColor.gray2}
                            className="text-center"
                        >
                            <Translation className="capitalize" text='unit_price' />
                        </GridItem>

                        <GridItem
                            colSpan={3}
                            color={mainColor.gray2}
                            className="text-center"
                        >
                            <Translation className="capitalize" text='quantity' />
                        </GridItem>

                        <GridItem
                            colSpan={3}
                            color={mainColor.gray2}
                            className="text-center"
                        >
                            <Translation className="capitalize" text='total' />
                        </GridItem>

                        <GridItem
                            colSpan={2}
                            color={mainColor.gray2}
                            className="text-center"
                        >
                            <Translation className="capitalize" text='action' />
                        </GridItem>
                    </Grid>
                )}

                {cartSelector.list?.map((item, index) => (
                    <CartItems
                        item={item} key={index}
                        selected={listItemChecked.some((checked: ICartItem) => item._id === checked._id)}
                        onSelect={(e: React.ChangeEvent<HTMLInputElement>) => handleSelected(item, e)}
                        onDelete={() => handleDelItem(item)}
                    />
                ))}

                {cartSelector.list && cartSelector.list?.length < 1 && (
                    <Flex className='w-full justify-center items-center flex-col' px={7} py={5} bg={mainColor.white}>
                        <Meow />
                        <Translation text="your_cart_is_empty_now,_let's_shopping" className='capitalize font-bold' my={2} />
                        <Button bg={mainColor.orange} color={mainColor.white} _hover={{ opacity: 0.8 }} onClick={() => router.push('/')}>
                            <Translation text='shopping' className='capitalize' />
                        </Button>
                    </Flex>
                )}

            </Container>

            <CartToolBar listItemChecked={listItemChecked} handleSelectAllItem={(active: boolean) => handleSelectAllItems(active)} />
        </Layout>
    )
}

export default CartView
