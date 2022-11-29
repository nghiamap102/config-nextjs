import { Box, Link } from "@chakra-ui/react";
import Image, { StaticImageData } from "next/image";
import { FC } from 'react'

type BannerImageProps = {
    imageSrc: string | StaticImageData
    alt: string
    linkTo: string
    blank?: boolean
};
const BannerImage: FC<BannerImageProps> = ({
    imageSrc,
    alt,
    linkTo,
    blank,
}) => {
    return (
        <Link href={linkTo} target={`${blank && '_blank'}`} >
            <Box margin={'auto'} className='2xl:w-5/6 flex py-10 items-center justify-center'>
                <Image src={imageSrc} alt={alt} />
            </Box>
        </Link>
    );
};


export default BannerImage