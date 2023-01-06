import { ReactIcon } from '@assets/icon'
import { Box, BoxProps } from '@chakra-ui/react'
import { mainColor } from '@theme/theme'
import { FC, useState } from 'react'

type SelectItemProps = {
    children?: any
    onSelect?: () => void
} & BoxProps
const SelectItem: FC<SelectItemProps> = ({ children, onSelect, ...props }) => {
    const [active, setActive] = useState(false)

    const handleSelect = () => {
        setActive(!active)
    }

    return (
        <Box
            className="cursor-pointer relative px-4 py-2 capitalize"
            onClick={handleSelect}
            border={`1px solid ${active ? mainColor.orange : mainColor.gray2}`}
            {...props}
        >
            {children}
            {active &&
                <Box className="absolute top-0 right-0" bg={mainColor.orange} color={mainColor.white} borderBottomLeftRadius={'2xl'}>
                    <ReactIcon.IconBs.BsCheck size='1rem' />
                </Box>
            }
        </Box>
    )
}

export default SelectItem
