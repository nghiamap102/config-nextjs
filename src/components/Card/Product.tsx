import Icon from "@assets/icon";
import { ImagePNG } from "@assets/index";
import { Box, Button, Flex, IconButton, Link, Tag, Text } from "@chakra-ui/react";
import ButtonPrimary from "@components/ButtonPrimary";
import { mainColor } from "@theme/theme";
import { FormatCurrency, FormatValueCurrency } from "@utils/helper";
import { fillColorArrayRating, tooltipArrayRating } from "contants/common";
import { useTranslation, } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";
import { ProductData } from "redux/product/productModel";

type ProductCardProps = {
    handleAddToCart?: () => void
    handleAddToWishList?: () => void
} & ProductData;
export const ProductCard: React.FC<ProductCardProps> = ({
    color,
    name,
    price,
    rate,
    sale,
    tag,
    srcImage,
    handleAddToCart,
    handleAddToWishList,
}) => {

    const { t } = useTranslation(['product', 'common']);
    const router = useRouter();

    const [active, setActive] = useState(false)
    const [colorIndex, setColorIndex] = useState(0)
    const [rating, setRating1] = useState(0);
    const handleMouse = () => {
        setActive(!active)
    }

    const handleRating1 = (rate: number) => setRating1(rate);
    return (
        <Box bg={mainColor.white} padding={7}>
            <Tag bg={mainColor.red2} color={mainColor.red} className='capitalize p-2 absolute top-2 left-2'>{tag}</Tag>

            <Image src={srcImage[0] || ImagePNG.NoImage} alt={name} height={250} width={250} />

            <Link href={'abc'}>
                <Text fontSize='lg' marginBottom={2}>{name?.slice(0, 45)}...</Text>
            </Link>

            <Rating
                SVGclassName="inline-block"
                onClick={handleRating1}
                size={25}
                readonly
                transition
                allowFraction
                tooltipArray={tooltipArrayRating}
                fillColorArray={fillColorArrayRating}
                initialValue={rate}
            />

            <Box marginTop={3}>
                <Text textDecoration='line-through'>{sale}</Text>
                {sale && <Text>{t('From')}</Text>}
                <Text>{t('price', {
                    value: FormatValueCurrency(router.locale, price),
                    formatParams: {
                        value: { currency: FormatCurrency(router.locale), locale: router.locale },
                    },
                })}</Text>
            </Box>

            <Flex onMouseEnter={handleMouse} onMouseLeave={handleMouse}>
                <ButtonPrimary onClick={handleAddToCart}>add to cart</ButtonPrimary>
                <IconButton onClick={handleAddToWishList} icon={<Icon.IconAi.AiOutlineHeart />} />
            </Flex>
        </Box>
    );
};