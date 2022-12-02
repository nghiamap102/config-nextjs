import { Box, Flex, Text } from "@chakra-ui/react";
import { mainColor } from "@theme/theme";
import classNames from "classnames";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

type BoxIntroProps = {
    content?: string
};
const BoxIntro: FC<BoxIntroProps> = ({
    content
}) => {
    const { t } = useTranslation()
    const [active, setActive] = useState(false)

    const hanleMouse1 = () => {
        setActive(true)
    }

    const hanleMouse2 = () => {
        setActive(false)
    }

    return (
        <Flex onMouseEnter={hanleMouse1} onMouseLeave={hanleMouse2} transition='0.3s all' className='absolute overflow-hidden top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center' >
            <Box bg={mainColor.white} className={classNames(active ? 'slide-up' : 'slide-down', 'absolute')} w='100%' h='100%' zIndex='-1' />
            <Box border={`2px solid ${mainColor.white}`} p={10} bg='transparent' >
                <Text fontSize={'3xl'} textTransform='capitalize' color={active ? mainColor.orange : mainColor.white} marginBottom={7}>{t('welcome to ecommerce')}</Text>
                <Text fontSize={'xl'} color={active ? mainColor.black : mainColor.white} >
                    {content}
                </Text>
            </Box>
        </Flex>
    );
};

export default BoxIntro