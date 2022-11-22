import { ImagePNG } from "@assets/index";
import { Box, Flex, Heading, Link } from "@chakra-ui/react";
import BannerImage from "@components/BannerImage";
import BannerLearnMore from "@components/BannerLearnMore";
import Header from "@components/Header";
import { mainColor } from "@theme/theme";
import Image from "next/image";
import React from "react";
import Categories from "../../components/Categories";

type HomePageProps = {

};
const HomePage: React.FC<HomePageProps> = ({

}) => {

    return (
        <Box bg={mainColor.gray} height='100%' width='100%' paddingBottom={50}>
            <Header />
            <BannerLearnMore
                style={{ paddingY: '1.5rem' }}
                text="buy now, pay later starting at 0% APR"
                icon={<Image src={ImagePNG.BannerAds} alt='abc' />}
            />
            <Categories />

            <BannerImage imageSrc={ImagePNG.BannerSale} alt='banner sale' linkTo="abc" />

            <Box marginY={10}>
                <Flex w={'85%'} margin={'auto'} alignItems='flex-end'>
                    <Heading className="capitalize" fontSize='2rem'>shop by categories</Heading>
                    <Link href="abc" marginLeft={10} textDecoration='underline' textTransform={'capitalize'}>see all</Link>
                </Flex>
            </Box>
        </Box>
    );
};




export default HomePage