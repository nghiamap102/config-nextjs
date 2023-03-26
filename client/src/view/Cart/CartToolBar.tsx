import { Box, Button, Container, Flex } from '@chakra-ui/react'
import { ButtonPrimary } from '@components/Button'
import { RenderPrice } from '@components/Card/ProductCard'
import UICheckBoxField from '@components/Field/UICheckBoxField'
import Translation from '@components/Translate'
import { selectCart, setCartList } from '@redux/cart/cartSlice'
import { createCheckout, selectCheckout } from '@redux/checkout/checkoutSlice'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { mainColor } from '@theme/theme'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'

const CartToolBar: FC = () => {
    const cartState = useAppSelector(selectCart)
    const checkoutState = useAppSelector(selectCheckout)
    const router = useRouter()
    const dispatch = useAppDispatch()

    useEffect(() => {
        checkoutState.success && router.push('/checkout')
    }, [checkoutState.success, router])

    const handlePurchase = () => {
        if (cartState.list && cartState.list?.length > 0) {
            dispatch(createCheckout(cartState.list.filter(item => item.checked)?.reduce((initArray, cartItem) => [...initArray,
            { sample_id: cartItem.product_sample?._id, product_id: cartItem.product?._id, quantity: cartItem.quantity }
            ], [])))
        }
    }

    const renderTotal = () => {
        return cartState.list?.reduce((init, item) => {
            if (item.checked && item.product_sample?.unit_price && item.quantity)
                return init + item.product_sample?.unit_price * item.quantity
            else return init
        }, 0)
    }
    const handleSelectAllItem = (checked: boolean) => {
        const newArr = [...cartState.list].map(item => { return { ...item, checked: checked } })
        dispatch(setCartList(newArr))
    }

    const handleDelAllItem = () => {
    }

    return (
        <Container maxW='container.xl' position='sticky' bottom={0} my={5} p={0}>
            <Box bg={mainColor.white} p={5}>
                <Flex gridColumnStart={1} gridColumnEnd={4} className='items-center'>

                    <UICheckBoxField
                        onCheckBoxClick={(active: boolean) => handleSelectAllItem(active)} content={`select all (${cartState.list?.length})`}
                        px={2}
                        textTransform='capitalize'
                        placement='right'
                        sizeCheckbox='md'
                    />

                    <Button className='capitalize' bg={'transparent'} _hover={{}} mx={2} onClick={handleDelAllItem}>delete</Button>
                    <Button className='capitalize' bg={'transparent'} _hover={{}} mx={2}>delete item invalid</Button>
                    <Button className='capitalize' bg={'transparent'} _hover={{}} mx={2}>add to wish list</Button>

                    <Box flex={1}></Box>

                    <Flex className='items-center text-xl font-normal'>
                        <Translation text='total' className='capitalize' />
                        <Flex className='mx-1 items-center'>
                            (<Box mr={1}>{cartState.list?.filter(x => x.checked).length}</Box> <Translation text='items' />){':'}
                            <RenderPrice price={renderTotal()} className='mx-2' />
                        </Flex>
                    </Flex>

                    <ButtonPrimary onClick={handlePurchase} className='capitalize'>
                        <Translation text='purchase' />
                    </ButtonPrimary>
                </Flex>
            </Box>
        </Container>
    )
}

export default CartToolBar
