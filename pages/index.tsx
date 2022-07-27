import type { NextPage } from 'next'
import { useState } from 'react'
import { counterActions, selectCount } from '../redux/counter/counterSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'

const Home: NextPage = () => {
    const dispatch = useAppDispatch()
    const count = useAppSelector(selectCount)
    console.log(count)
    const [customer, setCustomer] = useState({
        name: '',
        company: '',
        email: '',
        phone: '',
        question: '',
    })

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

            <button
                className="text-3xl"
                onClick={() => dispatch(counterActions.increment())}
            >
                test
            </button>
        </>
    )
}

export default Home
