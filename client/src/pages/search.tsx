import Overlay from '@components/Overlay'
import productService from '@redux/product/productService'
import { mainColor } from '@theme/theme'
import SearchView from '@view/Search'
import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { HashLoader } from 'react-spinners'
import { wrapper } from 'redux/store'

const Search: NextPage = (props: any) => {

    const router = useRouter()
    const { data } = props
    useEffect(() => {
        data && data.length < 1 && router.push('/')
    }, [data, router])

    if (props.data && props.data.length < 1) {
        return (
            <Overlay bg={mainColor.white} >
                <HashLoader
                    speedMultiplier={2}
                    color={mainColor.red3}
                    loading={true}
                    size={100}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </Overlay >
        )
    }

    return <SearchView />
}

export const getServerSideProps = wrapper.getServerSideProps(() => async ({ locale, query }) => {
    const translate = await serverSideTranslations(locale as string, ['common'])
    const res = await productService.fetchCategoryChild(query.cat_id)
    const data = res.data || []
    return {
        props: {
            ...translate,
            data
        },
    }
},
)

export default Search
