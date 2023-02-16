import { Box, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverFooter, PopoverProps, PopoverTrigger, Portal } from '@chakra-ui/react';
import { mainColor } from '@theme/theme';
import { FC } from 'react';

type PopOverProps = {
    popoverTrigger?: any
    popoverBody?: any
    popoverFooter?: any
    containerRef?:any
} & PopoverProps

const PopOver: FC<PopOverProps> = ({
    popoverBody,
    popoverTrigger,
    popoverFooter,
    containerRef,
    ...props
}) => {

    return (
        <Popover size={'lg'} isLazy
            styleConfig={{
                bg: 'white',
                border: 'none',
                outline: 'none',
                zIndex: 999
            }}
            {...props}
        >
            <PopoverTrigger>
                <Box className='cursor-pointer'>
                    {popoverTrigger}
                </Box>
            </PopoverTrigger>
            <Portal appendToParentPortal containerRef={containerRef}>
                <PopoverContent outline={'none'} bg={mainColor.white} boxShadow={`0 5px 10px 0 ${mainColor.lightBlack} `}>
                    <PopoverArrow />
                    <PopoverBody>
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