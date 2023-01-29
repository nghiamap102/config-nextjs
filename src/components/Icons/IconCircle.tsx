import { ReactIcon } from "@assets/icon";
import { Flex, FlexProps } from "@chakra-ui/react";
import { mainColor } from "@theme/theme";
import { FC } from 'react'

type IconCircleProps = {

};

const IconCircle: FC<FlexProps> = ({
    children,
    bg = mainColor.white,
    ...props
}) => {
    return (
        <Flex {...props} bg={bg} className='items-center rounded-full' px={1}>
            {children}
        </Flex>
    );
};

export default IconCircle