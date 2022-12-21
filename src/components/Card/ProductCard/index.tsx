import { IconAssets } from "@assets/index";
import { Box, Flex, Tag, Text } from "@chakra-ui/react";
import ButtonCircle from "@components/ButtonCircle";
import ButtonPrimary from "@components/ButtonPrimary";
import MiniAddCart from "@components/Cart/MiniAddCart";
import IconButtonPrimary from "@components/IconButtonPrimary";
import SimpleRating from "@components/Rating";
import { ICartItem } from "@redux/cart/cartModel";
import { addToWishList } from "@redux/cart/cartSlice";
import { useAppDispatch } from "@redux/hooks";
import { mainColor } from "@theme/theme";
import { formatCurrency, formatValueCurrency } from "@utils/helper";
import { isNonEmptyString } from "@utils/validations";
import ProductQuickView from "@view/ProductQuickview";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { FC, useMemo, useState } from "react";
import { IProductItem } from "redux/product/productModel";
import { CardHeader } from "./CardHeader";
import Link from "next/link";

type ProductCardProps = {
    product: IProductItem
    isOpenQuickView?: boolean
};

const ProductCard: FC<ProductCardProps> = ({
    product,
    isOpenQuickView,
}) => {
    const { id, name, price, sale, tag, sample } = product
    const dispatch = useAppDispatch()

    const { t } = useTranslation(['product']);
    const router = useRouter();

    const [activeModal, setActiveModal] = useState(isOpenQuickView || false)
    const [activeQuickAdd, setActiveQuickAdd] = useState(false)
    const [cartItem, setCartItem] = useState<ICartItem>({
        product: product,
        quantity: 0,
        type: { color: product?.sample && product?.sample[0].color },
        imageModel: product?.sample && product?.sample[0].imageSrc
    })
    const handleChooseColor = (color: string) => setCartItem({ ...cartItem, type: { ...cartItem.type, color: color } })

    const renderPrice = (price: any) => {
        return t('price', {
            value: formatValueCurrency(router.locale, price),
            formatParams: {
                value: { currency: formatCurrency(router.locale), locale: router.locale },
            },
        })
    }

    const handleActiveModal = () => setActiveModal(true)
    const handleActiveQuickAdd = () => setActiveQuickAdd(true)
    const handleInActiveQuickAdd = () => setActiveQuickAdd(false)
    const handleAddToWishList = () => dispatch(addToWishList(product))

    const renderMiniAddCart = useMemo(() => {
        return <MiniAddCart
            onClose={handleInActiveQuickAdd}
            isOpen={activeQuickAdd}
            product={product}
            title={'quick add to cart'}
            cartItem={cartItem}
        />
    }, [cartItem, activeQuickAdd])
    
    return (
        <Box bg={mainColor.white} padding={7}>

            <Tag bg={mainColor.red2} color={mainColor.red} className='capitalize p-2 absolute top-7 left-7 duration-400'>{tag}</Tag>

            <CardHeader cartItem={cartItem} product={product} onClickShortCut={handleActiveModal} />

            <Box>
                <Link href={`/product/${id}`}><Text fontSize='lg' marginBottom={2}>{name?.slice(0, 45)}...</Text></Link>
            </Box>

            <SimpleRating direction="horizon" value={product.rate} />

            <Flex marginTop={3} alignItems='center' >
                <Text textDecoration='line-through' color={mainColor.gray1}>{renderPrice(sale)}</Text>
                {sale && <Text marginX={3} color={mainColor.gray1}>{t('From')}</Text>}
                <Text color={mainColor.red} fontWeight={700} fontSize='xl'>{renderPrice(price)}</Text>
            </Flex>

            <Flex>
                {sample?.map((product) => (
                    <ButtonCircle
                        key={product.color}
                        onClick={() => handleChooseColor(isNonEmptyString(product.color))}
                        label={product.color}
                        color={product.color}
                        marginX={1} marginY={4} active={cartItem.type && cartItem.type.color === product.color && true}
                    />
                ))}
            </Flex>

            <Flex>
                <ButtonPrimary w='100%' marginRight={4} textTransform='capitalize' onClick={handleActiveQuickAdd}>add to cart</ButtonPrimary>

                <IconButtonPrimary
                    aria-label='wishlist'
                    bg={mainColor.saleTag}
                    color={mainColor.gray}
                    icon={<IconAssets.ReactIcon.IconAi.AiOutlineHeart />}
                    onClick={handleAddToWishList}
                />
            </Flex>

            {renderMiniAddCart}

            <ProductQuickView
                product={product}
                isOpen={activeModal}
                handleClose={() => setActiveModal(false)}
            />
        </Box>
    );
};

export default ProductCard