import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useNumberInput
} from '@chakra-ui/react'
import Translation from '@components/Translate'
import { FC, useState } from 'react'
import { IProductItem } from 'redux/product/productModel'
import { ProductInfo } from './ProductInfo'

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
                    <Translation text='product_detail' className='capitalize' />
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <ProductInfo product={product} />
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ProductQuickView
