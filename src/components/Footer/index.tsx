import { ImageAssets } from "@assets/index";
import { Box, Container, Flex, Text } from "@chakra-ui/react";
import BrandsLogo from "@components/BrandsLogo";
import { mainColor } from "@theme/theme";
import Image from "next/image";
import { FC } from "react";

const Footer: FC = () => {
    return (
        <Container bg={mainColor.white} p={5}>
            <Flex className="justify-between items-center">
                <Box>
                    <Text>© 2022 Ella Demo. All Rights Reserved. Powered By Nghiaht</Text>
                </Box>
                <Flex>
                    {Array(4).fill(null).map((ele, index) =>
                        <BrandsLogo key={index} className='mx-2 px-2 py-1 rounded-none' border={`1px solid ${mainColor.gray}`} >
                            <Image src={ImageAssets.ShopifyLogo} alt="logo" height={50} width={80} />
                        </BrandsLogo>
                    )}
                </Flex>
            </Flex>
        </Container>
    );
};

export default Footer