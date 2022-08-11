import { ApolloProvider } from '@apollo/client';
import '@styles/globals.scss'
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app'
import client from 'src/common/apolloClient';
import Header from 'src/components/Header';
import { wrapper } from '../../redux/store'

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
