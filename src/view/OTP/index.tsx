import { Button, Center, Flex, Text } from '@chakra-ui/react'
import { FastField, Form, FormikProps, withFormik } from 'formik'
import get from 'lodash/get'
import { FC } from 'react'
import UiVerifyField from '@components/Field/UiVerifyField'
import CountDown from '@components/CountDown'
import { mainColor } from '@theme/theme'
import { checkValueError } from '@utils/helper'
import validateFields from './ValidateFields'
import nextFocusInput from '@utils/nextFocusInput'
import authService from '@redux/auth/authService'
import Image from 'next/image'

interface OtpProps {
    errors?: {
        codeOTP: string
    }
    setPhoneOrEmailOTP: () => void
    isTitle?: boolean
}

interface OtpValue {
    text_1: string
    text_2: string
    text_3: string
    text_4: string
    text_5: string
    text_6: string
}

interface MyFormProps {
    errors?: {
        codeOTP: string
    }
    setPhoneOrEmailOTP: () => void
    setStep?: () => void
    setIsVerified?: () => void
    isTitle?: boolean
    namePage?: string
    uid: string
    hash: string
    dispatch: () => void
    onOpen: () => void
}

const Otp: FC<OtpProps & FormikProps<OtpValue>> = ({ errors, isSubmitting, setPhoneOrEmailOTP, isTitle = true }) => {
    return (
        <Form>
            <Image
                src='data:image/png;base64,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' alt='qr-code-img-trungquandev'
                height={60}
                width={60}
            />
            {isTitle && (
                <Text fontSize='17' my='24px' style={{ fontWeight: 600 }} className='text-center'>
                    Verify Phone number
                </Text>
            )}
            <Text fontSize='15' my='24px'>
                A security code has been send to your number phone! Please input the code here.
            </Text>
            <Flex justify='center'>
                <Center>
                    <FastField name='text_1' component={UiVerifyField} type='text' nextFocusInput={nextFocusInput} />
                </Center>
                <Center>
                    <FastField name='text_2' component={UiVerifyField} type='text' nextFocusInput={nextFocusInput} />
                </Center>
                <Center>
                    <FastField name='text_3' component={UiVerifyField} type='text' nextFocusInput={nextFocusInput} />
                </Center>
                <Center>
                    <FastField name='text_4' component={UiVerifyField} type='text' nextFocusInput={nextFocusInput} />
                </Center>
                <Center>
                    <FastField name='text_5' component={UiVerifyField} type='text' nextFocusInput={nextFocusInput} />
                </Center>
                <Center>
                    <FastField name='text_6' component={UiVerifyField} type='text' nextFocusInput={nextFocusInput} />
                </Center>
            </Flex>
            {errors?.codeOTP && (
                <Text align='center' fontSize='15' my='24px' color='red'>
                    {errors?.codeOTP}
                </Text>
            )}
            <Text align='center' fontSize='15' my='24px'>
                Not recieve the code? Resend Code in <CountDown setPhoneOrEmailOTP={setPhoneOrEmailOTP} />
            </Text>
            <Button
                type='submit'
                borderRadius='8'
                isDisabled={isSubmitting}
                colorScheme='cyan'
                w='full'
                style={{ color: mainColor.white, background: mainColor.orange }}
            >
                Submit
            </Button>
        </Form>
    )
}

export const OtpWrapper = withFormik<MyFormProps, OtpValue>({
    mapPropsToValues: () => {
        return {
            text_1: '',
            text_2: '',
            text_3: '',
            text_4: '',
            text_5: '',
            text_6: ''
        }
    },
    validate: checkValueError(validateFields),
    handleSubmit: async (values, { setSubmitting, props, setFieldError }) => {
        const { setStep, setIsVerified, namePage, uid, hash, dispatch, onOpen, setPhoneOrEmailOTP } = props

        const otp = `${values.text_1}${values.text_2}${values.text_3}${values.text_4}${values.text_5}${values.text_6}`
        try {
            const response: any = await authService.verify({ uid, hash, otp })
            // if (response.access_token) {
            //     if (namePage === 'VerifiedAccount') {
            //         setIsVerified && setIsVerified(true)
            //         setStep && setStep(1)
            //     } else {
            //         localStorage.setItem('access_token', response.access_token)
            //         localStorage.setItem('refresh_token', response.refresh_token)
            //         setStep && setStep(3)
            //     }
            // dispatch(updateUrlReturn('/'))
            // onOpen && onOpen()
            // }
        } catch (error: any) {
            const errorMessage = get(error, 'response.data.message', '')
            setFieldError('codeOTP', errorMessage)
            // dispatch(updateErrorMessage(errorMessage))
            // onOpen && onOpen()
        }

        setSubmitting(false)
    }
})(Otp)

export default OtpWrapper
