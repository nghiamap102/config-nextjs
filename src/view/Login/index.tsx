import { ReactIcon } from "@assets/icon"
import { Box, Checkbox, Flex, Link, Text } from "@chakra-ui/react"
import ButtonPrimary from "@components/ButtonPrimary"
import UiInputField from "@components/Field/UiInputField"
import { mainColor } from "@theme/theme"
import { checkValueError } from "@utils/helper"
import { FastField, Form, FormikProps, withFormik } from "formik"
import { useTranslation } from "next-i18next"
import { NextRouter } from "next/router"
import { FC } from "react"
import LoginSocial from "./LoginSocial"
import ValidateFieldsLogin from "./ValidateField"

interface LoginProps {
    isError?: boolean
}

interface LoginValue {
    emailOrUsername: string
    password: string
}

interface MyFormProps {
    isError?: boolean
    router?: NextRouter
}

const Login: FC<LoginProps & FormikProps<LoginValue>> = (props) => {

    const { t } = useTranslation(['common'])
    return (
        <Form>
            <Box marginBottom={5}>
                <FastField
                    name='emailOrUsername'
                    component={UiInputField}
                    label='Email'
                    type='text'
                    placeholder='Enter your Email or Username'
                    isRequired
                />

                <FastField
                    name='password'
                    component={UiInputField}
                    label='Password'
                    type='password'
                    placeholder='Enter your password'
                    isRequired
                />

                <Flex justifyContent='end' alignItems='center' mb={5}>
                    <Text textTransform='capitalize'>
                        {t('rememeber_me')}
                    </Text>
                    <Checkbox m='0 1rem' />
                </Flex>

                <ButtonPrimary py='6' type="submit" w='100%' isLoading={props.isSubmitting} bg={mainColor.orange} border='none' color={mainColor.white} _hover={{ opacity: 0.8 }}>
                    {t('Login')}
                </ButtonPrimary>
            </Box>

            <Flex direction='column'>
                <LoginSocial />
            </Flex>

            <Link href="/">
                <Flex className="items-center justify-center">
                    <ReactIcon.IconIo.IoIosArrowRoundBack size='1.5rem' className="mr-2"/>
                    <Text fontSize='md' textTransform='capitalize'>
                        {t('back_to_home')}
                    </Text>
                </Flex>
            </Link>

        </Form>
    )
}

export const FormLoginWrapper = withFormik<MyFormProps, LoginValue>({
    mapPropsToValues: () => ({ emailOrUsername: '', password: '' }),
    validate: checkValueError(ValidateFieldsLogin),
    handleSubmit: async (values, { setSubmitting, props }) => {
        const { router } = props
        setTimeout(() => {
            setSubmitting(true);
        }, 100);
        router && router.push('/')
    }
})(Login)

export default FormLoginWrapper
