import { validateEmail, validateMinLength, validateRequired } from "@utils/validations";

const ValidateFieldsLogin = {
    emailOrUsername: [
        {
            validator: validateRequired,
            code: 'Email or Username is required'
        },
        {
            validator: validateEmail,
            code: 'Please provide a valid email address or username'
        },
    ],
    password: [
        {
            validator: validateRequired,
            code: 'Password is required'
        },
        {
            validator: validateMinLength(8),
            code: `Password need to be at least 8 character`,
        }
    ]
}
export default ValidateFieldsLogin