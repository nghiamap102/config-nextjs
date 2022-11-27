import { Box, Flex, FlexProps, Tooltip } from "@chakra-ui/react";
import { mainColor } from "@theme/theme";
import React from "react";


type ButtonCircleProps = { label: string, color: string } & FlexProps

const ButtonCircle: React.FC<ButtonCircleProps> = ({ children, label, color, ...props }) => {
    return (
        <Tooltip label={label} hasArrow placement="top" textTransform={'capitalize'}>
            <Flex padding={1} alignItems='center' borderRadius='50%' {...props} justifyContent='center' border={`1px solid ${mainColor.gray1} `}>
                <Box bg={color} borderRadius='50%' h={3.5} w={3.5}>
                    {children}
                </Box>
            </Flex>
        </Tooltip>
    );
};
export default ButtonCircle