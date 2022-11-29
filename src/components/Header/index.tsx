import { ReactIcon } from '@assets/icon';
import logo from '@assets/image/logo.png';
import { Box, Grid, GridItem, Link, Text } from "@chakra-ui/react";
import InputSearch from '@components/InputSearch';
import Navbar from '@components/Navbar';
import { mainColor } from "@theme/common/color";
import { EventType } from 'models/commonModel';
import Image from "next/image";
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { selectCommon, setSearchKey } from 'redux/common/commonSlice';
import { useAppSelector } from 'redux/hooks';
import GridIconHeader from './GridIcon';

const Header: FC = () => {

    const common = useAppSelector(selectCommon)
    const dispatch = useDispatch()

    const handleChange = (e: EventType) => {
        dispatch(setSearchKey(e.target.value))
    }

    const handleSearch = () => {
        dispatch(setSearchKey(''))
    }

    return (
        <>
            <Box display='flex' bg={mainColor.orange}>
                <Grid
                    templateColumns='repeat(11, 1fr)'
                    className="p-5 w-full"
                >
                    <GridItem className="flex justify-between items-center mr-10" colSpan={3}>
                        <Link
                            href='/'
                            className="italic heading"
                        >
                            <Image
                                src={logo}
                                alt='logo'
                            />
                        </Link>
                        <Box className="flex flex-col" color={mainColor.white}>
                            <Text fontSize='sm'>
                                Available 24/7 at
                            </Text>
                            <Link
                                href={`tel:0358833453`}
                                className='text-xl font-bold'
                            >
                                035-8833-453
                            </Link>
                        </Box>
                    </GridItem>

                    <GridItem className="flex items-center" colSpan={5}>
                        <InputSearch
                            icon={(
                                <ReactIcon.IconCi.CiSearch
                                    size='2rem'
                                    color={mainColor.orange}
                                />
                            )}
                            onClickSearch={handleSearch}
                            onChange={handleChange}
                        />
                    </GridItem>

                    <GridIconHeader />
                </Grid>
            </Box>
            <Navbar />
        </>
    );
};


export default Header;