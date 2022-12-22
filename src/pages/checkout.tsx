import CheckoutPage from '@view/Checkout';
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { wrapper } from 'redux/store';

const Checkout: NextPage = () => {
    return <CheckoutPage />
}

export const getServerSideProps = wrapper.getServerSideProps(() => async ({ locale }) => {
    const translate = await serverSideTranslations(locale as string, [
        'common', 'product', 'cart','checkout'
    ])

    return {
        props: {
            ...translate,
        }
    }
})

export default Checkout
