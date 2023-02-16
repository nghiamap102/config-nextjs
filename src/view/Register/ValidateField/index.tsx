import {
    validateMobile,
    validateMobileLength,
    validateRequired
} from '@utils/validations'

const ValidateFieldsRegister = {
    phone: [
        {
            validator: validateRequired,
            code: 'Phone is required',
        },
        {
            validator: validateMobile,
            code: 'Please provide a valid Phone',
        },
        
        {
            validator: validateMobileLength,
            code: 'Phone must have 10 characters ',
        },
        
    ],
}
export default ValidateFieldsRegister
