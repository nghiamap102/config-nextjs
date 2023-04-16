import ProductView from '@view/Product'
import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { wrapper } from 'redux/store'

const ProductDetail: NextPage = () => {
    return <ProductView />
}

export const getServerSideProps = wrapper.getServerSideProps(
    () =>
        async ({ locale }) => {
            const translate = await serverSideTranslations(locale as string, [
                'common',
            ])

            // const res = await fetch('/api/product/1')
            // console.log(res);
            return {
                props: {
                    ...translate,
                },
            }
        },
)

export default ProductDetail
