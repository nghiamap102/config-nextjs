import { IconAssets, ImageAssets } from '@assets/index';
import { Box, Flex, Grid, GridItem, Text, useDisclosure } from '@chakra-ui/react';
import { ButtonPrimary } from '@components/Button';
import { RenderPrice } from '@components/Card/ProductCard';
import Carousel from '@components/Carousel';
import UiNumberInputControl from '@components/Field/UiNumberInputControl';
import IconButtonPrimary from '@components/IconButtonPrimary';
import SelectItem from '@components/Items/SelectItem';
import PopOver from '@components/PopOver';
import Popup from '@components/Popup';
import SimpleRating from '@components/Rating';
import CustomToast from '@components/Toast';
import Translation from '@components/Translate';
import { ILocation } from '@redux/auth/authModel';
import { fetchAddress, selectAuth } from '@redux/auth/authSlice';
import { ICartItem, ICategory } from '@redux/cart/cartModel';
import { addToCart } from '@redux/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { IProductItem, IProductType } from '@redux/product/productModel';
import { mainColor } from '@theme/theme';
import { renderCategory, sortAddress } from '@utils/helper';
import AddressItem from '@view/Account/Address/AddressItem';
import { TOASTID } from 'contants/common';
import { Ref } from 'models/common';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, forwardRef, useEffect, useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import ProductSkeleton from './ProductSkeleton';

type ProductInfoProps = {
    product: IProductItem
};

const ProductInfo = forwardRef<Ref, ProductInfoProps>((props, ref) => {
    const { product } = props
    const dispatch = useAppDispatch()
    const router = useRouter()
    const { data } = useSession()
    const toast = CustomToast()
    const [cartItem, setCartItem] = useState<ICartItem>({
        product_id: product?._id || '',
        quantity: 1,
        sample_id: '',
        category: [],
        active: true,
    })
    const handleAddtoCart = async () => {
        const temp = product.product_type?.reduce((init, item) => {
            if (item.cat_group && item.cat_group > init) return item.cat_group
            else return init
        }, 0)
        if (temp === cartItem.category?.length && data?.user) dispatch(addToCart({ ...cartItem, category: cartItem.category?.map(item => item._id) }))
        else if (!data?.user) toast({ title: 'Please login to do this action', id: TOASTID.CART })
        else toast({ title: 'Please choose the model if you like', id: TOASTID.CART })
    }

    const handleChangeQuantity = (value: string) => setCartItem({ ...cartItem, quantity: parseInt(value) })

    const checkSample = (category?: ICategory) => {
        const newCat: ICategory[] = []
        category && newCat.push(category)
        const newArr = product?.product_sample?.filter((productSampleItem) => {
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

    const handleShare = () => {
        toast({ title: 'Copy link to clipboard' })
        navigator.clipboard.writeText(`${window.location.origin}/${router.asPath}`)
    }
    const a = true
    // if (a) return (
    //     <Box minH={500}>
    //         <ProductSkeleton />
    //     </Box>
    // )

    return (
        <Flex w='full' minH={500}>
            <Box w='45%' mr={12}>
                <Flex px={3} my={3}>
                    <Image
                        src={renderImageSample || product?.image[0] || ImageAssets.NoImage}
                        alt={product?.name}
                        height={600}
                        width={600}
                    />
                </Flex>
                <Carousel spaceBetween={5} slidesPerView={6} centeredSlides={false} >
                    {product?.image?.map(image => (
                        <SwiperSlide key={image}>
                            <Box key={image} className='cursor-pointer' onClick={handleSelectImage}>
                                <Image
                                    src={image || ImageAssets.NoImage}
                                    alt={product?.name}
                                    height={80}
                                    width={80}
                                />
                            </Box>
                        </SwiperSlide>
                    ))}
                </Carousel>
            </Box>

            <Box w='50%'>
                <Link href={`/product/${product?._id}`}><Box className='link' fontSize='2xl'>{product?.name}</Box></Link>

                <Flex gap={3} className='items-center'>
                    <SimpleRating direction="horizon" value={3.5} avg={50} my={5} pr={3} borderRight={`2px solid ${mainColor.gray2}`}/>
                    <Text color={mainColor.gray3}>36 sold</Text>
                </Flex>

                <Flex >
                    <Translation w='30%' text='shipping_method' className='capitalize text-md' color={mainColor.gray3} />
                    <Box w='70%'>
                        <Flex mb={3}>
                            <IconAssets.ReactIcon.IconFa.FaTruckMoving color={mainColor.saleTag} size='1.5rem' className='mr-4' />
                            <Box>
                                <Translation text='free_ship' />
                                <Translation text='Miễn phí vận chuyển cho đơn hàng trên ₫99.000' />
                            </Box>
                        </Flex>
                        <Flex mb={3}>
                            <IconAssets.ReactIcon.IconFi.FiTruck size='1.5rem' className='mr-4' />
                            <Flex className='flex-col'>
                                <Flex>
                                    <Translation text='Vận Chuyển Tới' className='inline' />
                                    <PopupAddress data={data} />
                                </Flex>
                                <Flex>
                                    <Translation text='Phí Vận Chuyển' />
                                    <PopOver
                                        ref={ref}
                                        popoverTrigger={(
                                            <Flex className='items-center mx-3' gap={1}>
                                                <RenderPrice price={1.5} /> - <RenderPrice price={3.0} />
                                                <IconAssets.ReactIcon.IconAi.AiOutlineDown />
                                            </Flex>
                                        )}
                                        popoverBody={(
                                            <Flex className='flex-col p-2'>
                                                <Flex gap={3} className='items-center p-2 hover-bg-gray cursor-pointer'>
                                                    <IconAssets.ReactIcon.IconMd.MdOutlineSavings size='1.5rem' />
                                                    <Flex gap={3}>Saving: <RenderPrice price={1.5} /></Flex>
                                                </Flex>
                                                <Flex gap={3} className='items-center p-2 hover-bg-gray cursor-pointer'>
                                                    <IconAssets.ReactIcon.IconBs.BsTruck size='1.5rem' />
                                                    <Flex gap={3}>Primary: <RenderPrice price={3} /></Flex>
                                                </Flex>
                                                <Flex gap={3} className='items-center p-2 hover-bg-gray cursor-pointer'>
                                                    <IconAssets.ReactIcon.IconIo.IoIosRocket size='1.5rem' />
                                                    <Flex gap={3}>Fast: <RenderPrice price={5} /></Flex>
                                                </Flex>
                                            </Flex>
                                        )}
                                    />
                                </Flex>
                            </Flex>
                        </Flex>
                    </Box>

                </Flex>

                {renderCategory(product?.product_type)?.map((type) => (
                    <Grid templateColumns='repeat(12,1fr)' gridGap={3} my={5} key={type.cat_content}>
                        <GridItem colSpan={3}>{type.title}</GridItem>
                        <GridItem colSpan={9} className='flex' flexWrap='wrap' >
                            {product?.product_type && product?.product_type?.map((productTypeItem) => {
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
                        <IconAssets.ReactIcon.IconBs.BsCartPlus size='2rem' className='mx-2' />
                        <Translation text='add_to_cart' className='capitalize' />
                    </ButtonPrimary>

                    <ButtonPrimary onClick={handleAddtoCart} p={5} size='lg'>
                        <Translation text='buy_now' className='capitalize' />
                    </ButtonPrimary>

                    <IconButtonPrimary icon={<IconAssets.ReactIcon.IconAi.AiOutlineHeart />} aria-label="wishlist" mx={3} size='lg' />
                    <IconButtonPrimary icon={<IconAssets.ReactIcon.IconAi.AiOutlineShareAlt />} aria-label="wishlist" size='lg' onClick={handleShare} />
                </Flex>

            </Box>
        </Flex>
    );
})

ProductInfo.displayName = 'ProductInfo';

type PopupAddressProps = {
    data?: any
}

const PopupAddress: FC<PopupAddressProps> = ({ data }) => {

    const { onClose, onOpen, isOpen } = useDisclosure()
    const authState = useAppSelector(selectAuth)
    const dispatch = useAppDispatch()
    const [address, setAddress] = useState<ILocation>({
        province: { name: 'Hà Nội', codename: 'ha_noi' },
        district: { name: 'Cầu Giấy', codename: 'cau_giay' },
    })


    const handleGetCurrentLocation = async () => {
        const successCallback = (position) => {
            console.log(position);
        };

        const errorCallback = (error) => {
            console.log(error);
        };

        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }

    useEffect(() => {
        data && data.user && dispatch(fetchAddress(data.user._id))
    }, [])

    return (
        <>
            <Flex className='items-center mx-3 cursor-pointer' gap={1} onClick={onOpen} >
                <Text>{address.province?.name},</Text> {address.district?.name}
                <IconAssets.ReactIcon.IconAi.AiOutlineDown className='ml-2' />
            </Flex>
            <Popup size='2xl' isOpen={isOpen} title='Change address' onClose={onClose} onApply={onClose} >
                {sortAddress(authState.address).map((item) => <AddressItem select onSelect={() => console.log(item)} key={item._id} item={item} edit={false} />)}
                <Box py={5} className="inline-flex items-center cursor-pointer" gap={2} onClick={handleGetCurrentLocation}>
                    <IconAssets.ReactIcon.IconBi.BiCurrentLocation size='2rem' />
                    <Translation text='use current location' firstCapital />
                </Box>
            </Popup>
        </>
    )
}



export default ProductInfo