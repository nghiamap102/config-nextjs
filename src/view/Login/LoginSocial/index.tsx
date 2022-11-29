import { ReactIcon } from "@assets/icon";
import { Button } from "@chakra-ui/react";
import ButtonPrimary from "@components/ButtonPrimary";
import { mainColor } from "@theme/theme";
import { FC } from "react";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from "react-google-login";

const LoginSocial: FC = () => {

    return (
        <>
            <GoogleLogin
                clientId={'123456'}
                buttonText='Login'
                render={(renderProps) => (
                    <ButtonPrimary
                        aria-label="icon-gg"
                        borderRadius='8'
                        p='8px'
                        mx='8px'
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        bg={mainColor.blueDark}
                        _hover={{ background: 'light-blue' }}
                        w='100%'
                    >
                        <ReactIcon.IconAi.AiOutlineGooglePlus />
                        Sign up with Google
                    </ButtonPrimary>
                )}
                // onSuccess={responseGoogle}
                // onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
            <FacebookLogin
                appId={'123456789'}
                callback={() => console.log('ab')}
                render={(renderProps) => (
                    <Button
                        borderRadius={20}
                        onClick={renderProps.onClick}
                        isDisabled={renderProps.isDisabled}
                        w='100%'
                        bg={mainColor.blueDark}
                        color={mainColor.white}
                    >
                        <ReactIcon.IconFa.FaFacebookF color={mainColor.white} />
                        Sign up with Facebook
                    </Button>
                )}
            />
        </>
    );
};

export default LoginSocial
