import { Box, Checkbox, Flex, FlexProps } from "@chakra-ui/react";
import { mainColor } from "@theme/theme";
import { FC, useState } from 'react';

type UICheckBoxFieldProps = {
    content?: string
    onCheckBoxClick?: (selected: boolean) => void
    placement?: 'left' | 'right'
    sizeCheckbox?: 'md' | 'lg' | 'sm'
} & FlexProps

export const UICheckBoxField: FC<UICheckBoxFieldProps> = ({
    content,
    onCheckBoxClick,
    placement = 'left',
    sizeCheckbox,
    ...props
}) => {


    const [active, setActive] = useState(false)

    const onClick = () => {
        setActive(!active)
        onCheckBoxClick && onCheckBoxClick(!active)
    }

    return (
        <Flex onClick={onClick} className="items-center cursor-pointer" {...props}>
            {placement === 'left' && (
                <Box color={mainColor.gray3} className="mr-2" >
                    {content}
                </Box>
            )}
            <Checkbox isChecked={active} size={sizeCheckbox} />
            {placement === 'right' && (
                <Box color={mainColor.gray3} className="ml-2">
                    {content}
                </Box>
            )}
        </Flex>
    );
};


export default UICheckBoxField