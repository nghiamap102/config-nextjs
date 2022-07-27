export const capitalizeString = (str: string): string => {
    if (!str) return ''

    return `${str[0].toUpperCase()}${str.slice(1)}`
}

export const isNonEmptyArray = (items: Array<any>) =>
    Array.isArray(items) && items.length > 0

const emailFormat =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const notUnicodeFormat = /[^\u0000-\u00ff]/
const formatSymbols = /[`!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/

const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/

const passwordSpecialFormat =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?~#&]{6,}$/

export const validateEmail = (email: string) => {
    const lowerCase = String(email).toLowerCase()
    if (!emailFormat.test(lowerCase) || notUnicodeFormat.test(lowerCase)) {
        return false
    }
    return true
}

export const validatePassword = (password: string) => {
    if (!passwordFormat.test(password) && !passwordSpecialFormat.test(password))
        return false
    return true
}

export const validateNotSymbols = (text: string) => {
    const lowerCase = String(text).toLowerCase()
    if (!formatSymbols.test(lowerCase) || notUnicodeFormat.test(lowerCase)) {
        return true
    }
    return false
}
