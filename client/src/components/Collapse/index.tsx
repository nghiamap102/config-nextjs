import { Box, Flex } from "@chakra-ui/react";
import Translation from "@components/Translate";
import { mainColor } from "@theme/theme";
import { useRouter } from "next/router";
import { FC, useRef, useState } from "react";
import CollapseItem from "./CollapseItem";

type CollapseProps = {
    childrens?: {
        linkTo: string
        text: string
    }[]
    parentLink?: string
    title?: string
    icon?: any
}

const Collapse: FC<CollapseProps> = ({
    childrens,
    icon,
    title,
    parentLink,
}) => {

    const router = useRouter()
    const [active, setActive] = useState(false)
    const ref = useRef<any>(null)
    const handleToggle = () => {
        childrens && childrens?.some(item => router.asPath === item.linkTo) && setActive(!active)
        childrens && !childrens?.some(item => router.asPath === item.linkTo) && router.push(childrens[0].linkTo, undefined, { shallow: true })
        !childrens && parentLink && router.push(parentLink, undefined, { shallow: true })
    }

    return (
        <Box >
            <Flex onClick={handleToggle} className="items-center px-2 cursor-pointer" my={1.5} _hover={{ color: mainColor.orange, transition: '0.3s all' }}>
                {icon}
                <Translation text={title || ''} firstCapital ml={4} color={router.asPath === parentLink && mainColor.orange || 'currentcolor'} />
            </Flex>
            <CollapseItem ref={ref} height={ref.current.scrollHeight} childrens={childrens} active={active} />
        </Box>


    )
}

export default Collapse
