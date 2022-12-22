import { IconButton, IconButtonProps } from "@chakra-ui/react";
import { FC } from "react";

const IconButtonPrimary: FC<IconButtonProps> = ({ children, ...props }) => {
    return (
        <IconButton {...props} borderRadius='50%' _hover={{ opacity: 0.8 }}>
            {children}
        </IconButton>
    );
};


export default IconButtonPrimary