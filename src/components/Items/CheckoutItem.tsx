import { NoImage } from '@assets/image'
import { Box, Flex, Grid, GridItem, Input, Text } from '@chakra-ui/react'
import { RenderPrice } from '@components/Card/ProductCard'
import Translation from '@components/Translate'
import { ICartItem } from '@redux/cart/cartModel'
import { ResCheckout } from '@redux/checkout/checkoutModel'
import { mainColor } from '@theme/theme'
import { debounce } from 'lodash'
import Image from 'next/image'
import { FC } from 'react'

type CheckoutItemProps = {
    item: ResCheckout
    handleChangeDescription: (item: ICartItem, value: string) => void
}
const CheckoutItem: FC<CheckoutItemProps> = ({
    item,
    handleChangeDescription,
}) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChangeDescription(item, e.target.value)
    }

    return (
        <>
            <Grid templateColumns="repeat(12, 1fr)" px={7} py={5}>
                <GridItem colSpan={12} className="flex py-3">
                    shop name
                </GridItem>
                <GridItem colSpan={5} className="flex items-center">
                    <Image
                        src={item.product_sample?.image || NoImage}
                        alt={item?.product?.name}
                        height={70}
                        width={70}
                    />

                    <Text className="ml-3">{item.product?.name}</Text>
                </GridItem>
                <GridItem colSpan={3} color={mainColor.gray2} className='flex items-center'>
                    <Flex>
                        {item.product_sample?.product_type?.map((itemType: any) => (
                            <Box key={itemType.title} className='mr-2'>
                                <Text className='capitalize inline mr-2'>{itemType.title}{':'}</Text>
                                <Text className='capitalize inline'>{itemType.cat_content}</Text>
                            </Box>
                        ))}
                    </Flex>
                </GridItem>
                <GridItem colSpan={1} className="flex items-center">
                    <RenderPrice price={item.product_sample?.unit_price || 0} color={mainColor.gray1} />
                </GridItem>
                <GridItem
                    colSpan={1}
                    className="flex items-center justify-center"
                >
                    <Text>{item.quantity}</Text>
                </GridItem>
                <GridItem colSpan={2} className="flex items-center justify-end">
                    <RenderPrice
                        price={item.product_sample?.unit_price && item.quantity && item.product_sample?.unit_price * item.quantity || 0}
                        color={mainColor.red}
                    />
                </GridItem>
            </Grid>
            <Box bg={'#fafdff'} px={7} py={5}>
                <Grid templateColumns="repeat(12, 1fr)" gap={5} py={3}>
                    <GridItem colSpan={4} className="flex items-center">
                        <Box className="mr-2">
                            <Translation
                                className="capitalize inline mr-2"
                                text={'message'}
                            />
                        </Box>
                        <Input placeholder="Note for seller" onChange={debounce(handleChange, 500)} />
                    </GridItem>
                    <GridItem colSpan={8}>
                        <Grid templateColumns="repeat(12, 1fr)" gap={5} py={3}>
                            <GridItem colSpan={1}></GridItem>
                            <GridItem colSpan={3}>Đơn vị vận chuyển:</GridItem>
                            <GridItem colSpan={2}>Nhanh</GridItem>
                            <GridItem colSpan={2}>thay doi</GridItem>
                            <GridItem colSpan={4} className="text-right">
                                ₫18.300
                            </GridItem>
                        </Grid>
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
