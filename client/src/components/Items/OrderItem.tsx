import { ReactIcon } from '@assets/icon';
import { NoImage } from '@assets/image';
import { Box, Button, Flex, Text, Tooltip } from '@chakra-ui/react';
import { RenderPrice } from '@components/Card/ProductCard';
import Tag from '@components/Tag';
import Translation from '@components/Translate';
import { mainColor } from '@theme/theme';
import Image from 'next/image';
import { FC } from 'react'

type OrderItemProps = {
    abc?: any
};
export const OrderItem: FC<OrderItemProps> = ({ abc }) => {
    console.log(abc)
    return (
        <Box>
            <Flex className='items-center justify-between'>
                <Flex className='items-center'>
                    <Tag bg={mainColor.orange} px={2} fontSize='sm' >
                        favourite
                    </Tag>
                    <Text fontSize='md' lineHeight='normal' className='mx-2'>RATEL STORE</Text>

                    <Button size='xs' bg={mainColor.red3} borderRadius='none' className='' color={mainColor.white} _hover={{ opacity: 0.7 }}>
                        <Translation text='chat' />
                        <ReactIcon.IconBi.BiChat />
                    </Button>
                </Flex>
                <Flex>
                    <ReactIcon.IconRi.RiTruckLine />
                    {/* status */}
                    đơn hàng đã giao thành công
                    <Tooltip >
                        <ReactIcon.IconAi.AiOutlineQuestionCircle />
                    </Tooltip>
                </Flex>
            </Flex>
            <Flex>
                <Flex className='flex-1'>
                    <Image src={NoImage} alt='abc' height={80} width={80} />
                </Flex>
                <Text><RenderPrice price={60} /></Text>
            </Flex>
        </Box>
    );
};

export default OrderItem