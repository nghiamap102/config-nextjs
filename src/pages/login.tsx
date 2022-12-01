import { Box, Container, Grid, GridItem } from '@chakra-ui/react';
import { mainColor } from '@theme/theme';
import FormLoginWrapper from '@view/Login';
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { wrapper } from 'redux/store';

const Login: NextPage = () => {

    return (
        <Container maxW='100%' p={0} h='100vh'>
            <Grid templateColumns='repeat(2,1fr)' h='100%'>
                <GridItem colSpan={1} overflow='hidden' bgImage='_next/static/media/bg-login.89958185.jpeg' p='5rem 2rem'>
                    <Box className='text-center' p={14} w='100%' maxW='40rem' margin='0 auto' borderRadius={30}>

                    </Box>
                </GridItem>
                <GridItem colSpan={1} p='5rem 2rem' display='flex' bg={mainColor.skin} >
                    <Box className='text-center' p={14} w='100%' maxW='40rem' margin='0 auto' borderRadius={30} bg={mainColor.white}>
                        <FormLoginWrapper />
                    </Box>
                </GridItem>
            </Grid>
        </Container>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(() => async ({ locale }) => {
    const translate = await serverSideTranslations(locale as string, [
        'common', 'product'
    ])

    return {
        props: {
            ...translate,
        }
    }
})

export default Login
