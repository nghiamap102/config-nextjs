import { Box } from "@chakra-ui/react";
import Image, { StaticImageData } from "next/image";

type BannerImageProps = {
    imageSrc: string | StaticImageData
    alt: string
};
const BannerImage: React.FC<BannerImageProps> = ({
    imageSrc,
    alt,
}) => {
    return (
        <Box className='flex py-10 items-center justify-center'>
            <Image src={imageSrc} alt={alt} />
        </Box>
    );
};


export default BannerImage