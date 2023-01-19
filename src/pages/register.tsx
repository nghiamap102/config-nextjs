import FormRegisterWrapper from '@view/Register'
import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { wrapper } from 'redux/store'

const Home: NextPage = props => {

    return <FormRegisterWrapper />
}

export const getServerSideProps = wrapper.getServerSideProps(
    () =>
        async ({ locale }) => {
            const res = await fetch(`http://localhost:3030/api/home`)
            const data = await res.json()
            const translate = await serverSideTranslations(locale as string, [ 'common'])
            return {
                props: {
                    ...translate,
                    data,
                },
            }
        },
)

export default Home
