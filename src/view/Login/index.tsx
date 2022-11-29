import { Button, Flex } from "@chakra-ui/react"
import UiInputField from "@components/Field/UiInputField"
import { mainColor } from "@theme/theme"
import { checkValueError } from "@utils/helper"
import { FastField, Form, FormikProps, withFormik } from "formik"
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

const Login: FC<LoginProps & FormikProps<LoginValue>> = ({ isSubmitting, isError }) => {
    return (
        <Form>
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


            <Button type="submit" isDisabled={isSubmitting} bg={mainColor.orange} color={mainColor.white}>
                Login
            </Button>

            <Flex direction='column'>
                <LoginSocial />
            </Flex>

        </Form>
    )
}

export const FormLoginWrapper = withFormik<MyFormProps, LoginValue>({
    mapPropsToValues: () => ({ emailOrUsername: '', password: '' }),
    validate: checkValueError(ValidateFieldsLogin),
    handleSubmit: async (values, { setSubmitting, props }) => {
        const { router } = props
        setSubmitting(false);
        router && router.push('/')
    }
})(Login)

export default FormLoginWrapper
