import { ApolloProvider } from '@apollo/client'
import { client } from '@common/apolloClient'
import '@styles/globals.scss'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import Header from '@components/Header'
import { wrapper } from 'redux/store'

function MyApp({ Component, pageProps }: AppProps) {
    // const foo = null ?? 'default string';
    // console.log(foo);

    // const baz = 0 ?? 42;
    // console.log(baz);
    return (
        <>
            <Header />
            <ApolloProvider client={client}>
                <Component {...pageProps} />
            </ApolloProvider>
        </>
    )
}

export default wrapper.withRedux(appWithTranslation(MyApp))
