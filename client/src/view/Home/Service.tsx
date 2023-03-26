import { IconAssets } from '@assets/index';
import { Box, Container, Flex, Text } from '@chakra-ui/react'
import { mainColor } from '@theme/theme'
import Image from 'next/image'

const ServiceView = () => {

    const arrService = [
        {
            icon: IconAssets.HalfStar,
            title: 'QUALITY AND SAVING ',
        },
        {
            icon: IconAssets.WareHouse,
            title: 'GLOBAL WAREHOUSE ',
        },
        {
            icon: IconAssets.Shipping,
            title: 'FAST SHIPPING ',
        },
        {
            icon: IconAssets.Shield,
            title: 'PAYMENT SECURITY ',
        },
        {
            icon: IconAssets.Question,
            title: 'HAVE QUESTIONS? ',
        },
    ]


    return (
        <Box bgImage='https://res.cloudinary.com/bededuxe/image/upload/v1676771540/home-20-custom-service_1920x_31e1114f-3e89-4c6b-b893-c241242d54db_1920x_mhy32h.jpg'>
            <Container maxW='container.xl' p={0} >

                <Flex className='flex-col items-center'
                    py={10} >
                    <Text className='heading-footer' fontSize='2.2rem' color={mainColor.white}>Why Shop With Us? </Text>

                    <Flex w='full' my={10}>
                        {arrService.map(item => (
                            <Flex key={item.title} className='flex-col items-center w-1/5 mx-2 rounded-lg py-20' px={5} py={20} bg={mainColor.white}>
                                <Image src={item.icon} height={50} width={50} alt='a' />
                                <Text className='heading-footer' my={5}>{item.title}</Text>
                                <Text className='text-center'>Comprehensive quality control and affordable prices</Text>
                            </Flex>
                        ))}
                    </Flex>

                    <Text color={mainColor.white}>Vivamus dapibus odio metus, ac scelerisque urna condimentum id. </Text>
                </Flex>
            </Container>
        </Box>
    );
};

export default ServiceView