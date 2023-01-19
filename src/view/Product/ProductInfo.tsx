import { ReactIcon } from '@assets/icon';
import { ImageAssets } from '@assets/index';
import {
    Box,
    Flex,
    Grid,
    GridItem,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Text,
    useNumberInput,
    useToast
} from '@chakra-ui/react';
import { ButtonPrimary } from '@components/Button';
import UiNumberInputControl from '@components/Field/UiNumberInputControl';
import IconButtonPrimary from '@components/IconButtonPrimary';
import SelectItem from '@components/Items/SelectItem';
import Popup from '@components/Popup';
import Translation from '@components/Translate';
import { ICartItem } from '@redux/cart/cartModel';
import cartService from '@redux/cart/cartService';
import { addToCart } from '@redux/cart/cartSlice';
import { useAppDispatch } from '@redux/hooks';
import { IProductItem } from '@redux/product/productModel';
import { mainColor } from '@theme/theme';
import { fillColorArrayRating, toastConst, tooltipArrayRating } from 'contants/common';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating';

type ProductInfoProps = {
    product: IProductItem
};

export const ProductInfo: FC<ProductInfoProps> = ({
    product
}) => {

    const dispatch = useAppDispatch()
    const [cartItem, setCartItem] = useState<ICartItem>({
        active: true,
        productId: product.id || '',
        quantity: 1,
        unit_price: product.price || 0,
        type: {},
    })

    const toast = useToast({
        id: toastConst.cart,
        position: 'top',
        title: 'Add to cart success',
        isClosable: true,
        status: 'success',
    })

    const [openPopup, setOpenPopup] = useState(false)
    const numberInput = useNumberInput({
        step: 1,
        defaultValue: 1,
        min: 1,
        precision: 0,
    })


    const handleAddtoCart = async () => {
        const res = await cartService.addToCart(cartItem)
        if (res.data) {
            !toast.isActive(toastConst.cart) && toast()
            dispatch(addToCart(cartItem))
        }
    }

    const handleSelectItem = (item: any) => {
        setCartItem({ ...cartItem, type: { ...cartItem.type, color: item.color } })
    }

    useEffect(() => {
        setCartItem({ ...cartItem, quantity: parseInt(numberInput.value) })
    }, [numberInput.value])

    const handleChangeAddress = () => {
        setOpenPopup(true)
    }
    const handleCloseChangeAddress = () => {
        setOpenPopup(false)
    }

    return (
        <Grid templateColumns="repeat(2,1fr)">
            <GridItem colSpan={1}>
                <Image
                    src={product.sample && product.sample[0]?.imageSrc || ImageAssets.NoImage}
                    alt={product.name}
                />
            </GridItem>

            <GridItem colSpan={1}>

                <Link href={`/product/${product.id}`} >
                    <Box className='link text-xl' mb={3}>
                        {product.name}
                    </Box>
                </Link>

                <Flex className='items-center'>
                    <Rating
                        SVGclassName="inline-block"
                        size={25}
                        readonly
                        transition
                        allowFraction
                        tooltipArray={tooltipArrayRating}
                        fillColorArray={fillColorArrayRating}
                        initialValue={product.rate}
                    />
                    <Text ml={3} fontSize='lg'>50</Text>
                </Flex>

                <Grid templateColumns='repeat(12,1fr)' gridGap={3} my={10}>
                    <GridItem colSpan={3}>
                        <Translation text='shipping_method' className='capitalize text-lg' color={mainColor.gray3} />
                    </GridItem>
                    <GridItem colSpan={9}>
                        <Flex mb={3}>
                            <ReactIcon.IconFa.FaTruckMoving color={mainColor.saleTag} size='1.5rem' className='mr-4' />
                            <Box>
                                <Translation text='free_ship' />
                                <Translation text='Miễn phí vận chuyển cho đơn hàng trên ₫99.000' />
                            </Box>
                        </Flex>
                        <Flex mb={3}>
                            <ReactIcon.IconFi.FiTruck size='1.5rem' className='mr-4' />
                            <Flex className='flex-col'>
                                <Flex>
                                    <Translation text='Vận Chuyển Tới' />
                                    <Flex className='items-center mx-3 cursor-pointer' onClick={handleChangeAddress} >
                                        Pson ky q tan phu
                                        <ReactIcon.IconAi.AiOutlineDown className='ml-2' />
                                    </Flex>

                                    <Popup isOpen={openPopup} title='change address' onClose={handleCloseChangeAddress}>abc</Popup>

                                </Flex>
                                <Flex>
                                    <Translation text='Phí Vận Chuyển' />
                                    <Popover>
                                        <PopoverTrigger>
                                            <Flex className='items-center mx-3'>
                                                16000
                                                <ReactIcon.IconAi.AiOutlineDown className='ml-2' />
                                            </Flex>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <PopoverArrow />
                                            <PopoverCloseButton />
                                            <PopoverHeader>Confirmation!</PopoverHeader>
                                            <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
                                        </PopoverContent>
                                    </Popover>
                                </Flex>
                            </Flex>
                        </Flex>
                    </GridItem>

                    {product.sample && product.sample[0].color &&
                        <GridItem colSpan={3}>
                            <Translation text='color' className='capitalize text-lg' color={mainColor.gray3} />
                        </GridItem>
                    }

                    {/* seperate multi type */}
                    {product.sample && product.sample[0].color &&
                        <GridItem colSpan={8} className='flex'>
                            {product.sample?.map(item => (
                                <SelectItem key={item.color} mx={1} selected={cartItem.type.color === item.color} onSelect={() => handleSelectItem(item)}>
                                    {item.color}
                                </SelectItem>
                            ))}
                        </GridItem>
                    }

                    <GridItem colSpan={3}>
                        <Translation text='quantity' className='capitalize text-lg' color={mainColor.gray3} />
                    </GridItem>

                    <GridItem colSpan={9}>
                        <Box w='40%'>
                            <UiNumberInputControl numberInput={numberInput} />
                        </Box>
                    </GridItem>

                </Grid>
                <Flex>
                    <ButtonPrimary onClick={handleAddtoCart} p={5} size='lg' mr={2}>
                        <ReactIcon.IconBs.BsCartPlus size='2rem' className='mx-2' />
                        <Translation text='add_to_cart' className='capitalize' />
                    </ButtonPrimary>

                    <ButtonPrimary onClick={handleAddtoCart} p={5} size='lg'>
                        <Translation text='buy_now' className='capitalize' />
                    </ButtonPrimary>

                    <IconButtonPrimary icon={<ReactIcon.IconAi.AiOutlineHeart />} aria-label="wishlist" mx={3} size='lg' />
                    <IconButtonPrimary icon={<ReactIcon.IconAi.AiOutlineShareAlt />} aria-label="wishlist" size='lg' />
                </Flex>

            </GridItem>
        </Grid>
    );
};