import { ReactIcon } from '@assets/icon'
import { HStack, IconButton, Input, UseNumberInputProps, useNumberInput } from '@chakra-ui/react'
import { FC } from 'react'
type UiNumberInputControlProps = {
    onChange?: any
    value?: number
    disable?: boolean
} & UseNumberInputProps
const UiNumberInputControl: FC<UiNumberInputControlProps> = ({
    onChange,
    value,
    disable,
    ...props
}) => {

    const numberInput = useNumberInput({
        step: 1,
        defaultValue: value || 1,
        min: 1,
        onChange: onChange,
        ...props
    })


    const a = () => {
        if (disable) {
            return null
        }
        return numberInput.getDecrementButtonProps()
    }

    return (
        <HStack>
            <IconButton
                {...a()}
                aria-label="btn"
                icon={<ReactIcon.IconAi.AiOutlineMinus />}
                size="sm"
                disabled={disable}
            />
            <Input {...numberInput.getInputProps()} disabled={disable} />
            <IconButton
                aria-label="btn"
                icon={<ReactIcon.IconAi.AiOutlinePlus />}
                size="sm"
                {...numberInput.getIncrementButtonProps()}
                disabled={disable}
            />
        </HStack>
    )
}
export default UiNumberInputControl
