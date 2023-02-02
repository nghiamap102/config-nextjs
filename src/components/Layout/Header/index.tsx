import { IconAssets, ImageAssets } from '@assets/index'
import { Box, Grid, GridItem, Text } from '@chakra-ui/react'
import InputSearch from '@components/InputSearch'
import Navbar from '@components/Layout/Navbar'
import { mainColor } from '@theme/common/color'
import { EventType } from 'models/common'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchKey } from 'redux/common/commonSlice'
import GridIconHeader from './GridIcon'

const Header: FC = () => {
    // const common = useAppSelector(selectCommon)
    const dispatch = useDispatch()

    const handleChange = (e: EventType) => {
        dispatch(setSearchKey(e.target.value))
    }

    const handleSearch = () => {
        dispatch(setSearchKey(''))
    }

    return (
        <>
            <Box display="flex" bg={mainColor.orange}>
                <Grid templateColumns="repeat(11, 1fr)" className="p-5 w-full">
                    <GridItem
                        className="flex justify-between items-center mr-10"
                        colSpan={3}
                    >
                        <Link href="/" shallow>
                            <Box className="italic heading cursor-pointer">
                                <Image src={ImageAssets.Logo} alt="logo" />
                            </Box>
                        </Link>
                        <Box className="flex flex-col" color={mainColor.white}>
                            <Text className="text-md font-bold">
                                Available 24/7 at
                            </Text>
                            <Link href={`tel:0358833453`}>
                                <Box className="text-xl font-bold">
                                    035-8833-453
                                </Box>
                            </Link>
                        </Box>
                    </GridItem>

                    <GridItem className="flex items-center" colSpan={5}>
                        <InputSearch
                            icon={
                                <IconAssets.ReactIcon.IconCi.CiSearch
                                    size="2rem"
                                    color={mainColor.orange}
                                />
                            }
                            onClickSearch={handleSearch}
                            onChange={handleChange}
                        />
                    </GridItem>

                    <GridIconHeader />
                </Grid>
            </Box>

            <Navbar />
        </>
    )
}

export default Header