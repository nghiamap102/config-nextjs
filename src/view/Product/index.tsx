import { Box, Container, useDisclosure, useNumberInput } from '@chakra-ui/react'
import Breadcrumb from '@components/Breadcrumb'
import { ICartItem } from '@redux/cart/cartModel'
import { mainColor } from '@theme/theme'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { useAppDispatch } from 'redux/hooks'
import { IProductItem } from 'redux/product/productModel'
import { ProductInfo } from './ProductInfo'

type ProductViewProps = {
    product: IProductItem
}

const ProductView: FC<ProductViewProps> = ({ product }) => {
    const dispatch = useAppDispatch()

    const [cartItem, setCartItem] = useState<ICartItem>({
        productId: product && product.id || '',
        quantity: 0,
        type: { color: product?.sample && product?.sample[0].color },
        active: true
    })

    const router = useRouter()

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
                <ProductInfo />
            </Box>
        </Container>
    )
}

export default ProductView
