import { Flex, Link } from "@chakra-ui/react";
import { mainColor } from "@theme/theme";
import Image from "next/image";
import { FC } from "react";

type BrandsLogoProps = {
    linkTo?: string
    imageSrc: any
};
const BrandsLogo: FC<BrandsLogoProps> = ({
    linkTo,
    imageSrc,
}) => {
    return (
        <Link href={linkTo}>
            <Flex borderRadius={20} bg={mainColor.white} justifyContent='center' alignItems='center' >
                <Image src={imageSrc} alt="logo" height={80} width={150} />
            </Flex>
        </Link>
    );
};

export default BrandsLogo