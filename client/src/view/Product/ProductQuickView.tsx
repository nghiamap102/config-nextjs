import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay
} from '@chakra-ui/react'
import Translation from '@components/Translate'
import { FC, useRef } from 'react'
import { IProductItem } from 'redux/product/productModel'
import ProductInfo from './ProductInfo'

type ProductQuickViewProps = {
    product: IProductItem
    handleClose: () => void
    isOpen: boolean
}
const ProductQuickView: FC<ProductQuickViewProps> = ({ isOpen, product, handleClose, }) => {
    const ref = useRef(null)
    
    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            closeOnOverlayClick
            size="6xl"
        >
            <ModalOverlay />
            <ModalContent ref={ref}>
                <ModalHeader>
                    <Translation text='product_detail' className='capitalize' />
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody overflow={'auto'} pb={8}>
                    <ProductInfo product={product} ref={ref} />
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ProductQuickView
