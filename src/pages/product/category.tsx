import CategoryView from '@view/Category'
import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { wrapper } from 'redux/store'

const ProductCategory: NextPage = props => {

    const router = useRouter()

    return <CategoryView/>
}

export const getServerSideProps = wrapper.getServerSideProps(
    () =>
        async ({ locale }) => {
            const translate = await serverSideTranslations(locale as string, [
                'common',
            ])

            return {
                props: {
                    ...translate,
                },
            }
        },
)

export default ProductCategory
