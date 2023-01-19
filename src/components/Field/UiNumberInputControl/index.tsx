import { ReactIcon } from '@assets/icon'
import { HStack, IconButton, Input, useNumberInput } from '@chakra-ui/react'
import { FC } from 'react'
type UiNumberInputControlProps = {
    onChange?: any
    value?: number
}
const UiNumberInputControl: FC<UiNumberInputControlProps> = ({
    onChange,
    value
}) => {

    const numberInput = useNumberInput({
        step: 1,
        defaultValue: value,
        min: 0,
        precision: 0,
        onChange: onChange
    })


    return (
        <HStack>
            <IconButton
                {...numberInput.getDecrementButtonProps()}
                aria-label="btn"
                icon={<ReactIcon.IconAi.AiOutlineMinus />}
                size="sm"
            />
            <Input {...numberInput.getInputProps()} />
            <IconButton
                aria-label="btn"
                icon={<ReactIcon.IconAi.AiOutlinePlus />}
                size="sm"
                {...numberInput.getIncrementButtonProps()}
            />
        </HStack>
    )
}
export default UiNumberInputControl
