import { Button } from "@chakra-ui/react";
import { mainColor } from "@theme/theme";
import React from "react";


export const ButtonPrimary: React.FC = ({ children, ...props }) => {
    return (
        <Button borderRadius={30} border={'1px solid'} _hover={{ backgroundColor: mainColor.orange, color: mainColor.white, border: '1px solid white' }} {...props} bg={mainColor.white}>
            {children}
        </Button>
    );
};


export default ButtonPrimary