import { Box, Container, Divider, Flex, Grid, GridItem } from '@chakra-ui/react';
import FormLoginWrapper from '@view/Login';
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { wrapper } from 'redux/store';

const Login: NextPage = () => {
    return (
        <>
            <Flex height='100vh' maxW='100%' padding={0} justifyContent='center' alignItems='center'>
                <Container height='70%' w='70%'>
                    <Grid templateColumns='repeat(2,1fr)' gap={10}>
                        <GridItem colSpan={1}>
                            <FormLoginWrapper />
                        </GridItem>
                        <Divider orientation='vertical'/>
                    </Grid>
                </Container>
            </Flex>
        </>
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
