import { ReactIcon } from "@assets/icon";
import { Box, BoxProps, Flex } from "@chakra-ui/react";
import { mainColor } from "@theme/theme";
import { DOTS } from "contants/common";
import usePagination from "hooks/usePagination";
import { FC, useState } from "react";

type PaginationProps = {
    totalPage?: number
    onSelect?: (page: number) => void
    onFirstPage?: () => void
    onFinalPage?: () => void
};
const Pagination: FC<PaginationProps> = ({
    onSelect,
    totalPage,
}) => {
    const { arrayItems, currentPage, onPageChange } = usePagination({ totalPage })

    const handleChange = (page: number) => {
        onPageChange(page)
        typeof onSelect === "function" && onSelect(page)
    }

    return (
        <Flex gap={3} className="justify-end my-5 items-center">
            <ReactIcon.IconTf1.TfiAngleDoubleLeft onClick={() => handleChange(1)} className="cursor-pointer" size='0.8rem' />
            <ReactIcon.IconTf1.TfiAngleLeft onClick={() => handleChange(currentPage - 1)} className="cursor-pointer" size='0.8rem' />

            <Flex gap={2}>
                {arrayItems?.map((item, index) => {
                    if (item === DOTS) {
                        return <PaginationItem key={index} _hover={{ color: mainColor.orange }} border='none' paginate={item} />
                    } else {
                        return (
                            <PaginationItem active={currentPage === item} key={index} paginate={item} handleChange={() => handleChange(item)} />
                        )
                    }
                })}
            </Flex>

            <ReactIcon.IconTf1.TfiAngleRight onClick={() => handleChange(currentPage + 1)} className="cursor-pointer" size='0.8rem' />
            <ReactIcon.IconTf1.TfiAngleDoubleRight onClick={() => handleChange(totalPage)} className="cursor-pointer" size='0.8rem' />
        </Flex>
    );
};

type paginationItemProps = {
    active?: boolean
    handleChange?: () => void
    paginate?: string
} & BoxProps
const PaginationItem: FC<paginationItemProps> = ({ active, handleChange, paginate, ...props }) => {
    return (
        <Box
            {...props}
            className="monospace px-3 py-1 cursor-pointer"
            _hover={props._hover || { bg: mainColor.orange, color: mainColor.white }}
            border={props.border || `1px solid ${mainColor.gray5}`}
            onClick={handleChange}
            bg={active && mainColor.orange}
            color={active && mainColor.white}
        >
            {paginate}
        </Box>
    )
}

export default Pagination