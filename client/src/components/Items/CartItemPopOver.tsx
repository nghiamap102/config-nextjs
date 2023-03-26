import { ReactIcon } from '@assets/icon';
import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { ButtonPrimary } from '@components/Button';
import PopOver from '@components/PopOver';
import Translation from '@components/Translate';
import { ICartItem, ICategory } from '@redux/cart/cartModel';
import { IProductType } from '@redux/product/productModel';
import { mainColor } from '@theme/theme';
import { checkTypeSelected, renderCategory } from '@utils/helper';
import { FC, useState } from 'react';
import SelectItem from './SelectItem';



const CartItemPopOver: FC<{ item: ICartItem, handleClosePopOver: (item: ICartItem) => void }> = ({ item, handleClosePopOver }) => {

    const [cartItem, setCartItem] = useState<ICartItem>(item)
    const [cartItemType, setCartItemType] = useState<string[]>(item.category)
    const { onOpen, onClose, isOpen } = useDisclosure()

    const handleSelectType = (productTypeItem: IProductType) => {
        const newArr = [...cartItemType];
        newArr.splice(productTypeItem.cat_group - 1, 1, productTypeItem._id);
        setCartItemType(newArr)
    }

    const handleClose = () => {
        onClose()
        setCartItem({ ...cartItem, category: cartItemType })
        handleClosePopOver({ ...cartItem, category: cartItemType })
    }
    
    const checkDisable = (title: string, catContent: string, index: number) => {
        return false
    }

    return (
        <PopOver
            isOpen={isOpen}
            closeOnEsc
            onOpen={onOpen}
            onClose={handleClose}
            popoverTrigger={(
                <Flex color={mainColor.gray2} className='items-center'>
                    <Flex className='flex-col'>
                        {cartItem.product_type?.map((productTypeItem: ICategory) => {
                            if (cartItem.category.some(item => item === productTypeItem._id)) {
                                return <Text key={productTypeItem.title} className='capitalize inline mr-1'>
                                    {productTypeItem.title}{':'} {productTypeItem.cat_content}
                                </Text>
                            }
                        })}
                    </Flex>
                    <ReactIcon.IconVsc.VscTriangleDown className='ml-2' />
                </Flex>
            )}
            popoverBody={(
                <Box p={4} maxW={500}>
                    {renderCategory(cartItem.product_type)?.map((type) => (
                        <Box className='my-2' key={type.cat_content}>
                            <Text className='mb-3 capitalize'>  {type.title}</Text>
                            {cartItem.product_type?.map((productTypeItem) => {
                                if (type.title === productTypeItem.title)
                                    return (
                                        <SelectItem
                                            key={productTypeItem.cat_content}
                                            selected={checkTypeSelected(cartItemType, productTypeItem)}
                                            mx={2} my={2}
                                            onSelect={() => handleSelectType(productTypeItem)}
                                        >
                                            {productTypeItem.cat_content}
                                        </SelectItem>
                                    )
                            })}
                        </Box>
                    ))}

                </Box>
            )}
            popoverFooter={(
                <Flex className='items-center justify-end' p={4}>
                    <Button
                        bg={mainColor.white}
                        color={mainColor.orange}
                        border={`1px solid ${mainColor.orange}`}
                        _hover={{ opacity: 0.8 }}
                        className='capitalize mx-1'
                        onClick={handleClose}
                    >
                        <Translation text='cancel' />
                    </Button>
                    <ButtonPrimary mx={1} onClick={handleClose}>
                        <Translation text='apply' />
                    </ButtonPrimary>
                </Flex >
            )}
        />
    )
}

export default CartItemPopOver
