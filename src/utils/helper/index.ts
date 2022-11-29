import { mainColor } from "@theme/theme";
import { Currency } from "contants/common";
import has from "lodash/has";
import get from "lodash/get";
import keys from "lodash/keys";
import { FormikValues } from "formik";

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

const formatCurrency = (locale: string | undefined) => {
    switch (locale) {
        case 'vi':
            return Currency.vi
        default:
            return Currency.en
    }
}

const formatValueCurrency = (locale: string | undefined, value: number) => {
    switch (locale) {
        case 'vi':
            return value * 23000
        default:
            return value
    }
}


const FormatTimeToHMS = (secNum: number) => {
    const hours = Math.floor(secNum / 3600);
    const minutes = Math.floor((secNum - (hours * 3600)) / 60);
    const seconds = secNum - (hours * 3600) - (minutes * 60);

    return { hours, minutes, seconds }
}

const checkValueError = (validations: IValidations) => (values: FormikValues, props?: any) => {
    const error: { [key: string]: any } = {}
    let checkValidate = false
    keys(validations).forEach((path: string) => {
        const pathValue = get(values, path)
        const isExistingKey = has(values, path)
        if (!isExistingKey) {
            // tslint:disable-next-line:no-console
            console && console.error(`The field ${path} does not existing on the form`)
        }
        for (let i = 0; i < validations[path].length; i += 1) {
            const pathItem = validations[path][i] ?? {}
            checkValidate = pathItem.validator(pathValue, values, props)
            if (!checkValidate) {
                // const code = pathItem.code
                // const codeOptions = pathItem.codeOptions ?? {}
                // const codeOptionLength = Object.entries(codeOptions)?.length
                const newMessageFormat = pathItem.code
                    // codeOptionLength > 0
                    //     ? new IntlMessageFormat(code, 'en').format({ ...codeOptions })
                    //     : new IntlMessageFormat(code, 'en').format()
                error[path] = newMessageFormat
                return error
            }
        }
    })

    return error
}

export {
    formatCurrency,
    formatValueCurrency,
    FormatTimeToHMS,
    checkValueError,
    renderColor,
}
