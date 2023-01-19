import { Box, Button, ButtonGroup, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverFooter, PopoverProps, PopoverTrigger, Portal } from '@chakra-ui/react';
import { mainColor } from '@theme/theme';
import { FC } from 'react';

type PopOverProps = {
    popoverTrigger?: any
    popoverBody?: any
    popoverFooter?: any
} & PopoverProps

const PopOver: FC<PopOverProps> = ({
    popoverBody,
    popoverTrigger,
    popoverFooter,
    ...props
}) => {

    return (
        <Popover size={'lg'} isLazy
            styleConfig={{
                bg: 'white',
                border: 'none',
                outline: 'none',
            }}
            {...props}
        >
            <PopoverTrigger>
                {popoverTrigger}
            </PopoverTrigger>
            <Portal>
                <PopoverContent outline={'none'} bg={mainColor.white} boxShadow={`0 5px 10px 0 ${mainColor.lightBlack} `}>
                    <PopoverArrow />
                    <PopoverBody  >
                        {popoverBody}
                    </PopoverBody>
                    <PopoverFooter>
                        {popoverFooter}
                    </PopoverFooter>
                </PopoverContent>
            </Portal>
        </Popover>
    )
};

export default PopOver