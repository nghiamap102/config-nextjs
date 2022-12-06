import { IconAssets } from "@assets/index";
import { Box, Button, Text } from "@chakra-ui/react";
import ButtonPrimary from "@components/ButtonPrimary";
import { mainColor } from "@theme/theme";
import { isNonEmptyString } from "@utils/validations";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";
import { useCookies } from "react-cookie";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from "react-google-login";

const LoginSocial: FC = () => {

    const [cookies, setCookie] = useCookies(['access_token']);
    const router = useRouter()
    const hanldeSuccessGG = (res: any) => {
        console.log(res);
        setCookie('access_token', res.accessToken)
        router.push('/')
    }

    return (
        <>
            <GoogleLogin
                clientId={isNonEmptyString(process.env.CLIENT_ID)}
                render={(renderProps) => (
                    <ButtonPrimary
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        _hover={{ opacity: 0.5 }}
                        borderColor='blackAlpha.200'
                        marginY={2}
                        py='6'
                    >
                        <Box className='mr-2'>
                            <Image src={IconAssets.GoogleIcon} alt='icon-gg' width={20} />
                        </Box>
                        <Text>
                            Sign up with Google
                        </Text>
                    </ButtonPrimary>
                )}
                onSuccess={hanldeSuccessGG}
                onFailure={() => console.log('GG failure')}
            />

            <Box marginY={5} position='relative'>
                <Box w='100%' bg='black' height={0.5} opacity='0.2' />
                <Text position='absolute' top='-1.2rem' left='50%' transform='translateX(-50%)' bg={mainColor.white} borderRadius='50%' padding={2}>Or</Text>
            </Box>

            <FacebookLogin
                appId={'123456789'}
                callback={() => console.log('ab')}
                render={(renderProps) => (
                    <Button
                        borderRadius={20}
                        onClick={renderProps.onClick}
                        isDisabled={renderProps.isDisabled}
                        bg={mainColor.blueDark}
                        color={mainColor.white}
                        _hover={{ opacity: 0.8 }}
                        marginY={2}
                        py='6'
                    >
                        <IconAssets.ReactIcon.IconFa.FaFacebookF color={mainColor.white} className='mr-2' />
                        Sign up with Facebook
                    </Button>
                )}
            />
        </>
    );
};

export default LoginSocial
