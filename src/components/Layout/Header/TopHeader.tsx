import { ReactIcon } from '@assets/icon'
import { Box, Flex } from '@chakra-ui/react'
import ListItem from '@components/Items/ListItem'
import PopOver from '@components/PopOver'
import Translation from '@components/Translate'
import { LOGOUT } from '@redux/auth/authAction'
import authService from '@redux/auth/authService'
import { useAppDispatch } from '@redux/hooks'
import { mainColor } from '@theme/common/color'
import { ACCOUNTROUTE } from 'contants/route'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const TopHeader = () => {
    const dispatch = useAppDispatch()
    const { data } = useSession()
    const router = useRouter()

    const handleChangeLang = (locale: string) => {
        router.push('/', '/', { locale: locale })
    }

    // if have bug, auto show this bug and reload or sth
    const handleSignOut = async () => {
        dispatch({ type: LOGOUT, payload: { user_id: data?.user._id } })
        signOut({ callbackUrl: '/login' })
    }

    return (
        <>
            <Flex className='items-center justify-between' px={5} pt={2} pb={3}>
                <Flex className='items-center'>
                    <Translation text='contact' firstCapital />{':'}
                    <Link href='https://github.com/nghiamap102' >
                        <a target="_blank" rel="noopener noreferrer"
                            className='rounded-full p-1 mx-1' style={{ backgroundColor: mainColor.white, color: mainColor.orange }}
                        >
                            <ReactIcon.IconFa.FaFacebookF size='1rem' />
                        </a>
                    </Link>
                    <Link href='https://github.com/nghiamap102'>
                        <a target="_blank" rel="noopener noreferrer"
                            className='rounded-full p-1 mx-1' style={{ backgroundColor: mainColor.white, color: mainColor.orange }}
                        >
                            <ReactIcon.IconBs.BsGithub size='1rem' />
                        </a>
                    </Link>
                </Flex>

                <Flex className='items-center'>
                    <PopOver
                        popoverTrigger={(
                            <Flex className='rounded-full p-1 mx-1 cursor-pointer items-center' color={mainColor.white} >
                                <ReactIcon.IconBi.BiUserCircle size='1.5rem' className='mx-1' />
                                <Translation text={router.locale} className='uppercase' />
                            </Flex>
                        )}
                        popoverBody={(
                            <Box minW='10rem'>
                                {router.locales?.map(items => (
                                    <ListItem py={2} px={4} cursor='pointer' key={items} onClick={() => handleChangeLang(items)}>{items.toUpperCase()}</ListItem>
                                ))}
                            </Box>
                        )}
                    />
                    {!data?.user && (
                        <Link href='/login'>
                            <Flex className='cursor-pointer'>
                                <ReactIcon.IconBi.BiUserCircle size='1.5rem' className='mx-1' />
                                <Translation text='login' firstCapital />
                            </Flex>
                        </Link>
                    )}

                    {data?.user && <PopOver
                        popoverTrigger={(
                            <Flex className='rounded-full p-1 mx-1 cursor-pointer items-center' color={mainColor.white} >
                                <ReactIcon.IconBi.BiUserCircle size='1.5rem' className='mx-1' />
                                {data?.user ? data?.user?.name : <Translation text='login' />}
                            </Flex>
                        )}
                        popoverBody={(
                            <Box minW='10rem'>
                                <Link href={ACCOUNTROUTE.PROFILE}><ListItem py={2} px={4} cursor='pointer'><Translation text='my_account' firstCapital /></ListItem></Link>
                                <ListItem p={2} px={4} cursor='pointer' onClick={handleSignOut}><Translation text='logout' firstCapital /></ListItem>
                            </Box>
                        )}
                    />}

                </Flex>
            </Flex>
        </>
    );
};

export default TopHeader