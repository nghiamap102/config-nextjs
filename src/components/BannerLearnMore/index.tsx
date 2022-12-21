import { Box, Button, SystemStyleObject, Text } from "@chakra-ui/react";
import { mainColor } from "@theme/theme";
import Link from "next/link";
import { FC } from 'react'

type BannerLearnMoreProps = {
    icon?: any
    text: string
    linkTo: string
    style?: SystemStyleObject
};
const BannerLearnMore: FC<BannerLearnMoreProps> = ({
    icon,
    text,
    linkTo,
    style
}) => {
    return (
        <Box
            className="flex justify-center items-center"
            sx={style}
        >
            {icon}
            <Text fontSize='md' textTransform={'uppercase'} marginX={5} >{text}</Text>
            <Link href={linkTo}>
                <Button textDecoration={'none'} textTransform={'uppercase'} bg={mainColor.orange} color={mainColor.white} _hover={{ bg: mainColor.hotTag }} variant='ghost'>
                    learn more
                </Button>
            </Link>
        </Box>
    );
};

export default BannerLearnMore;