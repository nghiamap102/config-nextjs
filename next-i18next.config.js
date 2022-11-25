module.exports = {
    i18n: {
        defaultLocale: 'vi',
        locales: ['vi', 'en'],
    },
    interpolation: {
        escapeValue: false, // react already safe from xss
        // format(value, format, locale, { currency }) {
        //     const localeBCP47 = localeToBCP47[locale];

        // if (format === 'currency') {
        //     if (typeof value === 'undefined' || !currency) {
        //         return 'N/A';
        //     }
        //     return new Intl.NumberFormat(localeBCP47 || locale, {
        //         style: 'currency',
        //         currency
        //     }).format(value);
        // }

        // return value;
        // }
    }
}
