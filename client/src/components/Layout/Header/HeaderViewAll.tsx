import { Box, Flex, Heading } from '@chakra-ui/react'
import Translation from '@components/Translate'
import Link from 'next/link'
import { FC } from 'react'

type HeaderViewAllProps = {
    title: string
    LinkTo: string
}
export const HeaderViewAll: FC<HeaderViewAllProps> = ({ title, LinkTo }) => {
    return (
        <Flex mb={10} alignItems="flex-end">
            <Heading className="capitalize" fontSize="1.5rem">
                {title}
            </Heading>
            <Link href={LinkTo}>
                <Box
                    className='ml-10 link'
                    borderBottom="1px solid"
                >
                    <Translation text='view_all' firstCapital/>
                </Box>
            </Link>
        </Flex>
    )
}
