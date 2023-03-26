import { Box, BoxProps, Checkbox, Flex, FlexProps } from "@chakra-ui/react";
import Translation from "@components/Translate";
import { mainColor } from "@theme/theme";
import classNames from "classnames";
import { FC, MouseEvent, useState } from 'react';

type UICheckBoxFieldProps = {
    content?: string
    placement?: 'left' | 'right'
    sizeCheckbox?: 'md' | 'lg' | 'sm'
    disable?: boolean
    active?: boolean
} & BoxProps

export const UICheckBoxField: FC<UICheckBoxFieldProps> = ({
    content,
    placement = 'left',
    sizeCheckbox,
    disable = false,
    active,
    ...props
}) => {

    const handleClick = (e: any) => {
        if (!disable && typeof props.onClick === 'function') {
            props.onClick(e)
        }
    }

    const renderText = () => {
        return <Translation text={content} color={props.color || mainColor.gray3} firstCapital />
    }

    return (
        <Box {...props} className={classNames(disable && 'cursor-not-allowed', 'inline cursor-pointer')} onClick={handleClick}>
            <Box className="inline-flex items-center">
                {placement === 'left' && renderText()}
                <Checkbox isChecked={active} className="mx-2" cursor={disable && 'not-allowed'} size={sizeCheckbox} />
                {placement === 'right' && renderText()}
            </Box>
        </Box>
    );
};


export default UICheckBoxField