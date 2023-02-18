import { Box, BoxProps, Flex, Portal } from '@chakra-ui/react';
import { mainColor } from '@theme/theme';
import { forwardRef, useState } from 'react';

type OverlayProps = {
    children?: any
    bg?: any
    onClose?: () => void
    ovelay?: boolean
} & BoxProps

const Overlay = forwardRef<any, OverlayProps>((props, ref) => {
    const { children, bg, onClose, ovelay = true } = props

    return (
        <Portal containerRef={ref}>
            <Box {...props} >
                <Flex h='100%' w='100%' bg={'transparent'}
                    className='fixed right-0  bottom-0 left-0 top-0 items-center justify-center' zIndex={90}
                    onClick={ovelay ? onClose : () => { }}
                >
                    {ovelay && <Box className='absolute top-0 right-0 left-0 bottom-0' bgColor={bg || mainColor.black} opacity={0.3} onClick={onClose} />}
                    <Flex h='auto' w='fit-content' maxW={'90%'} maxH={'90%'} className='relative' m='0 auto'>
                        {children}
                    </Flex>
                </Flex>
            </Box>
        </Portal>
    );
})

Overlay.displayName = 'Overlay'

export default Overlay