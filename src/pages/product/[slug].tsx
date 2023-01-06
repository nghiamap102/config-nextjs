import Header from '@components/Header'
import ProductView from '@view/Product'
import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { wrapper } from 'redux/store'

const Product: NextPage = props => {

    const router = useRouter()
    const { slug } = router.query
    const product = props.data.product.filter(items => items.id === slug)[0]

    return (
        <>
            <Header />
            <ProductView product={product}/>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    () =>
        async ({ locale }) => {
            const res = await fetch(`http://localhost:3030/api/home`)
            const data = await res.json()
            const translate = await serverSideTranslations(locale as string, [
                'common',
                'product',
            ])

            // const res = await fetch('/api/product/1')
            // console.log(res);
            return {
                props: {
                    ...translate,
                    data
                },
            }
        },
)

export default Product
