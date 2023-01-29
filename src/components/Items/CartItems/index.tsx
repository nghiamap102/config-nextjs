import { ReactIcon } from '@assets/icon';
import { NoImage } from '@assets/image';
import { Box, Button, Checkbox, Flex, Grid, GridItem, Text, useDisclosure } from '@chakra-ui/react';
import { ButtonPrimary } from '@components/Button';
import { RenderPrice } from '@components/Card/ProductCard';
import UiNumberInputControl from '@components/Field/UiNumberInputControl';
import PopOver from '@components/PopOver';
import Tag from '@components/Tag';
import Translation from '@components/Translate';
import { ICartItem, ICategory } from '@redux/cart/cartModel';
import { updateCartItem } from '@redux/cart/cartSlice';
import { useAppDispatch } from '@redux/hooks';
import { mainColor } from '@theme/theme';
import Image from 'next/image';
import { FC, useState } from 'react';
import SelectItem from '../SelectItem';
import CustomToast from '@components/Toast';

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

    const dispatch = useAppDispatch()
    const toast = CustomToast()

    const handleClosePopOver = (item) => {
        dispatch(updateCartItem(item))
    }

    const handleDirectMsg = () => {
        console.log('abc')
    }

    const renderSample = () => {
        const newObject = { sampleItem: undefined, sample: undefined }
        const newArr = item.product_sample && item.product_sample.filter((productSampleItem) => {
            const a = productSampleItem.sample.filter(sampleItem => JSON.stringify(sampleItem.category) == JSON.stringify(item.category))
            if (a.length > 0) newObject.sampleItem = a[0]
            if (productSampleItem.sample.some(sampleItem => JSON.stringify(sampleItem.category) == JSON.stringify(item.category))) { return productSampleItem }
        })
        newObject.sample = newArr[0]
        return newObject
    }

    const handleChangeQuantity = (value: string) => {
        renderSample().sampleItem.count_in_stock === parseInt(value) && toast({ title: `There's only ${renderSample().sampleItem.count_in_stock} items left`, status: 'info' })
        dispatch(updateCartItem({ ...item, quantity: parseInt(value) }))
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
                <Grid templateColumns="repeat(24, 1fr)" px={7} py={5}>
                    <GridItem colSpan={1} fontSize="md" className='flex items-center'>
                        <Checkbox onChange={onSelect} isChecked={selected} />
                    </GridItem>

                    <GridItem colSpan={9} className="flex">
                        <Image
                            src={renderSample()?.sample.image || NoImage}
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
                        <RenderPrice price={renderSample().sampleItem.unit_price || 0} color={mainColor.gray1} />
                    </GridItem>

                    <GridItem colSpan={3} className="flex items-center justify-center flex-col">
                        <UiNumberInputControl value={item.quantity || 1} onChange={handleChangeQuantity} max={renderSample()?.sampleItem?.count_in_stock} />
                        {renderSample().sampleItem.count_in_stock < 10 &&
                            <Text className='text-sm mt-2' color={mainColor.red}>{renderSample().sampleItem.count_in_stock} remain</Text>
                        }
                    </GridItem>

                    <GridItem colSpan={3} className="flex items-center justify-center">
                        <RenderPrice price={item.quantity && renderSample().sampleItem.unit_price * item.quantity || 0} color={mainColor.red} />
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
    const [cartItemType, setCartItemType] = useState<ICategory[]>(item.category)
    const { onOpen, onClose, isOpen } = useDisclosure()

    const handleSelectType = (title: string, catContent: string) => {
        setCartItemType([...cartItemType].map(cartItemType => {
            if (cartItemType.title === title) {
                return { ...cartItemType, cat_content: catContent }
            }
            return cartItemType
        }))
    }

    const checkTypeSelected = (title: string, catContent: string) => {
        if (cartItemType.some(itemType => itemType.title === title && itemType.cat_content === catContent)) {
            return true
        }
        return false
    }

    const handleClose = () => {
        onClose()
        if (JSON.stringify(cartItem.category) !== JSON.stringify(cartItemType)) {
            setCartItem({ ...cartItem, category: cartItemType })
            handleClosePopOver({ ...cartItem, category: cartItemType })
        }
    }

    const checkDisable = (title: string, catContent: string, index: number) => {
        const a: any[] = []
        const catItem: ICategory = {
            title,
            cat_content: catContent,
        }
        // console.log(index)
        // item.product_sample?.forEach((productSampleItem) => {
        //     const _item = productSampleItem.sample.find(sampleItem => JSON.stringify(sampleItem.category) == JSON.stringify(catItem))
        //     console.log(_item)
        //     _item && a.push(_item)
        // })
        // console.log(catItem)
        // console.log(title, catContent)
        // console.log(a[0].category.some(categoryItem => categoryItem.title === title && categoryItem.cat_content === catContent))
        return false
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
                        <Flex className='capitalize'>
                            <Translation text='category' /> {':'}
                        </Flex>
                        {item.category?.map((itemType: any) => (
                            <Text key={itemType.title} className='capitalize inline mr-1'>{itemType.cat_content}</Text>
                        ))}
                    </Box>
                    <ReactIcon.IconVsc.VscTriangleDown className='ml-2' />
                </Flex>
            )}
            popoverBody={(
                <Box p={4} maxW={500}>
                    {cartItem.product_type.category?.map((catItem: ICategory, index: Number) => (
                        <Box className='my-2' key={Math.random() * 1000}>
                            <Text className='mb-3 capitalize'>{catItem.title}</Text>

                            {catItem.cat_content?.map((cat, index: number) => (
                                <SelectItem
                                    display='inline-block' mx={1} key={index} selected={checkTypeSelected(catItem.title, cat)}
                                    onSelect={() => handleSelectType(catItem.title, cat)}
                                    disabled={checkDisable(catItem.title, cat, index)}
                                >
                                    {cat}
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