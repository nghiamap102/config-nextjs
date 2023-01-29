import { ReactIcon } from '@assets/icon';
import { ImageAssets } from '@assets/index';
import { Box, Flex, Grid, GridItem, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, UseToastOptions, position, useToast } from '@chakra-ui/react';
import { ButtonPrimary } from '@components/Button';
import UiNumberInputControl from '@components/Field/UiNumberInputControl';
import IconButtonPrimary from '@components/IconButtonPrimary';
import IconCircle from '@components/Icons/IconCircle';
import SelectItem from '@components/Items/SelectItem';
import Popup from '@components/Popup';
import SimpleRating from '@components/Rating';
import CustomToast from '@components/Toast';
import Translation from '@components/Translate';
import { ICartItem } from '@redux/cart/cartModel';
import { addToCart, selectCart } from '@redux/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { IProductItem } from '@redux/product/productModel';
import { mainColor } from '@theme/theme';
import { toastId } from 'contants/common';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';

type ProductInfoProps = {
    product: IProductItem
};

export const ProductInfo: FC<ProductInfoProps> = ({ product }) => {

    const dispatch = useAppDispatch()
    const cartState = useAppSelector(selectCart)
    console.log(cartState.list)
    const [cartItem, setCartItem] = useState<ICartItem>({
        product_id: product._id,
        quantity: 1,
        sample_id: '',
        category: [],
        active: true,
    })
    const toast = CustomToast()
    const [openPopup, setOpenPopup] = useState(false)

    const handleAddtoCart = async () => {
        if (product.product_type?.category?.length === cartItem.category?.length) {
            dispatch(addToCart(cartItem))
            toast({ title: "Add to cart success", status: "success" })
        }
    }
    const handleChangeAddress = () => {
        setOpenPopup(true)
    }
    const handleCloseChangeAddress = () => {
        setOpenPopup(false)
    }

    const handleChangeQuantity = (value: string) => {
        setCartItem({ ...cartItem, quantity: parseInt(value) })
    }

    const checkSample = () => {
        const newArr = product.product_sample?.filter((productSampleItem) => {
            if (
                cartItem.category && cartItem.category?.length > 1 &&
                productSampleItem.sample.some(sampleItem => JSON.stringify(sampleItem.category) == JSON.stringify(cartItem.category)) ||
                cartItem.category && cartItem.category?.length < 2 &&
                productSampleItem.sample.some(sampleItem => sampleItem.category.some(item => JSON.stringify(cartItem.category).includes(JSON.stringify(item))))
            ) {
                return productSampleItem
            }
        })
        return newArr && newArr[0] || []
    }

    const handleSelectType = (title: string, catContent: string) => {
        if (!cartItem.category?.some(item => item.title === title) && cartItem.category?.length < 1) {

            setCartItem({ ...cartItem, category: [...cartItem.category, { title: title, cat_content: catContent }] })

        } else if (!cartItem.category?.some(item => item.title === title) && cartItem.category.length >= 1) {
            const category = [...cartItem.category, { title: title, cat_content: catContent }]

            setCartItem({ ...cartItem, category: category, sample_id: checkSample()?._id })
        }
        else {
            const category = [...cartItem.category].map(cartItemType => {
                if (cartItemType.title === title) {
                    return { ...cartItemType, cat_content: catContent }
                }
                return cartItemType
            })
            setCartItem({ ...cartItem, category: category, })
        }
    }

    const checkSelected = (title: string, catContent: string) => {
        return cartItem.category?.some(item => item.title === title && item.cat_content === catContent)
    }

    const renderImageSample = checkSample() && checkSample()?.image || null

    return (
        <Grid templateColumns="repeat(2,1fr)" minH={500}>
            <GridItem colSpan={1}>
                <Image
                    src={renderImageSample || product?.image[0] || ImageAssets.NoImage}
                    alt={product?.name}
                    height={450}
                    width={450}
                />
            </GridItem>

            <GridItem colSpan={1}>

                <Link href={`/product/${product?._id}`} >
                    <Box className='link text-xl'>
                        {product?.name}
                    </Box>
                </Link>

                <SimpleRating direction="horizon" value={3.5} avg={50} my={5} />

                <Grid templateColumns='repeat(12,1fr)' gridGap={3}>
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
                                    {/* use cpn */}
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
                                    {/* bug zindex too low */}
                                </Flex>
                            </Flex>
                        </Flex>
                    </GridItem>

                </Grid>

                {product.product_type && product.product_type.category?.map((category) => (
                    <Grid key={category.title} templateColumns='repeat(12,1fr)' gridGap={3} my={5}>
                        <GridItem colSpan={3}>
                            {category.title}
                        </GridItem>
                        <GridItem colSpan={9} className='flex' flexWrap='wrap'>
                            {category.cat_content && category.cat_content?.map(catContent => (
                                <SelectItem key={catContent}
                                    selected={checkSelected(category.title, catContent)}
                                    mx={2} my={2}
                                    onSelect={() => handleSelectType(category.title, catContent)}
                                >
                                    {catContent}
                                </SelectItem>
                            ))}
                        </GridItem>
                    </Grid>
                ))}

                <Grid templateColumns='repeat(12,1fr)' gridGap={3} my={5}>

                    <GridItem colSpan={3}>
                        <Translation text='quantity' className='capitalize text-lg' color={mainColor.gray3} />
                    </GridItem>

                    <GridItem colSpan={9}>
                        <Box maxW='40%'>
                            <UiNumberInputControl onChange={handleChangeQuantity} />
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

