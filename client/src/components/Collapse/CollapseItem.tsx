import { Box } from "@chakra-ui/react";
import Translation from "@components/Translate";
import { mainColor } from "@theme/theme";
import { Ref } from "models/common";
import Link from "next/link";
import { useRouter } from "next/router";
import { forwardRef } from "react";
type CollapseItemProps = {
    childrens?: {
        linkTo: string
        text: string
    }[]
    active?: boolean
}


const CollapseItem = forwardRef<Ref, CollapseItemProps>((props, ref) => {
    const { active, childrens } = props
    const router = useRouter()
    const checkHeighCollapse = () => {
        if (active) {
            return ref.current.scrollHeight
        }
        else if (childrens?.some(item => router.asPath === item.linkTo)) {
            return 'auto'
        }
        return 0
    }


    return (
        <Box ref={ref} pl={12} h={checkHeighCollapse()} transition={'0.3s all'} overflow='hidden'>
            {childrens?.map(item => (
                <Link key={item.text} href={item.linkTo} shallow>
                    <Box>
                        <Translation text={item.text} firstCapital my={1.5} color={router.asPath === item.linkTo && mainColor.orange} className="hover-primary cursor-pointer" />
                    </Box>
                </Link>
            ))}
        </Box>
    )
})

CollapseItem.displayName = 'CollapseItem'
export default CollapseItem