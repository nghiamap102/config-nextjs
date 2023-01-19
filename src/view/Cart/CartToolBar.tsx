import { Box, Button, Checkbox, Container, Flex, Text } from '@chakra-ui/react'
import { ButtonPrimary } from '@components/Button'
import Translation from '@components/Translate'
import { ICartItem } from '@redux/cart/cartModel'
import { selectCart } from '@redux/cart/cartSlice'
import { useAppSelector } from '@redux/hooks'
import { mainColor } from '@theme/theme'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'

type CartToolBarProps = {
    listItemChecked: ICartItem[]
}

const CartToolBar: FC<CartToolBarProps> = ({
    listItemChecked,
}) => {
    const cartState = useAppSelector(selectCart)
    const router = useRouter()

    useEffect(()=>{
        setTimeout(() => {
            router.push('/cart/?counter=10', undefined, { shallow: true })
        }, 200);
    },[])

    const handleClickAllItems = () => {

    }

    const handlePurchase = () => {
        window.location.search = 'abc'
    }

    return (
        <Container maxW='container.xl' position='sticky' bottom={0}>
            <Box bg={mainColor.white} p={5}>
                <Flex gridColumnStart={1} gridColumnEnd={4} className='items-center'>

                    <Flex onClick={handleClickAllItems} px={2}>
                        <Checkbox isChecked={cartState.list?.length === listItemChecked.length} />
                        <Text className='capitalize mx-2'>select all ({cartState.list?.length})</Text>
                    </Flex>

                    <Button className='capitalize' bg={'transparent'} _hover={{}} mx={2}>delete</Button>
                    <Button className='capitalize' bg={'transparent'} _hover={{}} mx={2}>delete item invalid</Button>
                    <Button className='capitalize' bg={'transparent'} _hover={{}} mx={2}>add to wish list</Button>

                    <Box flex={1}></Box>

                    <Flex className='items-center text-xl font-normal'>
                        <Translation text='total' className='capitalize' />
                        <Flex className='mx-1 items-center'>
                            (<Box mr={1}>0</Box> <Translation text='items' />):
                            <Text fontSize='2xl' className='mx-2'>1000$</Text>
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
