import { ImageAssets } from '@assets/index'
import { Flex } from '@chakra-ui/react'
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
                <Flex
                    className='items-center'
                    bg={mainColor.white}
                    borderRadius="full"
                    p={5}
                    marginBottom={5}
                >
                    <Image src={image || ImageAssets.Categories1} alt={name}
                        height={80}
                        width={80}
                    />
                </Flex>
                <Translation text={name} className='capitalize text-xl' />
            </Flex>
        </Link>
    )
}
export default CategoriesCard
