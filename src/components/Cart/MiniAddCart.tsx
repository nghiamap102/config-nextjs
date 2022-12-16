import { IconAssets } from "@assets/index";
import { Box, Flex } from "@chakra-ui/react";
import ButtonCircle from "@components/ButtonCircle";
import ButtonPrimary from "@components/ButtonPrimary";
import Translation from "@components/Translate";
import { ICartItem } from "@redux/cart/cartModel";
import { addToCart } from "@redux/cart/cartSlice";
import { useAppDispatch } from "@redux/hooks";
import { IProductItem } from "@redux/product/productModel";
import { mainColor } from "@theme/theme";
import { isNonEmptyString } from "@utils/validations";
import classNames from "classnames";
import { FC, useState } from "react";

type MiniAddCartProps = {
    product: IProductItem
    cartItem: ICartItem
    title?: string
    isOpen?: boolean
    onClose?: () => void
}

const MiniAddCart: FC<MiniAddCartProps> = ({
    product,
    cartItem,
    title,
    isOpen,
    onClose,
}) => {

    const dispatch = useAppDispatch()
    const [cartItemInit, setCartItemInit] = useState<ICartItem>(cartItem)

    const handleChooseColor = (color: string) => {
        setCartItemInit({ ...cartItem, type: { color: color } })
    }

    const handleChooseSize = (size: string) => {
        setCartItemInit({ ...cartItem, type: { size: size } })
    }

    console.log(cartItemInit);
    return (
        <>
            <Box className={classNames(isOpen ? 'slide-up' : 'slide-down', 'absolute bottom-0 left-0 w-full p-7')} bg={mainColor.white} >

                <Flex className="justify-between">
                    <Box> <Translation text={isNonEmptyString(title)} type={['product']} /></Box>
                    <IconAssets.ReactIcon.IconIo.IoMdClose onClick={onClose} />
                </Flex>

                {product.sample?.map((product) => (
                    <Box key={product.size} border={`1px solid ${mainColor.gray}`}
                        className='inline px-4 py-1 cursor-pointer'
                        bg={cartItemInit.type.size === product.size ? mainColor.gray1 : 'transparent'}
                        color={cartItemInit.type.size === product.size ? mainColor.white : ''}
                        onClick={() => handleChooseSize(isNonEmptyString(product.size))}
                    >
                        {product.size}
                    </Box>
                ))}

                <Flex>
                    {product.sample?.map((product) => (
                        <ButtonCircle
                            key={product.color}
                            onClick={() => handleChooseColor(isNonEmptyString(product.color))}
                            label={product.color}
                            color={product.color}
                            marginX={1} marginY={4} active={cartItemInit.type.color === product.color && true} />
                    ))}

                </Flex>

                <ButtonPrimary w='100%' marginRight={4} textTransform='capitalize' onClick={() => dispatch(addToCart(cartItemInit))}>
                    <Translation text="submit" type={['product']} />
                </ButtonPrimary>
            </Box>
        </>
    );
};
export default MiniAddCart