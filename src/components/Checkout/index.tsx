import { NoImage } from '@assets/image'
import {
    Box,
    Flex,
    FormLabel,
    Grid,
    GridItem,
    Input,
    Td,
    Text,
    Tr,
} from '@chakra-ui/react'
import Translation from '@components/Translate'
import { ICartItem } from '@redux/cart/cartModel'
import { formatCurrency, formatValueCurrency } from '@utils/helper'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC } from 'react'

type CheckoutItemProps = {
    item: ICartItem
}
const CheckoutItem: FC<CheckoutItemProps> = ({ item }) => {
    const router = useRouter()

    const renderTranslate = text => {
        return (
            <Translation
                className="capitalize inline"
                type={['product']}
                text={text}
            />
        )
    }
    const renderPrice = (type: 'unit' | 'total') => {
        return (
            <Translation
                type={['product']}
                formatTranslate={{
                    value: formatValueCurrency(
                        router.locale,
                        type === 'unit'
                            ? item.product.price
                            : item.product.price * item.quantity,
                    ),
                    formatParams: {
                        value: {
                            currency: formatCurrency(router.locale),
                            locale: router.locale,
                        },
                    },
                }}
                text={'price'}
            />
        )
    }

    return (
        <>
            <Grid templateColumns="repeat(12, 1fr)" px={7} py={5}>
                <GridItem colSpan={12} className="flex py-3">
                    shop name
                </GridItem>
                <GridItem colSpan={5} className="flex items-center">
                    <Image
                        src={
                            (item?.product?.sample &&
                                item?.product?.sample[0].imageSrc) ||
                            NoImage
                        }
                        alt={item?.product?.name}
                        height={70}
                        width={70}
                    />

                    <Text className="ml-3">{item.product.name}</Text>
                </GridItem>
                <GridItem colSpan={3} />
                <GridItem colSpan={1} className="flex items-center">
                    {renderPrice('unit')}
                </GridItem>
                <GridItem
                    colSpan={1}
                    className="flex items-center justify-center"
                >
                    <Text>{item.quantity}</Text>
                </GridItem>
                <GridItem colSpan={2} className="flex items-center justify-end">
                    {renderPrice('total')}
                </GridItem>
            </Grid>
            <Box bg={'#fafdff'} px={7} py={5}>
                <Grid templateColumns="repeat(12, 1fr)" gap={5}>
                    <GridItem colSpan={4} className="flex items-center">
                        <Box className="mr-2">{renderTranslate('message')}</Box>
                        <Input placeholder="Note for seller" />
                    </GridItem>
                    <GridItem colSpan={1}></GridItem>
                    <GridItem colSpan={3}>Đơn vị vận chuyển:</GridItem>
                    <GridItem colSpan={1}>Nhanh</GridItem>
                    <GridItem colSpan={1}>thay doi</GridItem>
                    <GridItem colSpan={2} className="text-right">
                        ₫18.300
                    </GridItem>
                </Grid>
                <Text className="text-right">
                    Tổng số tiền (1 sản phẩm):₫98.300
                </Text>
            </Box>
        </>
    )
}
export default CheckoutItem
