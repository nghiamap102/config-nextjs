import { Box } from '@chakra-ui/react'
import { mainColor } from '@theme/theme'
import { FC, useState } from 'react'

type IconHeaderProps = {
    text?: string
    icon?: any
    colorIcon?: string
    colorText?: string
    children?: any
    onClick?: () => void
}

export const IconHeader: FC<IconHeaderProps> = ({
    text,
    icon,
    colorIcon,
    colorText,
    children,
    onClick,
}) => {
    const [active, setActive] = useState(false)

    return (
        <Box
            className="flex lg:flex-col md:flex-row justify-center items-center cursor-pointer mx-3 relative"
            color={colorIcon ? colorIcon : mainColor.orange}
            onClick={onClick}
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
        >
            <Box className={`${active && 'icon-animate'}`}>
                {icon}
            </Box>
            {text && (
                <Box
                    className="capitalize mx-2"
                    color={colorText ? colorText : mainColor.white}
                >
                    {text}
                </Box>
            )}
            {children}
        </Box>
    )
}

export default IconHeader
