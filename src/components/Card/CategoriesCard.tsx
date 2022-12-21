import { Box, Flex, Text } from "@chakra-ui/react";
import { mainColor } from "@theme/theme";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type CategoriesCardProps = {
    link: string
    name: string
    src: string
};
const CategoriesCard: FC<CategoriesCardProps> = ({
    link,
    name,
    src
}) => {
    return (
        <Link href={link} >
            <Flex padding={10} direction='column' alignItems={'center'}>
                <Box bg={mainColor.white} borderRadius='full' h='12rem' w='12rem' marginBottom={5}>
                    <Image src={src} alt={name} />
                </Box>
                <Text fontSize='xl' textTransform='capitalize'>{name}</Text>
            </Flex>
        </Link>
    );
};
export default CategoriesCard