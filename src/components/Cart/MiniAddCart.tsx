import { IconAssets } from "@assets/index";
import { Box, Flex, IconButton, useToast } from "@chakra-ui/react";
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
import { toastConst } from "contants/common";
import { FC, useEffect, useMemo, useState } from "react";

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
    const [cartItemInit, setCartItemInit] = useState<ICartItem>([])
    const toast = useToast({
        id: toastConst.cart,
        position: 'top',
        title: 'Add to cart success',
        isClosable: true,
        status: "success",
    })

    useEffect(() => {
        setCartItemInit(cartItem)
    }, [cartItem])

    const handleChooseColor = (color: string) => {
        setCartItemInit({ ...cartItemInit, type: { ...cartItemInit.type, color: color } })
    }

    const handleChooseSize = (size: string) => {
        setCartItemInit({ ...cartItemInit, type: { ...cartItemInit.type, size: size } })
    }
    const handleAddtoCart = () => {
        dispatch(addToCart(cartItemInit))
        !toast.isActive(toastConst.cart) && toast()
    }
    return (
        <>
            <Box className={classNames(isOpen ? 'slide-up' : 'slide-down', 'absolute bottom-0 left-0 w-full p-7')} bg={mainColor.white} >

                <Flex className="justify-between items-center my-3 mb-5">
                    <Box className="capitalize"><Translation text={isNonEmptyString(title)} type={['product']} /></Box>
                    <IconButton
                        aria-label="btn"
                        icon={<IconAssets.ReactIcon.IconIo.IoMdClose />}
                        size='sm'
                        bg={'transparent'}
                        variant='outline'
                        borderRadius={'2xl'}
                        colorScheme='gray'
                        _hover={{ color: mainColor.white, borderColor: mainColor.white, backgroundColor: mainColor.orange }}
                        onClick={onClose}
                    />
                </Flex>

                <Box className="my-3">
                    {product.sample?.map((product) => (
                        <Box key={product.size} border={`1px solid ${mainColor.gray}`}
                            className='inline px-4 py-1 cursor-pointer'
                            bg={cartItemInit?.type?.size === product.size ? mainColor.gray1 : 'transparent'}
                            color={cartItemInit?.type?.size === product.size ? mainColor.white : ''}
                            onClick={() => handleChooseSize(isNonEmptyString(product.size))}
                        >
                            {product.size}
                        </Box>
                    ))}
                </Box>

                <Flex className="my-3">
                    {product.sample?.map((product) => {
                        return <ButtonCircle
                            key={product.color}
                            onClick={() => handleChooseColor(isNonEmptyString(product.color))}
                            label={product.color}
                            color={product.color}
                            marginX={1} marginY={4}
                            active={cartItemInit?.type?.color === product.color && true}
                        />
                    })}
                </Flex>

                <ButtonPrimary w='100%' marginRight={4} textTransform='capitalize' onClick={handleAddtoCart}>
                    <Translation text="submit" type={['product']} />
                </ButtonPrimary>
            </Box>
        </>
    );
};
    export default MiniAddCart