import { ImagePNG } from "@assets/index";
import { Box } from "@chakra-ui/react";
import BannerAdsHorizon from "@components/MainContent/BannerAdsHorizon";
import { mainColor } from "@theme/theme";
import Image from "next/image";
import React from "react";
import CategoriesBanner from "./CategoriesBanner";

type MainContentProps = {

};
const MainContent: React.FC<MainContentProps> = ({

}) => {
    return (
        <Box bg={mainColor.gray} height='100%' width='100%'>
            <BannerAdsHorizon
                style={{ paddingY: '1.5rem' }}
                text="buy now, pay later starting at 0% APR"
                icon={<Image src={ImagePNG.BannerAds} alt='abc' />}
            />
            <CategoriesBanner/>
        </Box>
    );
};


export default MainContent