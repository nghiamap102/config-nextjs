import { ReactIcon } from '@assets/icon'
import { BoxProps, Flex, Text } from '@chakra-ui/react'
import { mainColor } from '@theme/theme'
import { renderElementUpOnThousand } from '@utils/helper'
import { FC } from 'react'
import Rating from 'react-rating'

type SimpleRatingProps = {
    direction?: 'vertical' | 'horizon'
    value?: number
    count?: number
    starSize?: number
    readonly?: boolean
} & BoxProps

const SimpleRating: FC<SimpleRatingProps> = ({ value, count, starSize, readonly = true, ...props }) => {

    return (
        <Flex className='relative' {...props}>
            <Rating
                readonly={readonly}
                initialRating={value}
                fullSymbol={<ReactIcon.IconAi.AiTwotoneStar color={mainColor.orange} size={starSize || '1.5rem'} />}
                emptySymbol={<ReactIcon.IconAi.AiTwotoneStar color={mainColor.gray2} size={starSize || '1.5rem'} />}
            />
            {count !== undefined && <Flex className='items-center ml-2' color={mainColor.gray1}>
                <Text className='inline text-sm'>({renderElementUpOnThousand(count)})</Text>
            </Flex>
            }

        </Flex>
    )
}

export default SimpleRating
