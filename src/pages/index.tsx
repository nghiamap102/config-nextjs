import { gql } from '@apollo/client'
import classNames from 'classnames'
import type { NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { wrapper } from 'redux/store'
import client from 'src/common/apolloClient'
import { counterActions } from '../../redux/counter/counterSlice'
import { useAppDispatch } from '../../redux/hooks'

const Home: NextPage = ({ country }: any) => {
  const dispatch = useAppDispatch()
  // const count = useAppSelector(selectCount)
  console.log(country);
  return (
    <>
      {/* <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={({ setSubmitting }) => {
          setSubmitting(false);
        }}
      >
        {() => (
          <Form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                name="email"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                name="password"
                className="form-control"
              />
            </div>
          </Form>
        )}
      </Formik> */}
      {process.env.customKey}
      <div className={classNames({ "abc": true }, { "bcd ": true })}>
      </div>

      <button
        className="text-3xl"
        onClick={() => dispatch(counterActions.increment())}
      >
        test
      </button>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(() => async ({ locale }) => {

  const translate = await serverSideTranslations(locale as string, ['common']);
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
  });
  return {
    props: {
      ...translate,
      countries: data.countries.slice(0, 4),
    }
  }
})

export default Home
