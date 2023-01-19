import { ReactIcon } from '@assets/icon';
import { NoImage } from '@assets/image';
import { ImageAssets } from '@assets/index';
import { Box, Button, Checkbox, Flex, Grid, GridItem, Text, useDisclosure } from '@chakra-ui/react';
import { ButtonPrimary } from '@components/Button';
import UiNumberInputControl from '@components/Field/UiNumberInputControl';
import PopOver from '@components/PopOver';
import Tag from '@components/Tag';
import Translation from '@components/Translate';
import { ICartItem } from '@redux/cart/cartModel';
import cartService from '@redux/cart/cartService';
import { mainColor } from '@theme/theme';
import Image from 'next/image';
import { FC, useState } from 'react';
import SelectItem from '../SelectItem';

type CartItemsProps = {
    item: ICartItem
    selected?: boolean
    onSelect?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onDelete?: () => void
};

const CartItems: FC<CartItemsProps> = ({
    item,
    selected,
    onSelect,
    onDelete,
}) => {

    const [cartItem, setCartItem] = useState<ICartItem>(item)

    const handleChangeQuantity = (value: string) => {
        cartService.updateCart({ ...item, quantity: parseInt(value) })
        setCartItem({ ...cartItem, quantity: parseInt(value) })
    }

    const handleClosePopOver = (item) => {
        cartService.updateCart(item)
        setCartItem(item)
    }

    const handleDirectMsg = () => {
        console.log('abc')
    }

    return (
        <Box bg={mainColor.white}>
            <GridItem colSpan={24} borderBottom={`1px solid ${mainColor.lightBlack}`} px={7} py={5}>
                <Grid templateColumns="repeat(24, 1fr)" >
                    <GridItem colSpan={1} fontSize="md" className='flex items-center'>
                        <Checkbox onChange={onSelect} isChecked={selected} />
                    </GridItem>

                    <GridItem colSpan={23} className="flex py-3 items-center">
                        WIIS - THỜI TRANG UNISEX
                        <ReactIcon.IconMd.MdOutlineMessage className='ml-2 cursor-pointer' size='1.5rem' color={mainColor.red} onClick={handleDirectMsg} />
                    </GridItem>
                </Grid>
            </GridItem>

            <Box>
                <Grid templateColumns="repeat(24, 1fr)"  px={7} py={5}>
                    <GridItem colSpan={1} fontSize="md" className='flex items-center'>
                        <Checkbox onChange={onSelect} isChecked={selected} />
                    </GridItem>

                    <GridItem colSpan={9} className="flex">
                        <Image
                            src={ImageAssets.ProuductLoa1 || NoImage}
                            alt={cartItem.products && cartItem.products[0].name}
                            height={100}
                            width={100}
                        />

                        <Box className='flex-col ml-2'>
                            <Text className='mb-2 capitalize'>{cartItem.products && cartItem.products[0].name}</Text>

                            <Tag className='inline-block px-2 py-1 rounded-lg text-sm' bg={mainColor.saleTag}>
                                <ReactIcon.IconIo5.IoTicketOutline color={mainColor.red2} className='mr-2' />
                                <Text lineHeight='normal'>30%</Text>
                            </Tag>

                        </Box>
                    </GridItem>

                    <GridItem colSpan={3} className="flex items-center justify-center">
                        <CartItemPopOver item={cartItem} handleClosePopOver={(item) => handleClosePopOver(item)} />
                    </GridItem>

                    <GridItem colSpan={3} className="flex items-center justify-center">
                        {/* <RenderPrice price={cartItem.type?.unit_price || 0} color={mainColor.gray1} /> */}
                    </GridItem>

                    <GridItem colSpan={3} className="flex items-center justify-center flex-col">
                        <UiNumberInputControl value={cartItem.quantity || 1} onChange={handleChangeQuantity} />
                        <Text className='text-sm mt-2' color={mainColor.red}>5 remain</Text>
                    </GridItem>

                    <GridItem colSpan={3} className="flex items-center justify-center">
                        {/* <RenderPrice price={cartItem.type?.unit_price && cartItem.quantity && cartItem.type?.unit_price * cartItem.quantity || 0} color={mainColor.red} /> */}
                    </GridItem>

                    <GridItem colSpan={2} className="flex items-center justify-center">
                        <Translation className="capitalize cursor-pointer" color={mainColor.red} text='delete' onClick={onDelete} />
                    </GridItem>
                </Grid>
            </Box>
        </Box>
    )
};

const CartItemPopOver: FC<{ item: ICartItem, handleClosePopOver: (item: ICartItem) => void }> = ({ item, handleClosePopOver }) => {

    const [cartItem, setCartItem] = useState<ICartItem>(item)
    const [cartItemType, setCartItemType] = useState<ICartItem>(item.type)
    const { onOpen, onClose, isOpen } = useDisclosure()

    const handleSelectType = (label: string, type: string) => {
        setCartItemType({ ...cartItemType, [label]: type })
    }

    const checkTypeSelected = (label: string, type: string) => {
        if (Object.keys(cartItemType).some(type => type === label) && cartItemType[label] === type) {
            return true
        }
        return false
    }

    const handleClose = () => {
        onClose()
        setCartItem({ ...cartItem, type: cartItemType })
        handleClosePopOver({ ...cartItem, type: cartItemType })
    }

    return (
        <PopOver
            isOpen={isOpen}
            closeOnEsc
            onOpen={onOpen}
            onClose={handleClose}
            popoverTrigger={(
                <Flex color={mainColor.gray2} className='items-center'>
                    <Box>
                        {cartItem.type && Object.keys(cartItem.type).map(type => (
                            <Box key={type}>
                                <Text className='capitalize inline'>{type}</Text>{':'} {cartItem.type[type]}
                            </Box>
                        ))}
                    </Box>
                    <ReactIcon.IconVsc.VscTriangleDown className='ml-2' />
                </Flex>
            )}
            popoverBody={(
                <Box p={4} maxW={500}>
                    {cartItem.product_type[0].category.map(cat => (
                        <Box className='my-2' key={Math.random() * 1000}>
                            <Text className='mb-3 capitalize'>{cat.label}:</Text>

                            {cat.type?.map((type: any, index: number) => (
                                <SelectItem
                                    display='inline-block' mx={1} key={index} selected={checkTypeSelected(cat.label, type)}
                                    onSelect={() => handleSelectType(cat.label, type)}>
                                    {type}
                                </SelectItem>
                            ))}
                        </Box>
                    ))}
                </Box>
            )}
            popoverFooter={(
                <Flex className='items-center justify-end' p={4}>
                    <Button
                        bg={mainColor.white}
                        color={mainColor.orange}
                        border={`1px solid ${mainColor.orange}`}
                        _hover={{ opacity: 0.8 }}
                        className='capitalize mx-1'
                        onClick={handleClose}
                    >
                        <Translation text='cancel' />
                    </Button>
                    <ButtonPrimary mx={1} onClick={handleClose}>
                        <Translation text='apply' />
                    </ButtonPrimary>
                </Flex >
            )}
        />
    )
}


export default CartItems