import { Box, Flex, Text } from '@chakra-ui/react'
import Translation from '@components/Translate'
import classNames from 'classnames'
import { fillColorArrayRating, tooltipArrayRating } from 'contants/common'
import { FC } from 'react'
import { Rating } from 'react-simple-star-rating'

type SimpleRatingProps = {
    direction?: 'vertical' | 'horizon'
    value?: number
    avg?: number
}

const SimpleRating: FC<SimpleRatingProps> = ({ direction, value, avg }) => {
    return (
        <Box>
            <Rating
                SVGclassName={classNames(direction === 'horizon' && 'inline-block')}
                size={25}
                readonly
                tooltipArray={tooltipArrayRating}
                fillColorArray={fillColorArrayRating}
                initialValue={value}
            />
            <Box className='inline align-sub ml-2'>
                <Text className='inline'>{avg}</Text>
                <Translation text='rated' className='ml-2 inline' />
            </Box>
        </Box>
    )
}

export default SimpleRating
