import Header from '@components/Header'
import ProductView from '@view/Product'
import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { wrapper } from 'redux/store'

const Product: NextPage = () => {
    return (
        <>
            <Header />
            <ProductView />
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    () =>
        async ({ locale }) => {
            const translate = await serverSideTranslations(locale as string, [
                'common',
                'product',
            ])

            // const res = await fetch('/api/product/')
            // console.log(res);
            return {
                props: {
                    ...translate,
                },
            }
        },
)

export default Product
