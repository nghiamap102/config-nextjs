import { ImageAssets } from '@assets/index'
import { Box, Flex } from '@chakra-ui/react'
import Translation from '@components/Translate'
import { ICartItem } from '@redux/cart/cartModel'
import { IProductItem } from '@redux/product/productModel'
import { mainColor } from '@theme/theme'
import classNames from 'classnames'
import Image from 'next/image'
import { FC, useState } from 'react'
type CardHeaderProps = {
    cartItem: ICartItem
    product: IProductItem
    onClickShortCut?: () => void
}
export const CardHeader: FC<CardHeaderProps> = ({
    cartItem,
    product,
    onClickShortCut,
}) => {
    const [activeQuickView, setActiveQuickView] = useState(false)
    const handleMouseQuickViewActive = () => setActiveQuickView(true)
    const handleMouseQuickViewInActive = () => setActiveQuickView(false)
    return (
        <Flex
            position={'relative'}
            onMouseEnter={handleMouseQuickViewActive}
            onMouseLeave={handleMouseQuickViewInActive}
        >
            {product.sample?.map(item => (
                <Box
                    key={item.color}
                    className={classNames(
                        cartItem.type && cartItem.type.color === item.color
                            ? 'fade-in'
                            : 'hidden',
                    )}
                >
                    <Image
                        src={item.imageSrc || ImageAssets.NoImage}
                        alt={product.name}
                        height={250}
                        width={250}
                    />
                </Box>
            ))}

            <Box
                className={classNames(
                    activeQuickView ? 'opacity-1' : 'opacity-0',
                    'duration-300 absolute-50 rounded-2xl cursor-pointer',
                )}
                bg={mainColor.white}
                py={1}
                px={2}
                onClick={onClickShortCut}
            >
                <Translation
                    text="quick_view"
                    type={['product']}
                    className="capitalize"
                />
            </Box>
        </Flex>
    )
}
