import { ReactIcon } from '@assets/icon'
import { Box, Button, ButtonProps } from '@chakra-ui/react'
import { mainColor } from '@theme/theme'
import { FC } from 'react'

type SelectItemProps = {
    children?: any
    onSelect?: () => void
    selected?: boolean
} & ButtonProps

const SelectItem: FC<SelectItemProps> = ({ children, onSelect, selected, ...props }) => {
    return (
        <Button
            className="cursor-pointer relative px-4 py-2 capitalize"
            onClick={onSelect}
            border={`1px solid ${selected ? mainColor.orange : mainColor.gray2}`}
            bg={'transparent'}
            {...props}
        >
            {children}
            {selected &&
                <Box className="absolute top-0 right-0" bg={mainColor.orange} color={mainColor.white} borderBottomLeftRadius={'2xl'}>
                    <ReactIcon.IconBs.BsCheck size='1rem' />
                </Box>
            }
        </Button>
    )
}

export default SelectItem
