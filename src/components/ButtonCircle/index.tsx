import { Box, Flex, FlexProps, Tooltip } from '@chakra-ui/react'
import { mainColor } from '@theme/theme'
import { FC } from 'react'

type ButtonCircleProps = {
    label?: string
    color?: string
    active?: boolean
} & FlexProps

const ButtonCircle: FC<ButtonCircleProps> = ({
    children,
    label,
    color,
    active = false,
    ...props
}) => {
    return (
        <Tooltip
            label={label}
            hasArrow
            placement="top"
            textTransform={'capitalize'}
        >
            <Flex
                padding={1}
                alignItems="center"
                borderRadius="50%"
                cursor='pointer'
                justifyContent="center"
                border={`1px solid ${mainColor.gray1} `}
                opacity={active ? 1 : 0.5}
                {...props}
            >
                <Box bg={color} borderRadius="50%" h={5} w={5}>
                    {children}
                </Box>
            </Flex>
        </Tooltip>
    )
}
export default ButtonCircle
