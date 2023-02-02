import Translation from '@components/Translate'
import Link from 'next/link'
export default function FourOhFour() {

    return (
        <>
            <h1>404 - Page Not Found</h1>
            <Link href="/">
                <Translation text='go_back_home' />
            </Link>
        </>
    )
}
