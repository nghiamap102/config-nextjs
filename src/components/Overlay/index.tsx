import { Box, BoxProps, Flex, Portal } from '@chakra-ui/react';
import { mainColor } from '@theme/theme';
import { FC } from 'react';

type OverlayProps = {
    children?: any
    bg?: any
    onClose?: () => void
    blurNumber?: number
    containerRef?: any
} & BoxProps

const Overlay: FC<OverlayProps> = ({ children, bg, onClose, blurNumber, containerRef, ...props }) => {

    return (
        <Portal containerRef={containerRef}>
            <Box {...props}>
                <Flex h='100%' w='100%' bg={'transparent'} className='fixed right-0  bottom-0 left-0 top-0 items-center justify-center' zIndex={1001}>
                    <Box className='absolute top-0 right-0 left-0 bottom-0' bgColor={bg || mainColor.black} opacity={blurNumber || 0.3} onClick={onClose} />
                    <Flex h='auto' w='fit-content' maxW={'90%'} maxH={'90%'} className='relative' m='0 auto'>
                        {children}
                    </Flex>
                </Flex>
            </Box>
        </Portal>
    );
};


export default Overlay