import { Box } from '@chakra-ui/react';
import { CSSProperties, FC } from 'react';

type DotLoadingProps = {
    children?: any;
    style?: CSSProperties;
};


export const DotLoading: FC<DotLoadingProps> = ({ children, style }) => {

    return (
        <Box className="bouncing-loader">
            <div></div>
            <div></div>
            <div></div>
        </Box>
    );
};

