import { Box, Checkbox, Flex, FlexProps } from "@chakra-ui/react";
import { mainColor } from "@theme/theme";
import { FC } from 'react';

type UICheckBoxFieldProps = {
    content?: string
    onChange?: () => void
} & FlexProps;

export const UICheckBoxField: FC<UICheckBoxFieldProps> = ({
    content,
    onChange,
    ...props
}) => {
    return (
        <Flex className="items-center" {...props}>
            <Box color={mainColor.gray3} className="mr-2">
                {content}
            </Box>
            <Checkbox onChange={onChange} size='lg' />
        </Flex>
    );
};


export default UICheckBoxField