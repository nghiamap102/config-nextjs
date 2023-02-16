import { ReactIcon } from '@assets/icon'
import { NoImage } from '@assets/image'
import { Checkbox, Grid, GridItem, Text } from '@chakra-ui/react'
import UiNumberInputControl from '@components/Field/UiNumberInputControl'
import CustomToast from '@components/Toast'
import Translation from '@components/Translate'
import { ICartItem } from '@redux/cart/cartModel'
import { removeCartItem, updateCartItem } from '@redux/cart/cartSlice'
import { useAppDispatch } from '@redux/hooks'
import { mainColor } from '@theme/theme'
import { formatCurrency, formatValueCurrency } from '@utils/helper'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC } from 'react'

type CartDrawerItemProps = {
    item: ICartItem
}

const CartDrawerItem: FC<CartDrawerItemProps> = ({ item }) => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const toast = CustomToast()

    const handleChangeQuantity = (value: string) => {
        item?.product_sample.count_in_stock === parseInt(value) && toast({ title: `There's only ${item?.product_sample.count_in_stock} items left`, status: 'info' })
        dispatch(updateCartItem({ ...item, quantity: parseInt(value) }))
    }

    const handleSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            dispatch(updateCartItem({ ...item, checked: true }))
        } else (
            dispatch(updateCartItem({ ...item, checked: false }))
        )
    }

    const handleDelItem = (item: ICartItem) => {
        dispatch(removeCartItem(item))
    }

    return (
        <Grid
            templateColumns={'repeat(24,1fr)'}
            className="items-center relative my-3"
        >
            <GridItem colSpan={1} className="flex items-center">
                <Checkbox onChange={handleSelected} />
            </GridItem>

            <GridItem
                border={`1px solid ${mainColor.gray}`}
                padding={5}
                colSpan={5}
                mx="3"
            >
                <Image
                    src={item?.product_sample?.image || NoImage}
                    alt="CartDrawerItem"
                    height={150}
                    width={150}
                />
            </GridItem>

            <GridItem colSpan={11}>
                <Text>{item?.product?.name}</Text>
                <Translation
                    formatTranslate={{
                        value: formatValueCurrency(router.locale, item?.product_sample?.unit_price || 0),
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
                <UiNumberInputControl value={item.quantity || 1} onChange={handleChangeQuantity} max={item.product_sample?.count_in_stock} />
                {item?.product_sample?.count_in_stock < 10 &&
                    <Text className='text-sm mt-2' color={mainColor.red}>{item?.product_sample?.unit_price} remain</Text>
                }
            </GridItem>
            <GridItem
                colSpan={1}
                className="flex items-center justify-center ml-2 cursor-pointer"
                onClick={() => handleDelItem(item)}
            >
                <ReactIcon.IconAi.AiOutlineClose />
            </GridItem>
        </Grid>
    )
}

export default CartDrawerItem
