import { ReactIcon } from "@assets/icon";
import { Box, BoxProps, Flex, FlexProps } from "@chakra-ui/react";
import { mainColor } from "@theme/theme";
import { FC, useState } from "react";

type SearchBarProps = {
    placeholder?: string
    onChange?: () => void
} & FlexProps
const SearchBar: FC<SearchBarProps> = ({
    placeholder,
    onChange,
    ...props
}) => {

    const [active, setActive] = useState(false)
    const toggleFocus = () => setActive(!active)

    return (
        <Flex {...props} className="items-center py-3" >
            <ReactIcon.IconAi.AiOutlineSearch className="mx-4" size='2rem' color={active ? mainColor.black : mainColor.gray2} />
            <input placeholder={placeholder}
                onFocus={toggleFocus} onBlur={toggleFocus}
                width='100%' style={{ flex: 1, background: 'transparent', outline: 'none', border: 'none' }} onChange={onChange}
            />
        </Flex>
    );
};

export default SearchBar