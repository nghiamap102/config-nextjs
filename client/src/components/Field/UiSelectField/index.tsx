import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'
import { isEmpty } from 'lodash'
import { FC, useEffect } from 'react'
import Select from 'react-select'

interface UiVerifyFieldProps {
    field: { name: string; value: any; onChange: () => void }
    form: { errors: { [key: string]: any }; touched: { [key: string]: any } }
    type: string
    label: string
    placeholder?: string
    disabled?: boolean
    isRequired?: boolean
    nextFocusInput?: () => void
    options: []
    _onChange?: () => void
    defaultValue: string
}

const UISelectField: FC<UiVerifyFieldProps> = ({
    field,
    form,
    label = '',
    placeholder = '',
    disabled = false,
    options,
    _onChange,
    defaultValue
}) => {
    const { name, value } = field
    const { errors, touched } = form

    const showError = errors[name] && touched[name]
    const selectedOption: any = options.find((option: any) => option.value === (value || defaultValue))

    const handleChange = (selected: any) => {
        const selectedValue = selected ? selected.value : selected
        // const changeEvent = {
        //     target: {
        //         name,
        //         value: selectedValue
        //     }
        // }
        // field.onChange(changeEvent)
        field.onChange()
        // _onChange && _onChange(changeEvent)
        _onChange && _onChange()
    }

    useEffect(() => {
        if (!isEmpty(selectedOption)) {
            // const changeEvent = {
            //     target: {
            //         name,
            //         value: selectedOption.value
            //     }
            // }
            // _onChange && _onChange(changeEvent)
            _onChange && _onChange()
        }
    }, [selectedOption, _onChange, name])

    return (
        <FormControl isInvalid={showError}>
            {label && (
                <FormLabel htmlFor={name} fontSize='15px'>
                    {label}
                </FormLabel>
            )}
            <Select
                id={name}
                instanceId={name}
                defaultValue
                {...field}
                value={selectedOption || defaultValue || ''}
                onChange={handleChange}
                isDisabled={disabled}
                placeholder={placeholder}
                options={options}
                components={{
                    IndicatorSeparator: () => null
                }}
            />
            {showError && <FormErrorMessage>{errors[name]}</FormErrorMessage>}
        </FormControl>
    )
}

export default UISelectField
