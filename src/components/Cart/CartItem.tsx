import { ReactIcon } from "@assets/icon";
import { NoImage } from "@assets/image";
import { Box, Checkbox, Grid, GridItem, Text, useNumberInput } from "@chakra-ui/react";
import UiNumberInputControl from "@components/Field/UiNumberInputControl";
import Translation from "@components/Translate";
import { ICartItem } from "@redux/cart/cartModel";
import { mainColor } from "@theme/theme";
import { formatCurrency, formatValueCurrency } from "@utils/helper";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";

type CartItemProps = {
    item: ICartItem
    onClickCheck?: () => void
    onRemoveItem?: () => void
};

const CartItem: FC<CartItemProps> = ({ item, onClickCheck, onRemoveItem }) => {
    const numberInput = useNumberInput({ step: 1, defaultValue: 1, min: 1, precision: 0, })
    const router = useRouter()
    return (
        <Grid templateColumns={'repeat(24,1fr)'} className='items-center relative'>
            <GridItem colSpan={1} className='flex items-center'>
                <Checkbox onClick={onClickCheck} />
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