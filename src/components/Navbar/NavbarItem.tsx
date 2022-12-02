import { ImageAssets } from '@assets/index';
import { Box, Text } from '@chakra-ui/react';
import SubMenu from '@components/SubMenu';
import { mainColor } from '@theme/theme';
import { renderColor } from '@utils/helper';
import classNames from 'classnames';
import Image from 'next/image';
import { useState } from 'react';


type NavbarItemProps = {
    text?: any
    tag?: 'new' | 'hot' | 'sale';
    type: 'submenu' | 'categories' | 'dropdown'
};
const NavbarItem: FC<NavbarItemProps> = ({
    text,
    type,
    tag,
}) => {

    const [active, setActive] = useState(false)

    const hanldeMouseEnter = () => {
        setActive(true);
    }

    const hanldeMouseLeave = () => {
        setActive(false);
    }

    const renderEle = () => {
        const ele = { left: '0px', width: '0pxF' }
        switch (type) {
            case 'categories':
                return {
                    ...ele, left: '10px', width: '20rem'
                }
            case 'submenu':
                return {
                    ...ele, width: '15rem'
                }

            case 'dropdown':
                return {
                    ...ele, left: '2%', width: '93%'
                }
            default:
                return null;
        }
    }


    return (
        <Box position={type === 'dropdown' ? 'unset' : 'relative'} onMouseLeave={hanldeMouseLeave}>
            <Box position={'relative'}>
                <Box padding={'0.8rem 1.2rem'} textTransform={'capitalize'} cursor={'pointer'} onMouseEnter={hanldeMouseEnter} color={`${tag === 'sale' && mainColor.saleTag}`}>
                    {text}
                </Box>

                <Text position={'absolute'} top={-3} right={0} bg={`${renderColor(tag)}`} color={mainColor.white} lineHeight={1.5} className='px-2 capitalize'>
                    {tag}
                </Text>
            </Box>


            <Box className={classNames(active ? 'fade-up' : 'hidden', type === 'dropdown' ? 'py-2' : 'py-1')}
                position={'absolute'} left={renderEle()?.left} top='100%' width={renderEle()?.width}
                sx={{ zIndex: 99 }}
            >
                <Box paddingTop={type === 'dropdown' ? 4 : 0} bg={mainColor.white}>
                    <SubMenu
                        icon={<Image src={ImageAssets.Electronics} alt='Electronis' className='image' />}
                        text="Electronics"
                        handleMouseEnter={() => setActive(true)}
                    />
                    <SubMenu
                        icon={<Image src={ImageAssets.Electronics} alt='Electronis' className='image' />}
                        text="Electronics"
                        handleMouseEnter={() => setActive(true)}
                    />
                    <SubMenu
                        icon={<Image src={ImageAssets.Electronics} alt='Electronis' className='image' />}
                        text="Electronics"
                        handleMouseEnter={() => setActive(true)}
                    />
                    <SubMenu
                        icon={<Image src={ImageAssets.Electronics} alt='Electronis' className='image' />}
                        text="Electronics"
                        handleMouseEnter={() => setActive(true)}
                    />
                    <SubMenu
                        icon={<Image src={ImageAssets.Electronics} alt='Electronis' className='image' />}
                        text="Electronics"
                        handleMouseEnter={() => setActive(true)}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default NavbarItem