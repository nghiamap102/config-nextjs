import Icon from "@assets/icon";
import { ImagePNG } from "@assets/index";
import { Box, Button, Flex, IconButton, Link, Tag, Text, Tooltip } from "@chakra-ui/react";
import ButtonCircle from "@components/ButtonCircle";
import ButtonPrimary from "@components/ButtonPrimary";
import IconButtonPrimary from "@components/IconButtonPrimary";
import { mainColor } from "@theme/theme";
import { FormatCurrency, FormatValueCurrency } from "@utils/helper";
import { isNonEmptyString } from "@utils/validations";
import { fillColorArrayRating, tooltipArrayRating } from "contants/common";
import { useTranslation } from "next-i18next";
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
    listColor,
    name,
    price,
    rate,
    sale,
    tag,
    imageSrc,
    handleAddToCart,
    handleAddToWishList,
}) => {

    const { t } = useTranslation(['product', 'common']);
    const router = useRouter();

    const [activeWishList, setActiveWishList] = useState(false)
    const [currentColor, setCurrentColor] = useState('')

    const handleMouse = () => {
        setActiveWishList(!activeWishList)
    }

    const handleChooseColor = (color: string) => {
        setCurrentColor(color)
    }


    const renderPrice = (price: any) => {
        return t('price', {
            value: FormatValueCurrency(router.locale, price),
            formatParams: {
                value: { currency: FormatCurrency(router.locale), locale: router.locale },
            },
        })
    }

    return (
        <Box bg={mainColor.white} padding={7}>
            <Tag bg={mainColor.red2} color={mainColor.red} className='capitalize p-2 absolute top-2 left-2'>{tag}</Tag>

            <Image src={imageSrc && imageSrc[0] || ImagePNG.NoImage} alt={name} height={250} width={250} />

            <Link href={'abc'}>
                <Text fontSize='lg' marginBottom={2}>{name?.slice(0, 45)}...</Text>
            </Link>

            <Rating
                SVGclassName="inline-block"
                size={25}
                readonly
                transition
                allowFraction
                tooltipArray={tooltipArrayRating}
                fillColorArray={fillColorArrayRating}
                initialValue={rate}
            />

            <Flex marginTop={3} alignItems='center' >
                <Text textDecoration='line-through' color={mainColor.gray1}>{renderPrice(sale)}</Text>
                {sale && <Text marginX={3} color={mainColor.gray1}>{t('From')}</Text>}
                <Text color={mainColor.red} fontWeight={700} fontSize='xl'>{renderPrice(price)}</Text>
            </Flex>

            <Flex>
                {listColor?.map((color, index) => (
                    <ButtonCircle onClick={() => handleChooseColor(color)} label={color} color={color} key={color} marginX={1} marginY={4} />
                ))}
            </Flex>

            <Flex onMouseEnter={handleMouse} onMouseLeave={handleMouse} >
                <ButtonPrimary onClick={handleAddToCart} w='100%' marginRight={4}  textTransform='capitalize'>add to cart</ButtonPrimary>

                <IconButtonPrimary aria-label='wishlist' bg={mainColor.saleTag} color={mainColor.gray} icon={<Icon.IconAi.AiOutlineHeart />} onClick={handleAddToWishList} />
            </Flex>
        </Box>
    );
};