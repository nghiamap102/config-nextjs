import {
    Button,
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
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    Portal
} from '@chakra-ui/react'
import Translation from '@components/Translate'
import { FC, forwardRef, useRef } from 'react'
import { IProductItem } from 'redux/product/productModel'
import { ProductInfo } from './ProductInfo'

type ProductQuickViewProps = {
    product: IProductItem
    handleClose: () => void
    isOpen: boolean
}
const ProductQuickView: FC<ProductQuickViewProps> = ({ isOpen, product, handleClose, }) => {
    const ref = useRef(null)
    console.log(ref)
    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            closeOnOverlayClick
            size="6xl"
        >
            {/* <ModalOverlay />
            <ModalContent ref={ref}>
                <ModalHeader>
                    <Translation text='product_detail' className='capitalize' />
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody overflow={'auto'} pb={8}>
                    <ProductInfo product={product} ref={ref}/>
                </ModalBody>
            </ModalContent> */}
            <ModalOverlay />
            <ModalContent ref={ref}>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <ProductInfo product={product} ref={ref}/>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ProductQuickView
