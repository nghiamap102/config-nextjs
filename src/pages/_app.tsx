import { Box, ChakraProvider } from '@chakra-ui/react'
import '@styles/globals.scss'
import Global from '@theme/global'
import theme from '@theme/theme'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { wrapper } from 'redux/store'
import './_app.css'


function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <ChakraProvider theme={theme}>
                <Global />
                <Box bg='#fff' color='#000'>
                    <Component {...pageProps} />
                </Box>
            </ChakraProvider>
        </>
    )
}


export default wrapper.withRedux(appWithTranslation(MyApp))
