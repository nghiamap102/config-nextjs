import { Box, Button, Checkbox, Container, Flex, Text } from '@chakra-ui/react'
import { ButtonPrimary } from '@components/Button'
import { RenderPrice } from '@components/Card/ProductCard'
import UICheckBoxField from '@components/Field/UICheckBoxField'
import Translation from '@components/Translate'
import { ICartItem } from '@redux/cart/cartModel'
import { selectCart } from '@redux/cart/cartSlice'
import { checkout, selectCheckout } from '@redux/checkout/checkoutSlice'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { mainColor } from '@theme/theme'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'

type CartToolBarProps = {
    listItemChecked: ICartItem[]
    handleSelectAllItem?: (selected: boolean) => void
    handleDelAllItem?: () => void
}

const CartToolBar: FC<CartToolBarProps> = ({
    listItemChecked,
    handleDelAllItem,
    handleSelectAllItem
}) => {
    const cartState = useAppSelector(selectCart)
    const checkoutState = useAppSelector(selectCheckout)
    const router = useRouter()
    const dispatch = useAppDispatch()
    /// fetch checkout session
    // setTimeout(() => {
    //     router.push(`/cart/?${Cookies.get('_id_ck')}`, undefined, { shallow: true })
    // }, 400);

    useEffect(() => {
        checkoutState.success && router.push('/checkout')
    }, [checkoutState.success])

    const handlePurchase = () => {
        const newArr: any[] = []
        if (listItemChecked.length > 0) {
            listItemChecked.forEach(items => newArr.push(items._id))
            dispatch(checkout(newArr))
        }
    }

    const renderTotal = () => {
        let price = 0
        listItemChecked.forEach(item => {
            item.product_sample && item.product_sample.filter((productSampleItem) => {
                const a = productSampleItem.sample.filter(sampleItem => JSON.stringify(sampleItem.category) == JSON.stringify(item.category))
                if (a.length > 0) price += a[0].unit_price
            })
        })
        return price
    }

    return (
        <Container maxW='container.xl' position='sticky' bottom={0}>
            <Box bg={mainColor.white} p={5}>
                <Flex gridColumnStart={1} gridColumnEnd={4} className='items-center'>

                    {/* <Flex onClick={handleSelectAllItem} px={2} className='cursor-pointer'>
                        <Checkbox isChecked={cartState.list?.length === listItemChecked.length} />
                        <Text className='capitalize mx-2'>select all ({cartState.list?.length})</Text>
                    </Flex> */}
                    <UICheckBoxField
                        onCheckBoxClick={(active) => handleSelectAllItem && handleSelectAllItem(active)} content={`select all (${cartState.list?.length})`}
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
                            (<Box mr={1}>{listItemChecked.length}</Box> <Translation text='items' />){':'}
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
