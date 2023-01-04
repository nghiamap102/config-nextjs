import { Box, ChakraProvider } from '@chakra-ui/react'
import Global from '@theme/global'
import theme, { mainColor } from '@theme/theme'
import { gapi } from 'gapi-script'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { useEffect } from 'react'
import { wrapper } from 'redux/store'
import '../../public/other/nprogress.css'
import './_app.css'
import '@styles/globals.scss'
import ProgressBar from '@components/ProgressBar'
import { SessionProvider, useSession } from 'next-auth/react';

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter()

    useEffect(() => {
        NProgress.configure({ showSpinner: false })
        NProgress.inc(0.4)
        const handleStart = () => NProgress.start()
        const handleStop = () => NProgress.done()

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleStop)
        router.events.on('routeChangeError', handleStop)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleStop)
            router.events.off('routeChangeError', handleStop)
        }
    }, [router])

    return (
        <SessionProvider session={pageProps.session}>
            <ChakraProvider theme={theme}>
                <Global />
                <Box bg={mainColor.gray} color="#000" minHeight="100vh">
                    <ProgressBar />
                    {/* {Component.auth ? (
                            <Auth adminOnly={Component.auth.adminOnly}>
                                <Component {...pageProps} />
                            </Auth>
                        ) : (
                            <Component {...pageProps} />
                        )} */}
                    <Component {...pageProps} />
                </Box>
            </ChakraProvider>
        </SessionProvider>
    )
}
export const Auth = ({ children, adminOnly }) => {
    const router = useRouter();
    const { status, data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/unauthorized?message=login required');
        },
    });
    if (status === 'loading') {
        return <div>Loading...</div>;
    }
    if (adminOnly && !session.user.role === 'admin') {
        router.push('/unauthorized?message=admin login required');
    }

    return children;
}

export default wrapper.withRedux(appWithTranslation(MyApp))
