import { FC } from "react"

type SelectItemProps = {
    options?: any
}

const SelectItem: FC<SelectItemProps> = ({
    options
}) => {
    return (
        <div>{options}</div>
        // <Select size='md' mx={2} _focus={{ borderColor: mainColor.orange, boxShadow: `0px 0px 1px 1px ${mainColor.orange}` }} >
        //     {YEAR.map(item => <option value={item} key={item} selected={date_of_birth.getFullYear() === item}>{item}</option>)}
        // </Select>
    )
}

export default SelectItem