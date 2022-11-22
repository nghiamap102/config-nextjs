import { ImagePNG } from "@assets/index";
import { Box, Container, Flex, Heading, Link } from "@chakra-ui/react";
import BannerImage from "@components/BannerImage";
import BannerLearnMore from "@components/BannerLearnMore";
import CategoriesCard from "@components/Card/CategoriesCard";
import Header from "@components/Header";
import { mainColor } from "@theme/theme";
import Image from "next/image";
import React from "react";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Categories from "../../components/Categories";

type HomePageProps = {

};
const HomePage: React.FC<HomePageProps> = ({

}) => {

    return (
        <Box bg={mainColor.gray} paddingBottom={50}>
            <Header />
            <BannerLearnMore
                style={{ paddingY: '1.5rem' }}
                text="buy now, pay later starting at 0% APR"
                icon={<Image src={ImagePNG.BannerAds} alt='abc' />}
            />
            <Categories />

            <BannerImage imageSrc={ImagePNG.BannerSale} alt='banner sale' linkTo="abc" />

            <Box marginY={10} paddingX={5}>
                <Flex margin={'auto'} alignItems='flex-end'>
                    <Heading className="capitalize" fontSize='1.5rem'>shop by categories</Heading>
                    <Link href="abc" marginLeft={10} borderBottom="1px solid" textTransform={'capitalize'}>view all</Link>
                </Flex>
                <Swiper
                    className="cursor-pointer"
                    slidesPerView={6}
                    freeMode
                    autoplay={{
                        delay: 250000,
                        disableOnInteraction: false,
                    }}
                    // navigation={{
                    //     enabled: true,
                    // }}
                    modules={[FreeMode, Pagination]}
                >
                    {Array(12).fill({
                        link: 'abc',
                        name: 'Mobile phones',
                        src: ImagePNG.Categories1
                    }).map((ele, index) => (
                        <SwiperSlide key={index}><CategoriesCard src={ele.src} name={ele.name} link={ele.name} /></SwiperSlide>
                        // <SwiperSlide key={index}><Image src={ele.src} alt={ele.name} /></SwiperSlide>
                    ))}
                </Swiper>
            </Box>
        </Box>
    );
};




export default HomePage