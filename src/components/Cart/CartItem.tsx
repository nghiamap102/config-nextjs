import { ReactIcon } from "@assets/icon";
import { NoImage } from "@assets/image";
import { Box, Checkbox, Grid, GridItem, Text, useNumberInput } from "@chakra-ui/react";
import UiNumberInputControl from "@components/Field/UiNumberInputControl";
import Translation from "@components/Translate";
import { ICartItem } from "@redux/cart/cartModel";
import { selectCart, updateCartItem } from "@redux/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { mainColor } from "@theme/theme";
import { formatCurrency, formatValueCurrency } from "@utils/helper";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";

type CartItemProps = {
    item: ICartItem
    onChangeCheck?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onRemoveItem?: () => void
};

const CartItem: FC<CartItemProps> = ({ item, onChangeCheck, onRemoveItem }) => {
    const dispatch = useAppDispatch()
    const cartSelector = useAppSelector(selectCart)
    const numberInput = useNumberInput({ step: 1, defaultValue: item.quantity, min: 1, precision: 0, })
    const router = useRouter()
    useEffect(() => {
        dispatch(updateCartItem({ ...item, quantity: parseInt(numberInput.value) }))
    }, [numberInput.value])

    return (
        <Grid templateColumns={'repeat(24,1fr)'} className='items-center relative my-3'>
            <GridItem colSpan={1} className='flex items-center'>
                <Checkbox onChange={onChangeCheck} />
            </GridItem>

            <GridItem border={`1px solid ${mainColor.gray}`} padding={5} colSpan={5} mx='3'>
                <Image src={item?.product?.sample && item?.product?.sample[0].imageSrc || NoImage} alt='cartItem' height={150} width={150} />
            </GridItem>

            <GridItem colSpan={11}>
                <Text>{item.product && item.product.name}</Text>
                <Translation
                    type={['product']}
                    formatTranslate={{
                        value: formatValueCurrency(router.locale, item.product.price),
                        formatParams: {
                            value: { currency: formatCurrency(router.locale), locale: router.locale },
                        },
                    }}
                    text={'price'}
                />
            </GridItem>

            <GridItem colSpan={6} className='flex items-center flex-col mx-2'>
                <UiNumberInputControl numberInput={numberInput} />
                <Box className='absolute bottom-0 right-10'>
                </Box>
            </GridItem>
            <GridItem colSpan={1} className='flex items-center justify-center ml-2 cursor-pointer' onClick={onRemoveItem} >
                <ReactIcon.IconAi.AiOutlineClose />
            </GridItem>
        </Grid >
    );
};

export default CartItem