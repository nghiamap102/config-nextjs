import { ReactIcon } from '@assets/icon'
import { ImageAssets } from '@assets/index'
import { Box, Button, Center, Container, Divider, Flex, Grid, GridItem, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Text, useDisclosure, useNumberInput } from '@chakra-ui/react'
import Breadcrumb from '@components/Breadcrumb'
import { ButtonPrimary } from '@components/Button'
import { RenderPrice } from '@components/Card/ProductCard'
import UiNumberInputControl from '@components/Field/UiNumberInputControl'
import IconButtonPrimary from '@components/IconButtonPrimary'
import SelectItem from '@components/SelectItem'
import Tag from '@components/Tag'
import Translation from '@components/Translate'
import { ICartItem } from '@redux/cart/cartModel'
import { mainColor } from '@theme/theme'
import { formatCurrency, formatValueCurrency } from '@utils/helper'
import { isNonEmptyString } from '@utils/validations'
import { fillColorArrayRating, tooltipArrayRating } from 'contants/common'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import { useAppDispatch } from 'redux/hooks'
import { IProductItem } from 'redux/product/productModel'

type ProductViewProps = {
    product: IProductItem
}

const ProductView: FC<ProductViewProps> = ({ product }) => {
    const { t } = useTranslation(['product'])
    const dispatch = useAppDispatch()

    const [cartItem, setCartItem] = useState<ICartItem>({
        product: product,
        quantity: 0,
        type: { color: product?.sample && product?.sample[0].color },
        imageModel: product?.sample && product?.sample[0].imageSrc || '',
    })

    const router = useRouter()
    const { slug } = router.query

    const numberInput = useNumberInput({
        step: 1,
        defaultValue: 1,
        min: 1,
        precision: 0,
    })

    useEffect(() => {
        // dispatch(getProductById(slug))
    }, [])


    useEffect(() => {
        setCartItem({ ...cartItem, quantity: parseInt(numberInput.value) })
    }, [numberInput.value])

    const handleChooseColor = (color: string) => setCartItem({ ...cartItem, type: { ...cartItem.type, color: color } })

    const handleChooseSize = (size: string) => setCartItem({ ...cartItem, type: { ...cartItem.type, size: size }, })

    const handleAddtoCart = () => {
        // dispatch(addToCart({ product }))
    }

    const renderTranslation = () => {

    }

    const handleBuyNow = () => {

    }

    const [activeModal, setActiveModal] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Container maxW='container.xl' >
            <Breadcrumb className='my-3' />
            <Box bg={mainColor.white} p={3}>
                <Grid templateColumns={'repeat(2,1fr)'}>
                    <GridItem>
                        <Image
                            src={ImageAssets.ProuductLoa1}
                            alt="product"
                            height={500}
                            width={500}
                        />
                    </GridItem>
                    <GridItem p={3}>
                        <Flex className='items-center my-3'>
                            <Tag tag={product.tag || 'normal'} className='px-2 py-0 mr-2'>
                                {product.tag}
                            </Tag>

                            <Text className='font-bold text-xl'>{product.name}</Text>
                        </Flex>

                        <Flex className='items-baseline'>
                            <Text color={mainColor.orange} borderBottom={`1px solid ${mainColor.orange}`} >{product.rate}</Text>
                            <Box px={3}>
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
                            </Box>

                            <Flex className='capitalize items-center' borderLeft={`1px solid ${mainColor.gray2}`} px={3}>
                                <Box mr={2}>
                                    {product.rate && product.rate > 0 ? product.rate : 0}
                                </Box>
                                <Translation type={['product']} text='rate' />
                            </Flex>

                            <Flex className='capitalize items-center' borderLeft={`1px solid ${mainColor.gray2}`} px={3}>
                                <Box mr={2}>
                                    {product.saleCount && product.saleCount > 0 ? product.saleCount : 0}
                                </Box>
                                <Translation type={['product']} text='saled' />
                            </Flex>

                        </Flex>

                        <Flex bg={mainColor.gray} p={5} my={5}>
                            <RenderPrice price={product.price} />
                            <RenderPrice price={product.price * product.sale / 100} />

                        </Flex>

                        <Grid templateColumns='repeat(12,1fr)' gridGap={3} my={10}>
                            <GridItem colSpan={3}>
                                <Translation type={['product']} text='shipping_method' className='capitalize text-lg' color={mainColor.gray3} />
                            </GridItem>
                            <GridItem colSpan={9}>
                                <Flex mb={3}>
                                    <ReactIcon.IconFa.FaTruckMoving color={mainColor.saleTag} size='1.5rem' className='mr-4' />
                                    <Box>
                                        <Translation type={['product']} text='free_ship' />
                                        <Translation type={['product']} text='Miễn phí vận chuyển cho đơn hàng trên ₫99.000' />
                                    </Box>
                                </Flex>
                                <Flex mb={3}>
                                    <ReactIcon.IconFi.FiTruck size='1.5rem' className='mr-4' />
                                    <Flex className='flex-col'>
                                        <Flex>
                                            <Translation type={['product']} text='Vận Chuyển Tới' />
                                            <Flex onClick={onOpen} className='items-center mx-3'>
                                                Pson ky q tan phu
                                                <ReactIcon.IconAi.AiOutlineDown className='ml-2' />
                                            </Flex>

                                            <Modal isOpen={isOpen} onClose={onClose}>
                                                <ModalOverlay />
                                                <ModalContent>
                                                    <ModalHeader>Modal Title</ModalHeader>
                                                    <ModalCloseButton />
                                                    <ModalBody>
                                                        abc
                                                    </ModalBody>

                                                    <ModalFooter>
                                                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                                                            Close
                                                        </Button>
                                                        <Button variant='ghost'>Secondary Action</Button>
                                                    </ModalFooter>
                                                </ModalContent>
                                            </Modal>

                                        </Flex>
                                        <Flex>
                                            <Translation type={['product']} text='Phí Vận Chuyển' />
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
                                    <Translation type={['product']} text='color' className='capitalize text-lg' color={mainColor.gray3} />
                                </GridItem>
                            }
                            {product.sample && product.sample[0].color &&
                                <GridItem colSpan={8} className='flex'>
                                    {product.sample?.map(item => (
                                        <SelectItem key={item.color} mx={1}>
                                            {item.color}
                                        </SelectItem>
                                    ))}
                                </GridItem>
                            }

                            <GridItem colSpan={3}>
                                <Translation type={['product']} text='quantity' className='capitalize text-lg' color={mainColor.gray3} />
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
                                <Translation text='add_to_cart' type={['product']} className='capitalize' />
                            </ButtonPrimary>

                            <ButtonPrimary onClick={handleAddtoCart} p={5} size='lg'>
                                <Translation text='buy_now' type={['product']} className='capitalize' />
                            </ButtonPrimary>

                            <IconButtonPrimary icon={<ReactIcon.IconAi.AiOutlineHeart />} aria-label="wishlist" mx={3} size='lg' />
                            <IconButtonPrimary icon={<ReactIcon.IconAi.AiOutlineShareAlt />} aria-label="wishlist" size='lg' />

                        </Flex>

                        {/* <Flex className='items-center'>
                            <Translation text='color' type={['product']} className='capitalize' />{':'}
                            {product.sample?.map((product, index) => (
                                <ButtonCircle
                                    key={product.color}
                                    onClick={() => handleChooseColor(isNonEmptyString(product.color))}
                                    label={product.color}
                                    color={product.color}
                                    marginX={1}
                                    marginY={4}
                                    active={cartItem.type.color === product.color && true}
                                />
                            ))}
                        </Flex>

                        <Box>
                            <Flex>
                                <Translation text='color' type={['product']} className='capitalize' />{':'}
                            </Flex>
                            <Flex >
                                {product.sample?.map(product => (
                                    <Box
                                        key={product.size}
                                        border={`1px solid ${mainColor.gray}`}
                                        className="inline px-4 py-1 cursor-pointer"
                                        bg={cartItem?.type?.size === product.size ? mainColor.gray1 : 'transparent'}
                                        color={cartItem?.type?.size === product.size ? mainColor.white : ''}
                                        onClick={() => handleChooseSize(isNonEmptyString(product.size))}
                                    >
                                        {product.size}
                                    </Box>
                                ))}
                            </Flex>
                        </Box>

                        <Flex>{product?.price} {product.sale}</Flex>
                        <Box w='20%' my={5}>
                            <UiNumberInputControl numberInput={numberInput} />
                        </Box>

 */}

                    </GridItem>
                </Grid>
            </Box>
        </Container>
    )
}

export default ProductView
