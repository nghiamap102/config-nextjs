import { useTranslation } from 'next-i18next'
import Link from 'next/link'
export default function FourOhFour() {
    const { t } = useTranslation('common')

    return (
        <>
            <h1>404 - Page Not Found</h1>
            <Link href="/">
                <a>{t('Go back home')}</a>
            </Link>
        </>
    )
}
