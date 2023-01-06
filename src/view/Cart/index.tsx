import { Box, Button, Checkbox, Container, Flex, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Portal, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import Header from '@components/Header'
import Meow from '@components/Meow'
import Translation from '@components/Translate'
import { selectCart } from '@redux/cart/cartSlice'
import { useAppSelector } from '@redux/hooks'
import { mainColor } from '@theme/theme'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { FC } from 'react'

const CartView: FC = () => {
    const cartSelector = useAppSelector(selectCart)
    const router = useRouter()

    const handleSelectAllItems = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
    }
    
    return (
        <>
            <Header />
            <Container my={5} maxW="container.xl">
                {cartSelector.list && cartSelector.list?.length > 0 && (
                    <TableContainer>
                        <Table variant="unstyled">
                            <Thead>
                                <Tr>
                                    <Th>
                                        <Flex>
                                            <Checkbox onChange={handleSelectAllItems} mr={2} />
                                            <Translation text="items" type={['product']} />
                                        </Flex>
                                    </Th>
                                    <Th> <Translation text="unit_price" type={['product']} /> </Th>
                                    <Th> <Translation text="quantity" type={['product']} /> </Th>
                                    <Th> <Translation text="total" type={['product']} /> </Th>
                                    <Th> <Translation text="action" type={['product']} /> </Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>
                                        {cartSelector.list?.map(items => {
                                            return (
                                                <Box key={Math.random() * 1000}>
                                                    <Popover>
                                                        <PopoverTrigger>
                                                            <Button>Trigger</Button>
                                                        </PopoverTrigger>
                                                        <Portal>
                                                            <PopoverContent>
                                                                <PopoverArrow />
                                                                <PopoverBody>
                                                                    {Object.values(items.type,).map(ele => ele,)} {items.product.name}
                                                                </PopoverBody>
                                                            </PopoverContent>
                                                        </Portal>
                                                    </Popover>
                                                </Box>
                                            )
                                        })}
                                    </Td>
                                </Tr>
                            </Tbody>
                            <Tfoot></Tfoot>
                        </Table>
                    </TableContainer>
                )}
                {cartSelector.list && cartSelector.list?.length < 1 && (
                    <Flex className='w-full justify-center items-center flex-col'>
                        <Meow />
                        <Translation type={['cart']} text="your_cart_is_empty_now,_let's_shopping" className='capitalize font-bold' my={2} />
                        <Button bg={mainColor.orange} color={mainColor.white} _hover={{ opacity: 0.8 }} onClick={() => router.push('/')}>
                            <Translation type={['cart']} text='shopping' className='capitalize' />
                        </Button>
                    </Flex>
                )}
            </Container>
        </>
    )
}

export default CartView
