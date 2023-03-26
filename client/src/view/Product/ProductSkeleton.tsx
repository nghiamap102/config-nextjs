import { ReactIcon } from '@assets/icon';
import { ImageAssets } from '@assets/index';
import { Box, Flex, Grid, GridItem, Skeleton } from "@chakra-ui/react";
import { ButtonPrimary } from '@components/Button';
import { RenderPrice } from '@components/Card/ProductCard';
import Carousel from '@components/Carousel';
import UiNumberInputControl from '@components/Field/UiNumberInputControl';
import IconButtonPrimary from '@components/IconButtonPrimary';
import SelectItem from '@components/Items/SelectItem';
import PopOver from '@components/PopOver';
import SimpleRating from '@components/Rating';
import Translation from '@components/Translate';
import { mainColor } from '@theme/theme';
import { renderCategory } from '@utils/helper';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { SwiperSlide } from 'swiper/react';


const ProductSkeleton: FC = (props: Props) => {
    return (
        <Flex w='full' minH={500}>
            <Flex w='45%' mr={12} >
                <Skeleton height={600} width='100%' />
            </Flex>

            <Box w='50%'>
                <Skeleton height={5} my={2} width='50%' />

                <Skeleton height={5} my={2} width='30%' />

                <Grid templateColumns='repeat(12,1fr)' gridGap={3}>
                    <GridItem colSpan={3}><Translation text='shipping_method' className='capitalize text-md' color={mainColor.gray3} /></GridItem>
                    <GridItem colSpan={9}>
                        <Flex mb={3}>
                            <ReactIcon.IconFa.FaTruckMoving color={mainColor.saleTag} size='1.5rem' className='mr-4' />
                            <Box>
                                <Translation text='free_ship' />
                                <Translation text='Miễn phí vận chuyển cho đơn hàng trên ₫99.000' />
                            </Box>
                        </Flex>
                        <Flex mb={3}>
                            
                        </Flex>
                    </GridItem>

                </Grid>

                <Grid templateColumns='repeat(12,1fr)' gridGap={3} my={5}>

                    <GridItem colSpan={3}>
                        <Translation text='quantity' className='capitalize text-lg' color={mainColor.gray3} />
                    </GridItem>

                    <GridItem colSpan={9}>
                        <Box maxW='40%'>
                        </Box>
                    </GridItem>
                </Grid>


                <Flex>
                </Flex>

            </Box>
        </Flex>
    );
};

export default ProductSkeleton