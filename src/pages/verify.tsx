import { Box, Flex } from '@chakra-ui/react'
import OtpWrapper from '@view/OTP'
import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { wrapper } from 'redux/store'

const Verify: NextPage = () => {

    return (
        <Flex minH='100vh' w='100%' className='items-center justify-center'>
            <Box h='100%'>
                <OtpWrapper />
            </Box>
        </Flex>
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

export default Verify
