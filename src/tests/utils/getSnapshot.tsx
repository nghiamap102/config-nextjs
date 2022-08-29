import React from 'react'
import { render } from '@testing-library/react'

interface Config {
    props: object
    description: string
}

const singleSnapTest = (tree: any, description: string) => {
    it(description, () => {
        expect(tree).toMatchSnapshot()
    })
}

const testSnapshots = (Component: any, configs: Config[]) => {
    describe('snapshots', () => {
        configs.forEach(config => {
            const { props, description } = config
            const { container } = render(<Component {...props} />)

            singleSnapTest(container, description)
        })
    })
}

export { testSnapshots }
