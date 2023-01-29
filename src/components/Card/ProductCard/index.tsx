import { ReactIcon } from '@assets/icon'
import { Box, BoxProps, Flex, Text } from '@chakra-ui/react'
import SimpleRating from '@components/Rating'
import { mainColor } from '@theme/theme'
import { formatCurrency, formatValueCurrency } from '@utils/helper'
import ProductQuickView from '@view/Product/ProductQuickView'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { IProductItem } from 'redux/product/productModel'
import { CardHeader } from './CardHeader'
import Tag from '@components/Tag'

type ProductCardProps = {
    product: IProductItem
    isOpenQuickView?: boolean
}

const ProductCard: FC<ProductCardProps> = ({ product, isOpenQuickView }) => {
    const { _id, name, tag } = product
    const [activeModal, setActiveModal] = useState(isOpenQuickView || false)
    const handleActiveModal = () => setActiveModal(true)

    return (
        <Box bg={mainColor.white} padding={7} className='border-primary'>

            <Tag
                tag={tag}
                className="capitalize px-2 py-1 absolute top-7 left-7 "
                zIndex={999}
            >
                {tag}
            </Tag>

            <CardHeader product={product} onClickShortCut={handleActiveModal} />

            <Link href={`/product/${_id}`}>
                <Text fontSize="lg" className='my-2'> {name && name?.length > 44 ? `${name?.slice(0, 45)}...` : name} </Text>
            </Link>

            <SimpleRating direction="horizon" value={3.5} avg={50} mb={2} />

            <Tag className='inline-block px-2 py-1 rounded-lg text-sm mb-2' bg={mainColor.saleTag}>
                <ReactIcon.IconIo5.IoTicketOutline color={mainColor.red2} className='mr-2' />
                <Text lineHeight='normal'>30%</Text>
            </Tag>

            <Flex className='justify-between items-center'>
                <Flex alignItems="center">
                    <RenderPrice price={0} textDecoration="line-through" color={mainColor.gray1} />
                    <RenderPrice
                        price={0}
                        color={mainColor.red} className='font-bold text-xl ml-2' />
                </Flex>
                <Box>
                    8.3k saled
                </Box>
            </Flex>

            <ProductQuickView
                product={product}
                isOpen={activeModal}
                handleClose={() => setActiveModal(false)}
            />
        </Box>
    )
}


type RenderPriceProp = {
    price: number | string
} & BoxProps

export const RenderPrice: FC<RenderPriceProp> = ({ price, ...props }) => {
    const { t } = useTranslation(['common'])
    const router = useRouter()

    return (
        <Box {...props}>
            {t('price', {
                value: formatValueCurrency(router.locale, price),
                formatParams: {
                    value: {
                        currency: formatCurrency(router.locale),
                        locale: router.locale,
                    },
                },
            })}
        </Box>
    )
}


export default ProductCard
