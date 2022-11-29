import { ReactIcon } from '@assets/icon';
import {
    Box,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement
} from '@chakra-ui/react'
import { FC, useState } from 'react'

export interface UiInputFieldProps {
    field: { name: string }
    form: { errors: { [key: string]: any }; touched: { [key: string]: any } }
    type: string
    label?: string
    placeholder?: string
    disabled?: boolean
    autoComplete?: string
    // onFocus?: any
    isRequired?: boolean
}

const UiInputField: FC<UiInputFieldProps> = ({
    field,
    form,
    type = 'text',
    label = '',
    placeholder = '',
    autoComplete = 'off',
    disabled = false,
    isRequired = false
}) => {
    const [show, setShow] = useState<boolean>(type === 'password' ? false : true)
    const handleClick = () => setShow(!show)
    const { name } = field
    const { errors, touched } = form
    const showError = errors[name] && touched[name]

    return (
        <>
            <FormControl isInvalid={showError} isRequired={isRequired} marginBottom={5}>
                {label && (
                    <FormLabel htmlFor={name} fontSize='15px'>
                        {label}
                    </FormLabel>
                )}
                <InputGroup>
                    <Input
                        {...field}
                        id={name}
                        type={!show ? type : 'text'}
                        placeholder={placeholder}
                        autoComplete={autoComplete}
                        disabled={disabled}
                        borderRadius='8'
                    />
                    {type === 'password' && (
                        <InputRightElement zIndex={0}>
                            <Box bg='none' onClick={handleClick}>
                                {show &&  <ReactIcon.IconAi.AiOutlineEye/>}
                                {!show &&  <ReactIcon.IconAi.AiOutlineEyeInvisible/>}
                            </Box>
                        </InputRightElement>
                    )}
                </InputGroup>
                {showError && <FormErrorMessage>{errors[name]}</FormErrorMessage>}
            </FormControl>
        </>
    )
}

export default UiInputField