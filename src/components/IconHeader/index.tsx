import { Box, Link } from "@chakra-ui/react";
import { mainColor } from "@theme/theme";
import { FC, useState } from "react";


type IconHeaderProps = {
    text?: string
    icon?: any
    colorIcon?: string
    colorText?: string
    children?: any
    linkTo?: string
    onClick?: () => void
};

export const IconHeader: FC<IconHeaderProps> = ({
    text,
    icon,
    colorIcon,
    colorText,
    children,
    linkTo,
    onClick,
}) => {

    const [active, setActive] = useState(false)

    return (
        <Link
            onClick={onClick}
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
            href={linkTo}
        >
            <Box
                className="flex flex-col justify-center items-center cursor-pointer mx-3"
                color={colorIcon ? colorIcon : mainColor.orange}
            >
                <Box display='flex' className={`${active && 'icon-animate'}`}>
                    {icon}
                </Box>
                {text && <Box className="capitalize mx-2" color={colorText ? colorText : mainColor.white} >{text}</Box>}
                {children}
            </Box>
        </Link>
    );
};

export default IconHeader 