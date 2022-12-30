import { ReactIcon } from '@assets/icon'
import { HStack, IconButton, Input } from '@chakra-ui/react'
import { FC } from 'react'
type UiNumberInputControlProps = {
    numberInput: any
}
const UiNumberInputControl: FC<UiNumberInputControlProps> = ({
    numberInput,
}) => {
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
