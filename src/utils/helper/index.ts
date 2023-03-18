import { IProductType } from '@redux/product/productModel'
import { Currency } from 'contants/common'
import { FormikValues } from 'formik'
import get from 'lodash/get'
import has from 'lodash/has'
import keys from 'lodash/keys'

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
    const hours = Math.floor(secNum / 3600)
    const minutes = Math.floor((secNum - hours * 3600) / 60)
    const seconds = secNum - hours * 3600 - minutes * 60

    return { hours, minutes, seconds }
}


const checkTypeSelected = (cartItemType, productTypeItem: IProductType) => {
    return cartItemType?.some(item => item === productTypeItem._id)
}

const renderCategory = (product_type: IProductType[]) => {
    const newArr: IProductType[] = []
    product_type?.forEach(productTypeItem => !newArr.some(item => item.title === productTypeItem.title) && newArr.push(productTypeItem))
    newArr.sort((a, b) => { if (a.cat_group > b.cat_group) { return 1 } else { return -1 } })
    return newArr
}

const isSameDate = (time: Date) => {
    const currentDate = new Date()
    const date = new Date(time)
    return currentDate.getFullYear() === date.getFullYear() && currentDate.getMonth() === date.getMonth() && currentDate.getDay() === date.getDay()
}

const checkValueError = (validations: IValidations) => (values: FormikValues, props?: any) => {
    const error: { [key: string]: any } = {}
    let checkValidate = false
    keys(validations).forEach((path: string) => {
        const pathValue = get(values, path)
        const isExistingKey = has(values, path)
        if (!isExistingKey) {
            // tslint:disable-next-line:no-console
            console &&
                console.error(
                    `The field ${path} does not existing on the form`,
                )
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
const sortAddress = (address) => {
    if (address?.length > 0) {
        return address?.reduce((init, item) => {
            if (item.default) {
                return [item, ...init];
            }
            return [...init, item];
        }, []);
    }
    return []
}

const hashSizetoMb = (size: number) => {
    return size / 1024 /1024
}

const renderElementUpOnThousand = (number: number) => {
    if (number > 1000) {
        return `${Math.round(number / 1000)}k`
    } else return number
}

export {
    formatCurrency,
    formatValueCurrency,
    FormatTimeToHMS,
    checkValueError,
    checkTypeSelected,
    renderCategory,
    isSameDate,
    sortAddress,
    hashSizetoMb,
    renderElementUpOnThousand
}

