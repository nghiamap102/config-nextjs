import { ReactIcon } from '@assets/icon'
import { ImageAssets } from '@assets/index'
import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Text,
    useNumberInput,
} from '@chakra-ui/react'
import { ButtonPrimary } from '@components/Button'
import UiNumberInputControl from '@components/Field/UiNumberInputControl'
import IconButtonPrimary from '@components/IconButtonPrimary'
import SelectItem from '@components/SelectItem'
import Translation from '@components/Translate'
import { mainColor } from '@theme/theme'
import { fillColorArrayRating, tooltipArrayRating } from 'contants/common'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import { IProductItem } from 'redux/product/productModel'

type ProductQuickViewProps = {
    product: IProductItem
    handleClose: () => void
    isOpen: boolean
}
const ProductQuickView: FC<ProductQuickViewProps> = ({
    isOpen,
    product,
    handleClose,
}) => {

    const [openModal, setOpenModal] = useState(false)

    const numberInput = useNumberInput({
        step: 1,
        defaultValue: 1,
        min: 1,
        precision: 0,
    })

    const handleAddtoCart = () => {
        // dispatch(addToCart({ product }))
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            closeOnOverlayClick
            size="6xl"
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Translation type={['common']} text='product_detail' className='capitalize' />
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
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
                                                <Flex className='items-center mx-3'>
                                                    Pson ky q tan phu
                                                    <ReactIcon.IconAi.AiOutlineDown className='ml-2' />
                                                </Flex>

                                                <Modal isOpen={openModal}>
                                                    <ModalOverlay />
                                                    <ModalContent>
                                                        <ModalHeader>Modal Title</ModalHeader>
                                                        <ModalCloseButton />
                                                        <ModalBody>
                                                            abc
                                                        </ModalBody>

                                                        <ModalFooter>
                                                            <Button colorScheme='blue' mr={3}>
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

                        </GridItem>
                    </Grid>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ProductQuickView
