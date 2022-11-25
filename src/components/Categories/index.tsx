import { ImagePNG } from "@assets/index";
import { Box, Container, Grid, GridItem, Link, Text } from "@chakra-ui/react";
import { mainColor } from "@theme/theme";
import Image from "next/image";
import React from "react";
import { SwiperSlide } from 'swiper/react';

import Carousel from "@components/Carousel";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type CategoriesProps = {

};
const Categories: React.FC<CategoriesProps> = ({

}) => {

    return (
        <Container margin='auto' className=''>
            <Grid
                templateColumns='repeat(15, 1fr)'
                paddingX={4}
                gap={2}
            >
                <GridItem
                    bg={mainColor.white}
                    className="panel-box-shadow px-4 pt-6 rounded-xl"
                    colSpan={3}
                >
                    <Box borderBottom={`2px solid ${mainColor.orange}`}>
                        <Text bg={mainColor.orange} className='uppercase font-semibold inline-block px-6 py-2 rounded-t-lg tracking-wider' fontSize={'md'} color={mainColor.white}>shop by categories</Text>
                    </Box>
                    <Grid templateColumns='repeat(2 , 1fr)' bg={mainColor.gray} gap={0.4}>
                        {Array(12).fill(null).map((ele, index) => (
                            <GridItem key={index} bg={mainColor.white}>
                                <Link className="flex justify-between items-center flex-col py-3" >
                                    <Image src={ImagePNG.Sports} alt='abc' height={24} width={24} />
                                    <Text lineHeight='2rem' className="capitalize mt-2">sports</Text>
                                </Link>
                            </GridItem>
                        ))}
                    </Grid>
                </GridItem>

                <GridItem colSpan={12}>
                    <Grid templateColumns='repeat(12, 1fr)' gap={2}>
                        <GridItem colSpan={7}>
                            <Carousel pagination navigation>
                                {Array(4).fill(null).map((ele, index) => (
                                    <SwiperSlide key={index}><Image src={ImagePNG.Home1} alt='abc' width={800} /></SwiperSlide>
                                ))}
                            </Carousel>
                        </GridItem>

                        <GridItem colSpan={5}>
                            <Grid templateColumns='repeat(2,1fr)' gap={2}>
                                {Array(4).fill(null).map((ele, index) => (
                                    <GridItem colSpan={1} key={index}>
                                        <Image src={ImagePNG.Banner1} alt='banner' />
                                    </GridItem>
                                ))}
                            </Grid>
                        </GridItem>
                    </Grid>
                </GridItem>
            </Grid>
        </Container>
    );
};

export default Categories