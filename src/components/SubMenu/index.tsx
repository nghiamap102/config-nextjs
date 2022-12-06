import { IconAssets } from "@assets/index";
import { Box, Text } from "@chakra-ui/react";
import { isNonEmptyArray } from "@utils/validations";
import { FC } from "react";

type SubMenuProps = {
    text?: string
    icon?: any
    childItem?: any[]
    handleMouseEnter?: any
    onClick?: () => void
};

const SubMenu: FC<SubMenuProps> = ({
    text,
    icon,
    handleMouseEnter,
    childItem,
    onClick,
}) => {

    return (
        <Box
            className="submenu cursor-pointer px-8 py-1.5 flex items-center justify-between"
            onMouseEnter={handleMouseEnter}
            onClick={() => isNonEmptyArray(childItem) && onClick}
        >
            <Box display={'flex'}>
                {icon}
                <Text marginLeft={5}>{text}</Text>
            </Box>

            <IconAssets.ReactIcon.IconMd.MdKeyboardArrowRight />
            {/* {childItem?.map((ele) => (
                
            ))} */}
        </Box>
    );
};

export default SubMenu