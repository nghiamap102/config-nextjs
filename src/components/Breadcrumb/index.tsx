import { Box, BoxProps } from '@chakra-ui/react';
import { FC } from 'react'

type BreadcrumbProps = {

} & BoxProps;
const Breadcrumb: FC<BreadcrumbProps> = ({
    ...props
}) => {
    return (
        <>
            <Box {...props}>Breadcrumb</Box>
        </>
    );
};

export default Breadcrumb