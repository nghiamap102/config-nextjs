import { ReactIcon } from '@assets/icon';
import { Flex, FlexProps, Text } from '@chakra-ui/react';
import { mainColor } from '@theme/theme';
import { useRouter } from 'next/router';
import { FC } from 'react';

const Breadcrumb: FC<FlexProps> = ({ ...props }) => {

    const router = useRouter()
    const breadCrumb = router.pathname.split('/').filter(items => items)

    return (
        <Flex {...props} >
            {breadCrumb.map((item, index) => {
                if (item.indexOf('[') > -1) {
                    return <Text color={mainColor.gray3} className='capitalize' key={item}>{`${breadCrumb[index - 1]} Detail`}</Text>
                }
                return (
                    <Flex className='items-center mr-2' gap={2} key={item}>
                        <Text className='capitalize' color={mainColor.blueDark}>{item}</Text>
                        {index + 1 !== breadCrumb.length && <ReactIcon.IconTf1.TfiAngleRight size='0.8rem' />}
                    </Flex>
                )
            })}
        </Flex>
    );
};

export default Breadcrumb