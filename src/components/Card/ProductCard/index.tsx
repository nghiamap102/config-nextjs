import { ReactIcon } from '@assets/icon'
import { Box, BoxProps, Flex, Text } from '@chakra-ui/react'
import SimpleRating from '@components/Rating'
import { mainColor } from '@theme/theme'
import { formatCurrency, formatValueCurrency, renderElementUpOnThousand } from '@utils/helper'
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
} & BoxProps

const ProductCard: FC<ProductCardProps> = ({ product, isOpenQuickView, ...props }) => {
    const { _id, name, sold, rating } = product
    const [activeModal, setActiveModal] = useState(isOpenQuickView || false)
    const handleActiveModal = () => setActiveModal(true)

    return (
        <Flex bg={mainColor.white} className='flex-col border-primary relative' {...props} >

            <Tag
                tag={'favourite'}
                className="capitalize p-1 absolute top-2 left-0 text-sm"
                mx={0}
                zIndex={5}
            >
                favourite
            </Tag>

            <CardHeader product={product} onClickShortCut={handleActiveModal} />

            <Flex px={3} py={3} className='flex-col' flex='1 auto' gap={3}>
                <Link href={`/product/${_id}`}>
                    <a href="">
                        <Text className='mt-2'> {name && name?.length > 44 ? `${name.slice(0,50).padEnd(53,'.')}` : name} </Text>
                    </a>
                </Link>

                <SimpleRating direction="horizon" value={rating?.average || 5} starSize={20} count={rating?.count || 0} />

                <Flex>
                    <Tag className='inline-block px-2 py-1 rounded-lg text-sm' mx={0} bg={mainColor.saleTag}>
                        <ReactIcon.IconIo5.IoTicketOutline color={mainColor.red2} className='mr-2' />
                        <Text lineHeight='normal'>30%</Text>
                    </Tag>
                </Flex>

                <Flex className='justify-between items-center'>
                    <Flex alignItems="center">
                        <RenderPrice
                            // use with rang rice 
                            price={0}
                            color={mainColor.red}
                            fontWeight={600}
                        />
                    </Flex>
                    <Text color={mainColor.gray1} fontSize='sm'>{renderElementUpOnThousand(sold)} sold </Text>
                </Flex>
            </Flex>

            <ProductQuickView
                product={product}
                isOpen={activeModal}
                handleClose={() => setActiveModal(false)}
            />
        </Flex>
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
