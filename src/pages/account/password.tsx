import Layout from '@components/Layout'
import AccountView from '@view/Account'
import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { wrapper } from 'redux/store'

const Account: NextPage = () => {
    return (
        <Layout>
            <AccountView />
        </Layout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    () =>
        async ({ locale }) => {
            const translate = await serverSideTranslations(locale as string, ['common'])
            return {
                props: {
                    ...translate,
                },
            }
        },
)

export default Account