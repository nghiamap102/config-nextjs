import { FormControl, Input } from '@chakra-ui/react'
import React, { FC } from 'react'

export interface UiVerifyFieldProps {
  field: { name: string; onChange: () => void }
  form: { errors: { [key: string]: any }; touched: { [key: string]: any } }
  type: string
  placeholder?: string
  disabled?: boolean
  isRequired?: boolean
  nextFocusInput?: () => void
}

const UiVerifyField: FC<UiVerifyFieldProps> = ({
  field,
  form,
  type = 'text',
  placeholder = '',
  disabled = false,
  isRequired = false,
  nextFocusInput
}) => {
  const { name } = field
  const { errors, touched } = form
  const showError = errors[name] && touched[name]

  const handleChange = (selected: any) => {
    console.log(selected)
    // const { maxLength, value } = selected.target
    field.onChange()
    // field.onChange(selected)
    // if (typeof nextFocusInput === 'function') nextFocusInput({ maxLength, value, name })
    if (typeof nextFocusInput === 'function') nextFocusInput()
  }

  return (
    <>
      <FormControl mx='10px' isInvalid={showError} isRequired={isRequired}>
        <Input
          {...field}
          shadow='0'
          border='0'
          borderBottom='1px'
          borderRadius='0'
          w='40px'
          id={name}
          onChange={handleChange}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          maxLength={1}
        />
      </FormControl>
    </>
  )
}

export default UiVerifyField
