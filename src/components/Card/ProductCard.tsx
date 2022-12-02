import { ReactIcon } from "@assets/icon";
import { ImageAssets } from "@assets/index";
import { Box, Flex, Tag, Text } from "@chakra-ui/react";
import ButtonCircle from "@components/ButtonCircle";
import ButtonPrimary from "@components/ButtonPrimary";
import IconButtonPrimary from "@components/IconButtonPrimary";
import { mainColor } from "@theme/theme";
import { formatCurrency, formatValueCurrency } from "@utils/helper";
import classNames from "classnames";
import { fillColorArrayRating, tooltipArrayRating } from "contants/common";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { ProductData } from "redux/product/productModel";

type ProductCardProps = {
    handleAddToCart?: () => void
    handleAddToWishList?: () => void
} & ProductData;

const ProductCard: FC<ProductCardProps> = ({
    id,
    name,
    price,
    rate,
    sale,
    tag,
    sample,
    handleAddToCart,
    handleAddToWishList,
}) => {
    const { t } = useTranslation(['product']);
    const router = useRouter();

    const [currentColor, setCurrentColor] = useState(sample[0]?.color || '')
    const [activeQuickView, setActiveQuickView] = useState(false);
    const [activeImg, setActiveImg] = useState(false);

    const handleChooseColor = (color: string) => {
        setCurrentColor(color)
    }

    const handleMouseQuickView = () => {
        setActiveQuickView(!activeQuickView)
    }

    const handleMouseImg = () => {
        setActiveImg(!activeImg)
    }

    const renderPrice = (price: any) => {
        return t('price', {
            value: formatValueCurrency(router.locale, price),
            formatParams: {
                value: { currency: formatCurrency(router.locale), locale: router.locale },
            },
        })
    }

    return (
        <Box bg={mainColor.white} padding={7} onMouseEnter={handleMouseQuickView} onMouseLeave={handleMouseQuickView}>
            <Tag bg={mainColor.red2} color={mainColor.red} className='capitalize p-2 absolute top-7 left-7 duration-400'>{tag}</Tag>

            <Flex
                position={'relative'}
                onMouseEnter={handleMouseImg}
                onMouseLeave={handleMouseImg}
            >
                {sample?.map((product, index) =>
                    <Box
                        key={product.color}
                        className={classNames(currentColor === product.color  ? 'fade-in' : 'hidden')}
                    >
                        <Image src={product.imageSrc || ImageAssets.NoImage} alt={name} height={250} width={250} />
                    </Box>
                )}

                {/* <Box className={classNames(activeImg ? 'fade-in' : 'hidden')}   >
                    <Image src={sample && sample[sample?.length - 1].imageSrc || ImageAssets.NoImage} alt={name} height={250} width={250} />
                </Box> */}


                <Link href={`/product/${id}`}>
                    <Box className={classNames(activeQuickView ? 'opacity-1' : 'opacity-0', 'duration-300 absolute-50 rounded-2xl')} bg={mainColor.white} py={1} px={2}>
                        <Text textTransform={'capitalize'}>{t('quick_view')} </Text>
                    </Box>
                </Link>
            </Flex>

            <Link href={`/product/${id}`}>
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
                {sample?.map((product, index) => (
                    <ButtonCircle
                        key={product.color}
                        onClick={() => handleChooseColor(product.color)}
                        label={product.color}
                        color={product.color}
                        marginX={1} marginY={4} active={currentColor === product.color && true} />
                ))}
            </Flex>

            <Flex>
                <ButtonPrimary onClick={handleAddToCart} w='100%' marginRight={4} textTransform='capitalize'>add to cart</ButtonPrimary>

                <IconButtonPrimary aria-label='wishlist' bg={mainColor.saleTag} color={mainColor.gray} icon={<ReactIcon.IconAi.AiOutlineHeart />} onClick={handleAddToWishList} />
            </Flex>
        </Box >
    );
};

export default ProductCard