import Icon from "@assets/icon";
import { Box, Divider, Grid, GridItem, Text } from "@chakra-ui/react";
import { mainColor } from "@theme/theme";
import React from "react";
import NavbarItem from "./NavbarItem";


const Navbar: React.FC = () => {

    const handleMouseEnter = () => {
        console.log('ac');
    }

    return (
        <Box paddingX={4} className="panel-box-shadow relative" >
            <Grid templateColumns='repeat(12, 1fr)'>

                <GridItem colSpan={1} display="flex" onMouseEnter={handleMouseEnter} cursor='pointer'>
                    <NavbarItem
                        type="categories"
                        text={
                            <Box className="flex items-center" paddingRight={16}>
                                <Icon.IconBs.BsGrid3X3GapFill color={mainColor.orange} size="1.5rem" />
                                <Text fontSize='lg' className="capitalize" marginX={5}>categories</Text>
                                <Icon.IconIo.IoIosArrowDown />
                            </Box>
                        }
                    />
                </GridItem>

                <GridItem colSpan={8} display='flex'>
                    <Box className="py-3">
                        <Divider orientation="vertical" w={3} borderLeftWidth={2} />
                    </Box>
                    <Box className="flex items-center">
                        <NavbarItem type="submenu" text={<Text fontSize='md'>home page</Text>} />
                        <NavbarItem type="dropdown" text={<Text fontSize='md'>products</Text>} tag='hot' />
                        <NavbarItem type="submenu" text={<Text fontSize='md'>blog</Text>} />
                        <NavbarItem type="submenu" text={<Text fontSize='md'>voucher</Text>} />
                        <NavbarItem type="submenu" text={<Text fontSize='md'>shop</Text>} />
                        <NavbarItem type="submenu" text={<Text fontSize='md'>rating</Text>} tag='sale' />
                    </Box>
                </GridItem>

                <GridItem colSpan={2}>

                </GridItem>
            </Grid>


        </Box>
    );
};

export default Navbar;