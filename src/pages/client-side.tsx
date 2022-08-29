import { wrapper } from 'redux/store'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Countries from '@components/Countries'

export default function ClientSide() {
    return (
        <>
            <Countries />
        </>
    )
}
export const getServerSideProps = wrapper.getServerSideProps(
    () =>
        async ({ locale }: any) => {
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
