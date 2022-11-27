import { IconButton, IconButtonProps } from "@chakra-ui/react";
import { mainColor } from "@theme/theme";

const IconButtonPrimary: React.FC<IconButtonProps> = ({ children, ...props }) => {
    return (
        <IconButton {...props} borderRadius='50%' _hover={{ backgroundColor: mainColor.white }}>
            {children}
        </IconButton>
    );
};


export default IconButtonPrimary