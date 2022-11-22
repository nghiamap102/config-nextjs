import { Box, Link } from "@chakra-ui/react";
import Image, { StaticImageData } from "next/image";

type BannerImageProps = {
    imageSrc: string | StaticImageData
    alt: string
    linkTo: string
    blank?: boolean
};
const BannerImage: React.FC<BannerImageProps> = ({
    imageSrc,
    alt,
    linkTo,
    blank,
}) => {
    return (
        <Link href={linkTo} target={`${blank && '_blank'}`}>
            <Box w={'82%'} margin={'auto'} className='flex py-10 items-center justify-center'>
                <Image src={imageSrc} alt={alt} />
            </Box>
        </Link>
    );
};


export default BannerImage