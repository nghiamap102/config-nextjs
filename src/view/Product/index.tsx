import { ImageAssets } from "@assets/index";
import { Box, Button, Container, Grid, GridItem, Text } from "@chakra-ui/react";
import ButtonCircle from "@components/ButtonCircle";
import { fillColorArrayRating, tooltipArrayRating } from "contants/common";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { addToCart } from "redux/cart/cartSlice";
import { useAppDispatch } from "redux/hooks";
import { ProductData } from "redux/product/productModel";
import { getProductById } from "redux/product/productSlice";

const ProductPage: FC = (product: ProductData) => {
    const { t } = useTranslation(['product'])
    const dispatch = useAppDispatch()
    const [currentColor, setCurrentColor] = useState(product.sample && product.sample[0]?.color || '')
    const router = useRouter()
    const { id } = router.query
    useEffect(() => {
        dispatch(getProductById({}))
    }, [])

    const handleChooseColor = (color: string) => {
        setCurrentColor(color)
    }

    console.log(router);
    return (
        <Container>
            <Grid templateColumns={'repeat(2,1fr)'}>
                <GridItem>
                    <Image src={ImageAssets.ProuductLoa1} alt='product' height={500} width={500} />
                </GridItem>
                <GridItem>
                    <Box>
                        <Text>{product.name}</Text>

                        <Box>
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
                            <Text textTransform={'capitalize'}>{product.saleCount || t('no_purchase_yet')}</Text>
                        </Box>

                        {product.sample?.map((product, index) => (
                            <ButtonCircle
                                key={product.color}
                                onClick={() => handleChooseColor(product.color)}
                                label={product.color}
                                color={product.color}
                                marginX={1} marginY={4} active={currentColor === product.color && true} />
                        ))}
                        
                        <Button onClick={() => dispatch(addToCart({  }))}>
                            {t('add_to_cart')}
                        </Button>
                    </Box>
                </GridItem>
            </Grid>
        </Container>
    );
};

export default ProductPage