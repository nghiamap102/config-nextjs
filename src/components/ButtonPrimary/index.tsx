import { Button, ButtonProps } from "@chakra-ui/react";
import { mainColor } from "@theme/theme";
import { FC } from "react";


export const ButtonPrimary: FC<ButtonProps> = ({ children, ...props }) => {
    return (
        <Button borderRadius={30} border={'1px solid black'}
            _hover={{ backgroundColor: mainColor.orange, color: mainColor.white, border: '1px solid white' }} {...props} bg={mainColor.white}
            color={mainColor.black}
        >
            {children}
        </Button>
    );
};


export default ButtonPrimary