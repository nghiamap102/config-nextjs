import '@styles/globals.scss'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { wrapper } from 'redux/store'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <Global />
            <Box bg={mainColor.gray} color="#000" minHeight="100vh">
                <ProgressBar />
                <AxiosErrorHandler>
                    <Component {...pageProps} />
                </AxiosErrorHandler>
            </Box>
        </ChakraProvider>
    )
}

export default wrapper.withRedux(appWithTranslation(MyApp))
