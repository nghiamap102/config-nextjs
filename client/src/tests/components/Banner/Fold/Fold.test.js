/* eslint-disable no-undef */
import Fold from 'src/components/Header2'
import { testSnapshots } from 'src/tests/utils/getSnapshot'
describe('<Banner />', () => {
    testSnapshots(Fold, [
        {
            props: {},
            description: 'render Banner Fold default',
        },
    ])
})
it('will check the matchers and pass', () => {
    const user = {
        createdAt: new Date(),
        id: Math.floor(Math.random() * 20),
        name: 'LeBron James',
    }

    expect(user).toMatchSnapshot({
        createdAt: expect.any(Date),
        id: expect.any(Number),
    })
})

it('will check the values and pass', () => {
    const user = undefined

    expect(user).toMatchSnapshot()
})
