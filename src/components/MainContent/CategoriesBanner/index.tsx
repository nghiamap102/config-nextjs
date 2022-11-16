import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { mainColor } from "@theme/theme";
import React from "react";

type CategoriesBannerProps = {

};
const CategoriesBanner: React.FC<CategoriesBannerProps> = ({

}) => {
    return (
        <Grid
            templateColumns='repeat(15, 1fr)'
            paddingX={4}
        >
            <GridItem
                bg={mainColor.white}
                className="panel-box-shadow px-4 py-6"
                colSpan={3}
            >
                <Box borderBottom={`2px solid ${mainColor.orange}`}>
                    <Text bg={mainColor.orange} className='uppercase font-semibold inline-block px-6 py-2 rounded-t-lg tracking-wider' fontSize={'md'} color={mainColor.white}>shop by categories</Text>
                </Box>
            </GridItem>
        </Grid>
    );
};

export default CategoriesBanner