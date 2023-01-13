import { Box, ButtonProps } from '@chakra-ui/react';
import ButtonBorderPrimary from '@components/Button/ButtonBorderPrimary';
import Translation from '@components/Translate';
import { FC } from 'react';

type LoginSocialButtonProps = {
    text: string
    loading?: boolean
    icon?: any
    handleLogin?: (res: any) => Promise<void>
} & ButtonProps;
const LoginSocialButton: FC<LoginSocialButtonProps> = ({
    text,
    icon,
    loading,
    handleLogin,
    ...props
}) => {

    return (
        <ButtonBorderPrimary
            onClick={handleLogin}
            disabled={loading}
            _hover={{ opacity: 0.5 }}
            borderColor="blackAlpha.200"
            marginY={2}
            py="6"
            {...props}
        >
            <Box className="mr-2">
                {icon}
            </Box>
            <Translation className='capitalize' text={text} type={['login']} />
        </ButtonBorderPrimary>
    );
};
export default LoginSocialButton