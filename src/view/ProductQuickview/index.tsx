import { ImageAssets } from "@assets/index";
import { Flex, Grid, GridItem, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { fillColorArrayRating, tooltipArrayRating } from "contants/common";
import Image from "next/image";
import { FC } from "react";
import { Rating } from "react-simple-star-rating";
import { ProductData } from "redux/product/productModel";

type ProductQuickViewProps = {
    product: ProductData
    handleClose: () => void
    isOpen: boolean
};
const ProductQuickView: FC<ProductQuickViewProps> = ({
    isOpen,
    product,
    handleClose,
}) => {
    return (
        <Modal isOpen={isOpen} onClose={handleClose} closeOnOverlayClick size='6xl'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Grid templateColumns='repeat(2,1fr)'>
                        <GridItem colSpan={1}>

                            <Image src={product.sample[0]?.imageSrc || ImageAssets.NoImage} alt={product.name} />
                        </GridItem>

                        <GridItem colSpan={1}>
                            <Link href={`/product/${product.id}`}>
                                {product.name}
                            </Link>
                            <Flex>
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
                                {product.saleCount}
                            </Flex>
                            {product.id}
                            {product.price}
                        </GridItem>
                    </Grid>
                </ModalBody>
                <ModalFooter>
                    abc
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ProductQuickView