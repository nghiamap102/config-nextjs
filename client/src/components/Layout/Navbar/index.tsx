import { IconAssets } from '@assets/index'
import { Box, Container, Divider, Grid, GridItem, Text } from '@chakra-ui/react'
import { mainColor } from '@theme/theme'
import { FC } from 'react'
import NavbarItem from './NavbarItem'

const Navbar: FC = () => {

    return (
        <Container
            paddingX={4}
            className="panel-box-shadow relative"
            bg={mainColor.white}
            maxW='container.xl'
        >
            <Grid templateColumns="repeat(12, 1fr)">
                <GridItem
                    colSpan={1}
                    display="flex"
                    cursor="pointer"
                >
                    <NavbarItem
                        type="categories"
                        text={
                            <Box
                                className="flex items-center"
                                paddingRight={16}
                            >
                                <IconAssets.ReactIcon.IconBs.BsGrid3X3GapFill
                                    color={mainColor.orange}
                                    size="1.5rem"
                                />
                                <Text
                                    fontSize="lg"
                                    className="capitalize"
                                    marginX={5}
                                >
                                    categories
                                </Text>
                                <IconAssets.ReactIcon.IconIo.IoIosArrowDown />
                            </Box>
                        }
                    />
                </GridItem>

                <GridItem colSpan={8} display="flex">
                    <Box className="py-3">
                        <Divider
                            orientation="vertical"
                            w={3}
                            borderLeftWidth={2}
                        />
                    </Box>

                </GridItem>

                <GridItem colSpan={2}></GridItem>
            </Grid>
        </Container>
    )
}

export default Navbar
