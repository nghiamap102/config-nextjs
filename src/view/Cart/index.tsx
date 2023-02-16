import { Button, Checkbox, Container, Flex, Grid, GridItem } from '@chakra-ui/react'
import CartItems from '@components/Items/CartItems'
import Layout from '@components/Layout'
import Meow from '@components/Meow'
import Translation from '@components/Translate'
import { fetchCartList, selectCart } from '@redux/cart/cartSlice'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { mainColor } from '@theme/theme'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import CartToolBar from './CartToolBar'

const CartView: FC = () => {
    const dispatch = useAppDispatch()
    const cartSelector = useAppSelector(selectCart)
    const router = useRouter()
    console.log(cartSelector.list)
    useEffect(() => {
        dispatch(fetchCartList())
    }, [])

    const handleSelectAllItems = (selected: boolean) => {
        // selected && cartSelector.list && setListItemChecked(cartSelector.list)
        // !selected && setListItemChecked([])
    }

    const Thead = ['unit_price', 'quantity', 'total', 'action']

    return (
        <Layout>
            <Container my={5} p={0} maxW="container.xl">
                {cartSelector.list && cartSelector.list?.length > 0 && (
                    <Grid templateColumns="repeat(24, 1fr)" px={7} py={5} bg={mainColor.white} mb={3}>

                        <GridItem colSpan={1} fontSize="md" className='flex items-center'>
                            <Checkbox onChange={(e) => handleSelectAllItems(e.target.checked)} />
                        </GridItem>

                        <GridItem colSpan={11} fontSize="md">
                            <Translation className="capitalize" text='items' />
                        </GridItem>

                        {Thead.map(items => (
                            <GridItem
                                key={items}
                                colSpan={3}
                                color={mainColor.gray2}
                                className="text-center"
                            >
                                <Translation className="capitalize" text={items} />
                            </GridItem>
                        ))}
                    </Grid>
                )}

                {cartSelector.list?.map((item, index) => (
                    <CartItems item={item} key={index} />
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

            <CartToolBar />
        </Layout>
    )
}

export default CartView
