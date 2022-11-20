import { Box, Button, Link, SystemStyleObject, Text } from "@chakra-ui/react";
import { mainColor } from "@theme/theme";

type BannerLearnMoreProps = {
    icon?: any
    text: string
    link?: string
    style?: SystemStyleObject
};
const BannerLearnMore: React.FC<BannerLearnMoreProps> = ({
    icon,
    text,
    link,
    style
}) => {
    return (
        <Box
            className="flex justify-center items-center"
            sx={style}
        >
            {icon}
            <Text fontSize='md' textTransform={'uppercase'} marginX={5} >{text}</Text>
            <Button textDecoration={'none'} textTransform={'uppercase'} bg={mainColor.orange} color={mainColor.white} _hover={{ bg: mainColor.hotTag }} variant='ghost'>
                <Link href={link} textDecoration={'none'}>
                    learn more
                </Link>
            </Button>
        </Box>
    );
};

export default BannerLearnMore;