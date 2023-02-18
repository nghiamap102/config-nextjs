import { NoImage } from '@assets/image'
import { ImageAssets } from '@assets/index'
import { Box, Flex, Text } from '@chakra-ui/react'
import Translation from '@components/Translate'
import { mainColor } from '@theme/theme'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

type CategoriesCardProps = {
    link: string
    name: string
    image: string
}
const CategoriesCard: FC<CategoriesCardProps> = ({ link, name, image }) => {
    return (
        <Link href={link}>
            <Flex direction="column" alignItems={'center'}>
                <Box
                    bg={mainColor.white}
                    borderRadius="full"
                    marginBottom={5}
                >
                    <Image src={image || ImageAssets.Categories1} alt={name} height={120} width={120}/>
                </Box>
                <Translation text={name} className='capitalize text-xl'/>
            </Flex>
        </Link>
    )
}
export default CategoriesCard
