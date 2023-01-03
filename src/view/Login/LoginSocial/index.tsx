import { IconAssets } from '@assets/index'
import { Box, Flex, Text } from '@chakra-ui/react'
import LoginSocialButton from '@components/LoginButton'
import { mainColor } from '@theme/theme'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC } from 'react'

const LoginSocial: FC = () => {
    const router = useRouter()

    const handleLoginGoogle = async (res: any) => {
        await signIn('google', {
            callbackUrl: `${window.location.origin}`
        })
    }

    return (
        <>
            <Box marginY={5} position="relative">
                <Box w="100%" bg="black" height={0.5} opacity="0.2" />
                <Text
                    position="absolute"
                    top="-1.2rem"
                    left="50%"
                    transform="translateX(-50%)"
                    bg={mainColor.white}
                    borderRadius="50%"
                    padding={2}
                >
                    Or
                </Text>
            </Box>
            <Flex className='flex-col'>
                <LoginSocialButton
                    text='sign up with google'
                    handleLogin={handleLoginGoogle}
                    icon={<Image src={IconAssets.GoogleIcon} alt="icon-gg" width={20} />}
                />
                <LoginSocialButton
                    text='sign up with Facebook'
                    color={mainColor.white}
                    bg={mainColor.blueDark}
                    icon={
                        <IconAssets.ReactIcon.IconFa.FaFacebookF
                            color={mainColor.white}
                            className="mr-2"
                        />
                    }
                />
                <LoginSocialButton
                    text='sign up with Github'
                    color={mainColor.white}
                    bg={mainColor.black}
                    icon={
                        <IconAssets.ReactIcon.IconAi.AiFillGithub
                            className="mr-2"
                        />
                    }
                />
            </Flex>
        </>
    )
}

export default LoginSocial
