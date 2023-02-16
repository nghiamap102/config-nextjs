import { Box, Flex, FlexProps } from "@chakra-ui/react";
import { mainColor } from "@theme/theme";
import { FC } from "react";

type SelectCircleProps = {
    onSelect?: () => void
    active?: boolean
} & FlexProps

const SelectCircle: FC<SelectCircleProps> = ({ active, onSelect, ...props }) => {
    return (
        <Flex p={2} rounded='full' onClick={onSelect} {...props}
            className="cursor-pointer justify-center items-center" border={`2px solid ${active ? mainColor.orange : mainColor.gray3}`}>
            {active && <Box rounded='full' border={`3px solid ${mainColor.orange}`} />}
            {!active && <Box rounded='full' border={`3px solid ${mainColor.white}`} />}
        </Flex>
    );
};

export default SelectCircle