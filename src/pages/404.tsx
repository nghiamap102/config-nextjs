// 404.js
import Link from 'next/link'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { wrapper } from 'redux/store';
export default function FourOhFour() {
    return <>
        <h1>404 - Page Not Found</h1>
        <Link href="/">
            <a>
                Go back home
            </a>
        </Link>
    </>
}
export const getServerSideProps = wrapper.getServerSideProps(() => async ({ locale }) => {
    const translate = await serverSideTranslations(locale as string, ['common']);
    return {
        props: {
            ...translate,
        }
    }
})