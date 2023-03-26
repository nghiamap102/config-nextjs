import { ReactIcon } from '@assets/icon'
import { Box, Flex, Text } from '@chakra-ui/react'
import ButtonBorderPrimary from '@components/Button/ButtonBorderPrimary'
import UiInputField from '@components/Field/UiInputField'
import { mainColor } from '@theme/theme'
import { checkValueError } from '@utils/helper'
import { FastField, Form, FormikProps, withFormik } from 'formik'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { NextRouter } from 'next/router'
import { FC } from 'react'
import ValidateFieldsRegister from './ValidateField'
interface LoginProps {
    isError?: boolean
}

interface RegisterValue {
    phone?: string
}

interface MyFormProps {
    isError?: boolean
    router?: NextRouter
}

const Register: FC<LoginProps & FormikProps<RegisterValue>> = props => {
    const { t } = useTranslation(['common'])
    return (
        <Form>
            <Box marginBottom={5}>
                <FastField
                    name="phone"
                    component={UiInputField}
                    label="Phone"
                    type="text"
                    placeholder="Enter your Phone"
                    isRequired
                />

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
                    Receive OTP
                </ButtonBorderPrimary>
            </Box>

            <Link href="/">
                <Flex className="items-center justify-center cursor-pointer">
                    <ReactIcon.IconIo.IoIosArrowRoundBack
                        size="1.5rem"
                        className="mr-2"
                    />
                    <Text fontSize="md" textTransform="capitalize">
                        {t('back_to_home')}
                    </Text>
                </Flex>
            </Link>
        </Form>
    )
}

export const FormRegisterWrapper = withFormik<MyFormProps, RegisterValue>({
    mapPropsToValues: () => ({ phone: '' }),
    validate: checkValueError(ValidateFieldsRegister),
    handleSubmit: async (values, { setSubmitting, props }) => {
        const { router } = props
        router?.push(`verify?${values.phone}`)
    },
})(Register)

export default FormRegisterWrapper
