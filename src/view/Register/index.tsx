import { ReactIcon } from '@assets/icon'
import { Box, Flex, Text } from '@chakra-ui/react'
import UiInputField from '@components/Field/UiInputField'
import Translation from '@components/Translate'
import { mainColor } from '@theme/theme'
import { checkValueError } from '@utils/helper'
import { FastField, Form, FormikProps, withFormik } from 'formik'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { NextRouter } from 'next/router'
import { FC } from 'react'
import ValidateFieldsLogin from './ValidateField'
import { ButtonBorderPrimary } from '@components/Button'

interface LoginProps {
    isError?: boolean
}

interface RegisterValue {
    username: string
    password: string
    phone: number
    email: string

}

interface MyFormProps {
    isError?: boolean
    router?: NextRouter
}

const Register: FC<LoginProps & FormikProps<RegisterValue>> = props => {

    return (
        <Form>
            <Box marginBottom={5}>
                <FastField
                    name="username"
                    component={UiInputField}
                    label="username"
                    type="text"
                    placeholder="Enter your Email or Username"
                    isRequired
                />

                <FastField
                    name="password"
                    component={UiInputField}
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    isRequired
                />

                <Flex justifyContent="end" alignItems="center" mb={5}>
                    {/* <Text textTransform="capitalize">{t('rememeber_me')}</Text>
                    <Checkbox m="0 1rem" /> */}
                    <Text>
                        You dont have account
                        <Link href={'/register'}>
                            <Translation text='register' className='capitalize cursor-pointer' />
                        </Link>
                    </Text>
                </Flex>

                <ButtonBorderPrimary
                    py="6"
                    type="submit"
                    w="100%"
                    isLoading={props.isSubmitting}
                    bg={mainColor.orange}
                    border="none"
                    color={mainColor.white}
                    _hover={{ opacity: 0.8 }}
                >
                    <Translation text='login' className='capitalize' />
                </ButtonBorderPrimary>
            </Box>

            <Link href="/">
                <Flex className="items-center justify-center cursor-pointer">
                    <ReactIcon.IconIo.IoIosArrowRoundBack
                        size="1.5rem"
                        className="mr-2"
                    />
                    <Translation text='back_to_home' className='capitalize' />
                </Flex>
            </Link>
        </Form>
    )
}

export const FormRegisterWrapper = withFormik<MyFormProps, RegisterValue>({
    mapPropsToValues: () => ({ emailOrUsername: '', password: '' }),
    validate: checkValueError(ValidateFieldsLogin),
    handleSubmit: async (values, { setSubmitting, props }) => {
        const { router } = props
        setTimeout(async () => {
            setSubmitting(true)
            console.log(values)
            await signIn('credentials', {
                email: values.emailOrUsername,
                password: values.password,
                redirect: false
            })
            router && router.push('/')
        }, 100)
    },
})(Register)

export default FormRegisterWrapper
