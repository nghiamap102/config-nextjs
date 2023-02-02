import { ReactIcon } from '@assets/icon'
import { NoImage } from '@assets/image'
import { Box, Checkbox, Grid, GridItem, Text } from '@chakra-ui/react'
import UiNumberInputControl from '@components/Field/UiNumberInputControl'
import Translation from '@components/Translate'
import { ICartItem } from '@redux/cart/cartModel'
import { useAppDispatch } from '@redux/hooks'
import { mainColor } from '@theme/theme'
import { formatCurrency, formatValueCurrency } from '@utils/helper'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC } from 'react'

type CartDrawerItemProps = {
    item?: ICartItem
    onChangeCheck?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onRemoveItem?: () => void
}

const CartDrawerItem: FC<CartDrawerItemProps> = ({ item, onChangeCheck, onRemoveItem }) => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const handleChangeQuantity = (value: string) => {
        // renderSample().sampleItem.count_in_stock === parseInt(value) && toast({ title: `There's only ${renderSample().sampleItem.count_in_stock} items left`, status: 'info' })
        // dispatch(updateCartItem({ ...item, quantity: parseInt(value) }))
    }

    return (
        <Grid
            templateColumns={'repeat(24,1fr)'}
            className="items-center relative my-3"
        >
            <GridItem colSpan={1} className="flex items-center">
                <Checkbox onChange={onChangeCheck} />
            </GridItem>

            <GridItem
                border={`1px solid ${mainColor.gray}`}
                padding={5}
                colSpan={5}
                mx="3"
            >
                <Image
                    src={NoImage}
                    // src={renderSample()?.sample.image || NoImage}
                    // alt={item.product.name}
                    alt={'a'}
                    height={150}
                    width={150}
                />
            </GridItem>

            <GridItem colSpan={11}>
                <Text>{item?.product?.name}</Text>
                <Translation
                    formatTranslate={{
                        value: formatValueCurrency(router.locale, item?.type?.unit_price || 0),
                        formatParams: {
                            value: {
                                currency: formatCurrency(router.locale),
                                locale: router.locale,
                            },
                        },
                    }}
                    text={'price'}
                />
            </GridItem>

            <GridItem colSpan={6} className="flex items-center flex-col mx-2">
                <UiNumberInputControl value={1} onChange={handleChangeQuantity} />
                <Box className="absolute bottom-0 right-10"></Box>
            </GridItem>
            <GridItem
                colSpan={1}
                className="flex items-center justify-center ml-2 cursor-pointer"
                onClick={onRemoveItem}
            >
                <ReactIcon.IconAi.AiOutlineClose />
            </GridItem>
        </Grid>
    )
}

export default CartDrawerItem
