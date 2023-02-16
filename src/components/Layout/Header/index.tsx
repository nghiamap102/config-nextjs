import { IconAssets, ImageAssets } from '@assets/index'
import { Box, Container, Flex } from '@chakra-ui/react'
import Navbar from '@components/Layout/Navbar'
import { mainColor } from '@theme/common/color'
import { EventType } from 'models/common'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchKey } from 'redux/common/commonSlice'
import CartHeader from './CartHeader'
import TopHeader from './TopHeader'
import SearchContainer from '@components/Search/SearchContainer'

const Header: FC = () => {
    const dispatch = useDispatch()

    const handleChange = (e: EventType) => {
        dispatch(setSearchKey(e.target.value))
    }

    const handleSearch = () => {
        dispatch(setSearchKey(''))
    }

    return (
        <Box bg={mainColor.orange}>
            <Container maxW='container.xl' color={mainColor.white}>
                
                <TopHeader/>

                <Flex className='items-center justify-between' py={3}>

                    <Flex className='items-center' maxW='27%' >
                        <Link href="/" shallow >
                            <Image src={ImageAssets.Logo} alt="logo" className='cursor-pointer' />
                        </Link>
                        <Flex className="flex-col text-lg text-lg font-bold ml-10" color={mainColor.white}>
                            Available 24/7 at
                            <Link href={`tel:0358833453`} >
                                <Box className='cursor-pointer'>
                                    035-8833-453
                                </Box>
                            </Link>
                        </Flex>
                    </Flex>

                    <Box className="w-full" maxW='60%' >
                        <SearchContainer
                            icon={<IconAssets.ReactIcon.IconCi.CiSearch size="2rem" color={mainColor.orange} />}
                            onClickSearch={handleSearch}
                            onChange={handleChange}
                        />
                    </Box>

                    <Box maxW='10%'>
                        <CartHeader />
                    </Box>

                </Flex>
            </Container>

            <Navbar />
        </Box>
    )
}


export default Header
