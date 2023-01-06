import { Box, BoxProps } from "@chakra-ui/react";
import { ProductTag } from "@redux/product/productModel";
import { mainColor } from "@theme/theme";
import { FC } from 'react'

type TagProps = {
    tag?: ProductTag
} & BoxProps

const Tag: FC<TagProps> = ({ tag, children, ...props }) => {


    const renderColor = () => {
        switch (tag) {
            case 'favourite':
                return mainColor.orange
            case 'mall':
                return mainColor.hotTag
            default:
                return ''
        }
    }

    return (
        <Box bg={renderColor()} {...props} color={mainColor.white} textTransform='capitalize'>
            {children} 
        </Box>
    );
};

export default Tag