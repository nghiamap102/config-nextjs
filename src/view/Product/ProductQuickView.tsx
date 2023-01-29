import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay
} from '@chakra-ui/react'
import Translation from '@components/Translate'
import { FC } from 'react'
import { IProductItem } from 'redux/product/productModel'
import { ProductInfo } from './ProductInfo'

type ProductQuickViewProps = {
    product: IProductItem
    handleClose: () => void
    isOpen: boolean
}
const ProductQuickView: FC<ProductQuickViewProps> = ({ isOpen, product, handleClose, }) => {

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
                    <Translation text='product_detail' className='capitalize' />
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody overflow={'auto'} pb={8}>
                    <ProductInfo product={product} />
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ProductQuickView
