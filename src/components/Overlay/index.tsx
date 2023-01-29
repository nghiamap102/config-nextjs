import { Box, Portal } from '@chakra-ui/react';
import { mainColor } from '@theme/theme';
import { FC } from 'react'


const Overlay: FC = ({ children }) => {
    return (
        <Portal>
            <Box h='100%' w='100%' bg={mainColor.boxshadow}>
                {children}
            </Box>
        </Portal>
    );
};


export default Overlay