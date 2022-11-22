import { ImagePNG } from "@assets/index";
import { Box, Grid, GridItem, Link, Text } from "@chakra-ui/react";
import { mainColor } from "@theme/theme";
import Image from "next/image";
import React from "react";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from './Categories.module.css';

type CategoriesProps = {

};
const Categories: React.FC<CategoriesProps> = ({

}) => {

    return (
        <Box margin='auto'>
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
                    <Grid
                        templateColumns='repeat(12, 1fr)'
                        gap={2}
                    >
                        <GridItem colSpan={7}>
                            <Swiper

                                // onMouseEnter={}
                                className="cursor-pointer"
                                spaceBetween={30}
                                centeredSlides={true}
                                slidesPerView={"auto"}
                                autoplay={{
                                    delay: 250000,
                                    disableOnInteraction: false,
                                }}
                                pagination={{
                                    clickable: true,
                                    bulletClass: `swiper-pagination-bullet ${styles.bullet}`,
                                    bulletActiveClass: `swiper-pagination-bullet-active ${styles.active}`
                                }}
                                navigation={{
                                    enabled: true,
                                }}
                                modules={[Autoplay, Pagination, Navigation]}

                            >
                                {Array(4).fill(null).map((ele, index) => (
                                    <SwiperSlide key={index}><Image src={ImagePNG.Home1} alt='abc' width={800}/></SwiperSlide>
                                ))}
                            </Swiper>
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
        </Box>
    );
};

export default Categories