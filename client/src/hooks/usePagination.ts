import { DOTS } from "contants/common";
import { range } from "lodash";
import { useMemo, useState } from "react";

const usePagination = ({ totalPage }) => {

    const [currentPage, setCurrentPage] = useState(1)


    const onPageChange = (page: number) => {
        setCurrentPage(page)
    }

    const arrayItems = useMemo(() => {

        const firstPageIndex = 1;
        const lastPageIndex = totalPage;

        if (range(currentPage, firstPageIndex).length < 4) {
            const middleRange = range(firstPageIndex, 6)
            return [...middleRange, DOTS, lastPageIndex]
        }

        if (range(currentPage, firstPageIndex).length >= 4 && range(currentPage, lastPageIndex).length > 4) {
            const middleRange = range(currentPage - 1, currentPage + 2)
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
        }

        if (range(currentPage, lastPageIndex).length <= 4) {
            const middleRange = range(lastPageIndex - 5, lastPageIndex)
            return [firstPageIndex, DOTS, ...middleRange]
        }

        return [1, 2]
    }, [totalPage, currentPage])


    return { currentPage, onPageChange, arrayItems }
}

export default usePagination;

