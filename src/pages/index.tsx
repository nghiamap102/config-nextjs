import { gql } from '@apollo/client'
import { client } from '@common/index'
import classNames from 'classnames'
import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { counterActions, selectCount } from 'redux/counter/counterSlice'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { wrapper } from 'redux/store'

const Home: NextPage = ({ country }: any) => {
    const dispatch = useAppDispatch()
    const selector = useAppSelector<any>(selectCount)
    return (
        <>
            {process.env.API_URL}
            <div className={classNames({ abc: true }, { 'bcd ': true })}></div>

            <button
                className="text-3xl"
                onClick={() => dispatch(counterActions.increment())}
            >
                test
            </button>
            {selector?.counter?.count}
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    () =>
        async ({ locale }: any) => {
            const { data } = await client.query({
                query: gql`
                    query Countries {
                        countries {
                            code
                            name
                            emoji
                        }
                    }
                `,
            })
            const translate = await serverSideTranslations(locale as string, [
                'common',
            ])
            return {
                props: {
                    ...translate,
                    countries: data.countries.slice(0, 4),
                },
            }
        },
)

export default Home
