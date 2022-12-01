import { Box, ChakraProvider } from '@chakra-ui/react'
import '@styles/globals.scss'
import Global from '@theme/global'
import theme from '@theme/theme'
import { gapi } from 'gapi-script'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { CookiesProvider } from 'react-cookie'
import { wrapper } from 'redux/store'
import './_app.css'

function MyApp({ Component, pageProps }: AppProps) {

    useEffect(() => {
        a()
    });

    const a = () => {
        const initClient = async () => {
            gapi.client.init({
                clientId: process.env.CLIENT_ID,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
    }

    return (
        <>
            <CookiesProvider>
                <ChakraProvider theme={theme}>
                    <Global />
                    <Box bg='#fff' color='#000'>
                        <Component {...pageProps} />
                    </Box>
                </ChakraProvider>
            </CookiesProvider>
        </>
    )
}


export default wrapper.withRedux(appWithTranslation(MyApp))
