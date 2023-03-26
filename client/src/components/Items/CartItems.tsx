import { ReactIcon } from '@assets/icon';
import { NoImage } from '@assets/image';
import { Box, Checkbox, Grid, GridItem, Text } from '@chakra-ui/react';
import { RenderPrice } from '@components/Card/ProductCard';
import UiNumberInputControl from '@components/Field/UiNumberInputControl';
import Tag from '@components/Tag';
import CustomToast from '@components/Toast';
import Translation from '@components/Translate';
import { ICartItem } from '@redux/cart/cartModel';
import { removeCartItem, updateCartItem } from '@redux/cart/cartSlice';
import { useAppDispatch } from '@redux/hooks';
import { mainColor } from '@theme/theme';
import Image from 'next/image';
import { FC } from 'react';
import CartItemPopOver from './CartItemPopOver';

type CartItemsProps = {
    item: ICartItem
};

const CartItems: FC<CartItemsProps> = ({
    item,
}) => {
    const dispatch = useAppDispatch()
    const toast = CustomToast()

    const handleClosePopOver = (item) => {
        dispatch(updateCartItem(item))
    }

    const handleDirectMsg = () => {
        console.log('abc')
    }

    const handleChangeQuantity = (value: string) => {
        item.product_sample?.count_in_stock === parseInt(value) && toast({ title: `There's only ${item?.product_sample.count_in_stock} items left`, status: 'info' })
        dispatch(updateCartItem({ ...item, quantity: parseInt(value) }))
    }

    const handleDelItem = (item: ICartItem) => {
        dispatch(removeCartItem(item))
    }

    const handleSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            dispatch(updateCartItem({ ...item, checked: true }))
        }else(
            dispatch(updateCartItem({ ...item, checked: false }))
        )
    }

    const renderSample = () => {
        return null
    }

    return (
        <Box bg={mainColor.white}>
            <GridItem colSpan={24} borderBottom={`1px solid ${mainColor.lightBlack}`} px={7} py={5}>
                <Grid templateColumns="repeat(24, 1fr)" >
                    <GridItem colSpan={1} fontSize="md" className='flex items-center'>
                        <Checkbox onChange={handleSelected} isChecked={item.checked || false} />
                    </GridItem>

                    <GridItem colSpan={23} className="flex py-3 items-center">
                        WIIS - THỜI TRANG UNISEX
                        <ReactIcon.IconMd.MdOutlineMessage className='ml-2 cursor-pointer' size='1.5rem' color={mainColor.red} onClick={handleDirectMsg} />
                    </GridItem>
                </Grid>
            </GridItem>

            <Box>
                <Grid templateColumns="repeat(24, 1fr)" px={7} py={5}>
                    <GridItem colSpan={1} fontSize="md" className='flex items-center'>
                        <Checkbox onChange={handleSelected} isChecked={item.checked || false} />
                    </GridItem>

                    <GridItem colSpan={8} className="flex">
                        <Image
                            src={item.product_sample?.image || NoImage}
                            alt={item.product && item.product.name}
                            height={100}
                            width={100}
                        />

                        <Box className='flex-col ml-4'>
                            <Text className='mb-2 capitalize'>{item.product && item.product.name}</Text>

                            <Tag className='inline-block px-2 py-1 rounded-lg text-sm' bg={mainColor.saleTag}>
                                <ReactIcon.IconIo5.IoTicketOutline color={mainColor.red2} className='mr-2' />
                                <Text lineHeight='normal'>30%</Text>
                            </Tag>

                        </Box>
                    </GridItem>

                    <GridItem colSpan={3} className="flex items-center justify-center">
                        <CartItemPopOver item={item} handleClosePopOver={(CartItemPopOver) => handleClosePopOver(CartItemPopOver)} />
                    </GridItem>

                    <GridItem colSpan={3} className="flex items-center justify-center">
                        <RenderPrice price={item.product_sample?.unit_price || 0} color={mainColor.gray1} />
                    </GridItem>

                    <GridItem colSpan={3} className="flex items-center justify-center flex-col">
                        <UiNumberInputControl value={item.quantity || 1} onChange={handleChangeQuantity} max={item.product_sample?.count_in_stock} />
                        {item.product_sample?.count_in_stock < 10 &&
                            <Text className='text-sm mt-2' color={mainColor.red}>{item.product_sample?.unit_price} remain</Text>
                        }
                    </GridItem>

                    <GridItem colSpan={3} className="flex items-center justify-center">
                        <RenderPrice price={item.product_sample?.unit_price * item.quantity || 0} color={mainColor.red} />
                    </GridItem>

                    <GridItem colSpan={3} className="flex items-center justify-center">
                        <Translation className="capitalize cursor-pointer" color={mainColor.red} text='delete' onClick={handleDelItem} />
                    </GridItem>
                </Grid>
            </Box>
        </Box>
    )
};



export default CartItems