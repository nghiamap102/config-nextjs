import { Box } from '@chakra-ui/react';
import { FC } from 'react';


export const DotLoading: FC = () => {

    return (
        <Box className="bouncing-loader">
            <div></div>
            <div></div>
            <div></div>
        </Box>
    );
};

