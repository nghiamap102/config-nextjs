import {
    Box,
    Button,
    Checkbox,
    Container,
    Flex,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    Portal,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Tfoot,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react'
import Header from '@components/Header'
import Translation from '@components/Translate'
import { selectCart } from '@redux/cart/cartSlice'
import { useAppSelector } from '@redux/hooks'
import Image from 'next/image'
import { FC } from 'react'

const CartView: FC = () => {
    const cartSelector = useAppSelector(selectCart)

    const handleSelectAllItems = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
    }
    return (
        <>
            <Header />
            <Container my={5} maxW="container.xl">
                <TableContainer>
                    <Table variant="unstyled">
                        <Thead>
                            <Tr>
                                <Th>
                                    <Flex>
                                        <Checkbox
                                            onChange={handleSelectAllItems}
                                            mr={2}
                                        />
                                        <Translation
                                            text="items"
                                            type={['product']}
                                        />
                                    </Flex>
                                </Th>
                                <Th>
                                    <Translation
                                        text="unit_price"
                                        type={['product']}
                                    />{' '}
                                </Th>
                                <Th>
                                    <Translation
                                        text="quantity"
                                        type={['product']}
                                    />{' '}
                                </Th>
                                <Th>
                                    <Translation
                                        text="total"
                                        type={['product']}
                                    />{' '}
                                </Th>
                                <Th>
                                    <Translation
                                        text="action"
                                        type={['product']}
                                    />{' '}
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {/* {cartSelector.list?.length < 1 && <Text>Empty cart</Text>} */}
                            <Tr>
                                <Td>
                                    {cartSelector.list?.map(items => {
                                        console.log(Object.values(items.type))
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
                                                                {Object.values(
                                                                    items.type,
                                                                ).map(
                                                                    ele => ele,
                                                                )}
                                                                {
                                                                    items
                                                                        .product
                                                                        .name
                                                                }
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
            </Container>
        </>
    )
}

export default CartView
