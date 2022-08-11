import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const Header: React.FC = () => {
	const { t } = useTranslation('common');
	const router = useRouter();

	const changeLocale = () => {
		const lang = router.locale === 'vi' ? 'en' : 'vi';
		// console.log(router);
		return (
			<Link
				href={`${router.asPath}`}
				locale={lang}
			>
				<button>
					{lang.toUpperCase()}
				</button>
			</Link>
		)
	}
	return (
		<div className="header py-3">
			{changeLocale()}
			<div>
				{t(`home`)}
			</div>
		</div>
	)
}



export default Header