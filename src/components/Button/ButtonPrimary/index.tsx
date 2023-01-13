import { Button, ButtonProps } from '@chakra-ui/react';
import { mainColor } from '@theme/theme';
import { FC } from 'react'

type ButtonPrimaryProps = ButtonProps;

const ButtonPrimary: FC<ButtonPrimaryProps> = ({ children, ...rest }) => {
    return (
        <Button bg={mainColor.orange} color={mainColor.white} _hover={{ opacity: 0.8 }} {...rest}>
            {children}
        </Button>
    );
};
export default ButtonPrimary