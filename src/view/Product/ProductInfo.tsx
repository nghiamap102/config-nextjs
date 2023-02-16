import { ReactIcon } from '@assets/icon';
import { ImageAssets } from '@assets/index';
import { Box, Flex, Grid, GridItem, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger } from '@chakra-ui/react';
import { ButtonPrimary } from '@components/Button';
import UiNumberInputControl from '@components/Field/UiNumberInputControl';
import IconButtonPrimary from '@components/IconButtonPrimary';
import SelectItem from '@components/Items/SelectItem';
import Popup from '@components/Popup';
import SimpleRating from '@components/Rating';
import CustomToast from '@components/Toast';
import Translation from '@components/Translate';
import { ICartItem, ICategory } from '@redux/cart/cartModel';
import { addToCart, selectCart } from '@redux/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { IProductItem, IProductType } from '@redux/product/productModel';
import { mainColor } from '@theme/theme';
import { renderCategory } from '@utils/helper';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';

type ProductInfoProps = {
    product: IProductItem
};

export const ProductInfo: FC<ProductInfoProps> = ({ product }) => {
    const dispatch = useAppDispatch()
    const cartState = useAppSelector(selectCart)
    const { data: session } = useSession()
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
        let temp = 0
        product.product_type?.forEach(item => {
            if (item.cat_group > temp) temp = item.cat_group
        })

        if (temp === cartItem.category?.length && session?.user) {
            dispatch(addToCart({
                ...cartItem, category: cartItem.category.map(item => {
                    return item._id
                })
            }))
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

    const checkSample = (category?: ICategory) => {
        const newCat: ICategory[] = []
        category && newCat.push(category)
        const newArr = product.product_sample?.filter((productSampleItem) => {
            if (productSampleItem.product_type_id?.some(item =>
                newCat.some(catItem => catItem.cat_group === 1 && catItem._id === item) ||
                !category && cartItem.category?.some(catItem => catItem.cat_group === 1 && catItem._id === item))) {
                return productSampleItem
            }
        })
        return newArr && newArr[0] || []
    }

    const handleSelectType = (productTypeItem: IProductType) => {
        const sample = checkSample(productTypeItem)
        if (cartItem.category?.some(catItem => catItem.title === productTypeItem.title)) {
            const newArr = cartItem.category?.map(catItem => {
                if (catItem.title === productTypeItem.title) { return productTypeItem }
                return catItem
            })
            setCartItem({ ...cartItem, category: newArr })
        } else {
            sample && setCartItem({ ...cartItem, category: [...cartItem.category, productTypeItem], sample_id: sample?._id })
            sample.length < 1 && setCartItem({ ...cartItem, category: [...cartItem.category, productTypeItem] })
        }
    }

    const checkSelected = (productTypeItem: IProductType) => {
        return cartItem.category?.some(item => item.title === productTypeItem.title && item.cat_content === productTypeItem.cat_content)
    }

    const renderImageSample = checkSample() && checkSample()?.image || null

    const handleSelectImage = () => {
        console.log('abc')
    }

    return (
        <Grid templateColumns="repeat(2,1fr)" minH={500}>
            <GridItem colSpan={1}>
                <Image
                    src={renderImageSample || product?.image[0] || ImageAssets.NoImage}
                    alt={product?.name}
                    height={450}
                    width={450}
                />
                {/* swiper */}
                {product.image?.map(image => (
                    <Box key={image} className='mx-1 cursor-pointer inline' onClick={handleSelectImage}>
                        <Image

                            src={image || ImageAssets.NoImage}
                            alt={product?.name}
                            height={80}
                            width={80}
                        />
                    </Box>
                ))}
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
                        <Translation text='shipping_method' className='capitalize text-md' color={mainColor.gray3} />
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
                                    <Translation text='Vận Chuyển Tới' className='inline' />
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

                {renderCategory(product.product_type)?.map((type) => (
                    <Grid templateColumns='repeat(12,1fr)' gridGap={3} my={5} key={type.cat_content}>
                        <GridItem colSpan={3}>
                            {type.title}
                        </GridItem>
                        <GridItem colSpan={9} className='flex' flexWrap='wrap' >
                            {product.product_type && product.product_type?.map((productTypeItem) => {
                                if (type.title === productTypeItem.title)
                                    return (
                                        <SelectItem
                                            key={productTypeItem.cat_content}
                                            selected={checkSelected(productTypeItem)}
                                            mx={2} my={2}
                                            onSelect={() => handleSelectType(productTypeItem)}
                                        >
                                            {productTypeItem.cat_content}
                                        </SelectItem>
                                    )
                            })}
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

            </GridItem >
        </Grid >
    );
};

