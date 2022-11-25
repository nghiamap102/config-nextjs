import { mainColor } from "@theme/theme";
import { Currency } from "contants/common";

const renderColor = (tag: 'new' | 'hot' | 'sale' | undefined) => {
    switch (tag) {
        case 'new':
            return mainColor.newTag
        case 'hot':
            return mainColor.hotTag
        case 'sale':
            return mainColor.saleTag
        default:
            return null;
    }
}

const FormatCurrency = (locale: string | undefined) => {
    switch (locale) {
        case 'vi':
            return Currency.vi
        default:
            return Currency.en
    }
}

const FormatValueCurrency = (locale: string | undefined, value: number) => {
    switch (locale) {
        case 'vi':
            return value * 23000
        default:
            return value
    }
}

export {
    FormatCurrency,
    FormatValueCurrency,
    renderColor,
}
