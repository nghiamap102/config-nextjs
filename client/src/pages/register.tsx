import { Box, Container, Flex, Grid, GridItem, useToast } from '@chakra-ui/react'
import BoxIntro from '@components/BoxIntro'
import { mainColor } from '@theme/theme'
import FormRegisterWrapper from '@view/Register'
import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { wrapper } from 'redux/store'

const Register: NextPage = () => {
    const router = useRouter()

    const toast = useToast()
    const { error } = router.query

    useEffect(() => {
        error && toast({
            title: 'server is currently down',
            status: 'error',
            isClosable: true,
        })
    }, [error, toast])

    return (
        <Container maxW="100%" p={0} h="100vh">
            <Grid templateColumns="repeat(2,1fr)" h="100%">
                <GridItem
                    colSpan={1}
                    bgImage="_next/static/media/bg-login.89958185.jpeg"
                    position={'relative'}
                >
                    <BoxIntro
                        content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever 
                        since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen booka"
                    />
                </GridItem>
                <GridItem
                    colSpan={1}
                    p="5rem 2rem"
                    bg={mainColor.skin}
                >
                    <Flex h='100%' className="items-center">
                        <Box
                            p={14}
                            w="100%"
                            maxW="40rem"
                            minH='10rem'
                            margin="0 auto"
                            borderRadius={30}
                            bg={mainColor.white}
                        >
                            <FormRegisterWrapper router={router} />
                        </Box>
                    </Flex>
                </GridItem>
            </Grid>
        </Container>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(() => async ({ locale }) => {
    const translate = await serverSideTranslations(locale as string, ['common'])

    return {
        props: {
            ...translate,
        },
    }
},
)

export default Register
