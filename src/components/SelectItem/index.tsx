import { ReactIcon } from '@assets/icon'
import { Box } from '@chakra-ui/react'
import { mainColor } from '@theme/theme'
import { FC, useState } from 'react'

type SelectItemProps = {
    children?: any
    onSelect?: () => void
}
const SelectItem: FC<SelectItemProps> = ({ children, onSelect }) => {
    const [active, setActive] = useState(false)

    const handleSelect = () => {
        setActive(true)
        onSelect
    }

    return (
        <Box
            className="cursor-pointer relative"
            onClick={handleSelect}
            border={`1px solid ${active ? mainColor.orange : mainColor.white}`}
        >
            {children}
            <Box className="absolute bottom-0 right-0" borderTopLeftRadius="sm">
                <ReactIcon.IconBs.BsCheck size={'sm'} />
            </Box>
        </Box>
    )
}

export default SelectItem
