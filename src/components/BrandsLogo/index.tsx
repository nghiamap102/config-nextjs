import { Flex, FlexProps } from '@chakra-ui/react'
import { mainColor } from '@theme/theme'
import Link from 'next/link'
import { FC } from 'react'

type BrandsLogoProps = {
    linkTo: string
    children?: any
} & FlexProps
const BrandsLogo: FC<BrandsLogoProps> = ({ linkTo, children, ...props }) => {
    return (
        <Link href={linkTo}>
            <Flex
                {...props}
                borderRadius={20}
                bg={mainColor.white}
                justifyContent="center"
                alignItems="center"
            >
                {children}
            </Flex>
        </Link>
    )
}

export default BrandsLogo
