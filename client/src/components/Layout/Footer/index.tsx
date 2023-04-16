import { ReactIcon } from '@assets/icon'
import { IconAssets } from '@assets/index'
import { Box, Container, Flex, Link as ChakraLink, List, ListItem, Text } from '@chakra-ui/react'
import { ButtonPrimary } from '@components/Button'
import SearchContainer from '@components/Search/SearchContainer'
import Translation from '@components/Translate'
import { mainColor } from '@theme/theme'
import Image from 'next/image'
import { FC } from 'react'

const Footer: FC = () => {

    const arrShop = ['Electronics', 'Computers & Laptops', 'Smartphones & Tablets', 'Cameras', 'Video Games & Systems', 'Home Furniture', 'Weekly Special']
    const arrSocial = [
        {
            linkTo: 'https://www.facebook.com/',
            icon: <ReactIcon.IconFa.FaFacebookF size='1.2rem' />
        },
        {
            linkTo: 'https://www.facebook.com/',
            icon: <ReactIcon.IconFi.FiInstagram size='1.2rem' />
        },
        {
            linkTo: 'https://www.facebook.com/',
            icon: <ReactIcon.IconBs.BsTwitter size='1.2rem' />
        },
        {
            linkTo: 'https://www.facebook.com/',
            icon: <ReactIcon.IconDi.DiGithubAlt size='1.2rem' />
        },
        {
            linkTo: 'https://www.facebook.com/',
            icon: <ReactIcon.IconAi.AiFillLinkedin size='1.2rem' />
        },
    ]


    return (
        <>
            <Container maxW='container.xl' className='my-10'>
                <Flex className='flex-col items-center'>
                    <Text className='heading-footer'>SUBSCRIBE TO OUR NEWSLETTER</Text>
                    <Text className='text-md'>Get the latest updates on new products and upcoming sales </Text>
                    <Flex className='items-center my-6'>
                        <SearchContainer borderRadius='none' w='lg' mr={5} placeholder='Enter your email address' />
                        <ButtonPrimary borderRadius='3xl' size='lg'><Translation text='submit' firstCapital /></ButtonPrimary>
                    </Flex>

                    <Flex w='full' my={5}>
                        <Box className='w-1/5'>
                            <Text className='heading-footer mb-5'>Shop</Text>
                            <List spacing={3} mr={5}>
                                {arrShop.map((item, index) => <ListItem key={index} className='font-light link link-underline' color={mainColor.gray3}>{item}</ListItem>)}
                            </List>
                        </Box>
                        <Box className='w-1/5'>
                            <Text className='heading-footer mb-5'>TOP BRANDS</Text>
                            <List spacing={3} mr={5}>
                                {arrShop.map((item, index) => <ListItem key={index} className='font-light link link-underline' color={mainColor.gray3}>{item}</ListItem>)}
                            </List>
                        </Box>
                        <Box className='w-1/5'>
                            <Text className='heading-footer mb-5' >FURTHER INFO.</Text>
                            <List spacing={3} mr={5}>
                                {arrShop.map((item, index) => <ListItem key={index} className='font-light link link-underline' color={mainColor.gray3}>{item}</ListItem>)}
                            </List>
                        </Box>
                        <Box className='w-1/5'>
                            <Text className='heading-footer mb-5'>CUSTOMER SERVICE </Text>
                            <List spacing={3} mr={5}>
                                {arrShop.map((item, index) => <ListItem key={index} className='font-light link link-underline' color={mainColor.gray3}>{item}</ListItem>)}
                            </List>
                        </Box>
                        <Box className='w-1/5'>
                            <Image
                                src='https://res.cloudinary.com/bededuxe/image/upload/v1676733683/logo-footer_269d57e0-e048-415c-b54a-5eb5a69e3964_200x_zogvjf.png'
                                alt='abc'
                                height={37}
                                width={180}
                            />
                            <Flex className='items-center my-3'>
                                <Box w='15%'>
                                    <ReactIcon.IconMd.MdLocationOn size='1.5rem' className='' color={mainColor.black2} />
                                </Box>
                                <Text w='85%'>
                                    685 Market Street
                                    San Francisco, CA 94105, US
                                </Text>
                            </Flex>
                            <Flex>
                                {arrSocial.map((item, index) => (
                                    <ChakraLink key={index} href={item.linkTo} target='_blank' >
                                        <Box className='relative' mx={1.5}>
                                            <Box className='rounded-full p-3 icon-social'
                                                transition={`0.3s all`} border={`2px solid ${mainColor.gray2}`}
                                                _hover={{ bg: mainColor.gray1, color: mainColor.white, borderColor: mainColor.gray1 }}>
                                                {item.icon}
                                            </Box>
                                        </Box>
                                    </ChakraLink>
                                ))}
                            </Flex>
                        </Box>
                    </Flex>

                </Flex>

                <Box mt={50} className='text-center'>
                    <Image src={'https://res.cloudinary.com/bededuxe/image/upload/v1676731041/banner2_vrtzry.png'}
                        alt='abc'
                        width={650}
                        height={46}
                    />
                </Box>
            </Container >
            <Box bg={mainColor.white} p={5}>
                <Container maxW='container.xl'>

                    <Flex className="justify-between items-center">
                        <Box>
                            <Text> © 2022 Ella Demo. All Rights Reserved. Powered By Shopify. </Text>
                            <Text>Shopify Themes By HaloThemes.com</Text>
                        </Box>
                        <Flex>
                            {Array(6).fill(null).map((ele, index) => (
                                <Flex
                                    key={index}
                                    className='mx-1'
                                >
                                    <Image src={IconAssets.Mastercard} alt='abc'
                                        height={40}
                                        width={60}
                                    />
                                </Flex>
                            ))}
                        </Flex>
                    </Flex>
                </Container>
            </Box>
        </>
    )
}

export default Footer
