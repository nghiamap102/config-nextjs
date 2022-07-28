import isEmpty from 'lodash/isEmpty'

const DEFAULT_MAX_NUMBER_INPUT = 99999999

export const validateRequired = (value: string | number) => {
    let error = true
    if (isEmpty(value) && isEmpty(value && value.toString())) {
        error = false
    }
    return error
}

export const validateRequiredCheckbox = (value: string | boolean) => {
    if (!value) return false
    return true
}

const emailFormat =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const format = /[!#$%^&*()+\\=\\[\]{};':"\\|,<>\\/?]+/
const formatSymbols = /[`!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/
// eslint-disable-next-line
const notUnicodeFormat = /[^\u0000-\u00ff]/
const onlyContainCharacterRegex = /^[a-zA-Z@$!%*#?&\040]+$/
const containAtLeastNumberRegex = /(?=.*\d)/

const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/

const passwordSpecialFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?~#&]{6,}$/

export const validFileExtensions = ['.jpg', '.jpeg', '.gif', '.png']

export const validateEmail = (email: string) => {
    const lowerCase = String(email).toLowerCase()
    if (!emailFormat.test(lowerCase) || notUnicodeFormat.test(lowerCase)) {
        return false
    }
    return true
}

export const validatePassword = (password: string) => {
    if (!passwordFormat.test(password) && !passwordSpecialFormat.test(password)) return false
    return true
}

export const validateNotSymbols = (text: string) => {
    const lowerCase = String(text).toLowerCase()
    if (!formatSymbols.test(lowerCase) || notUnicodeFormat.test(lowerCase)) {
        return true
    }
    return false
}

export const validateMobile = (mobile: string) => {
    const lowerCase = String(mobile).toLowerCase()
    if (isNaN(Number(mobile))) {
        if (!Number(lowerCase.substring(2)) || lowerCase[1] === '+') {
            return false
        }
    }
    return true
}

// export const validateCardNumber = (cardNumber: string) => {
//   const validationCardTypes = JSON.parse(localStorage.getItem('cardValidation'))
//   const cardNumberFormat = cardNumber.replaceAll(' ', '')
//   let flag = false
//   if (validationCardTypes.length > 0) {
//     validationCardTypes.forEach(item => {
//       const regex = new RegExp(item.regex)
//       if (cardNumberFormat.match(regex)) {
//         flag = true
//       }
//     })
//   }
//   if (flag) return true
//   return false
// }

export const validateMonth = (month: string) => {
    if (Number(month) < 1 || Number(month) > 12) {
        return false
    }
    const getYear: any = document.querySelector('[data-encrypt="year"]')
    const year: string = getYear?.value || ''
    if (!year) return true
    const currentMonth = new Date().getMonth() + 1
    const currentYear = new Date().getFullYear()

    if (Number(year) < currentYear || (Number(year) === currentYear && Number(month) < currentMonth)) return false
    return true
}

export const validateYear = (year: string) => {
    const currentMonth = new Date().getMonth() + 1
    const currentYear = new Date().getFullYear()
    const getMonth: any = document.querySelector('[data-encrypt="month"]')
    const month = getMonth || ''
    if (Number(year) < currentYear || Number(year) > currentYear + 10) {
        return false
    }
    if (!month) return true
    if (Number(year) < currentYear || (Number(year) === currentYear && Number(month) < currentMonth)) return false
    return true
}

export const validateEmailOrPhone = (data: string) => {
    const lowerCase: string = String(data).toLowerCase()
    if (isNaN(+lowerCase)) {
        if (format.test(lowerCase) || !emailFormat.test(lowerCase) || notUnicodeFormat.test(lowerCase)) {
            return false
        }
    }
    if (lowerCase.length < 8) {
        return false
    }
    if (validateMobile(lowerCase) && lowerCase.length > 15) {
        return false
    }
    return true
}

export const validateRetype = (values: { confirmPassword: string; password: string }) => {
    let error = true
    if (values.confirmPassword && values.confirmPassword !== values.password) {
        error = false
    }
    return error
}

export const validateMinLength = (minLength: number) => (value: string) => String(value).length >= minLength

export const validateMaxLength = (maxLength: number) => (value: string) => String(value).length <= maxLength

export const validateContainLeastCharacter = (value: string) => {
    const character = value.replace(/[0-9]/g, '')
    return onlyContainCharacterRegex.test(character)
}

export const validateContainLeastNumber = (value: string) => containAtLeastNumberRegex.test(value)

export const validateNumberLarger0 = (value: string) => {
    if (value) {
        const regexp = /^\d+$/
        let valid = true
        if (!regexp.test(value)) {
            valid = false
        }
        if (Number(value) <= 0) {
            valid = false
        }
        return valid
    }

    return true
}

export const validateNumberLargerMaxNumber = (value: string) => {
    if (value) {
        const regexp = /^\d+$/
        let valid = true
        if (!regexp.test(value)) {
            valid = false
        }
        if (Number(value) > DEFAULT_MAX_NUMBER_INPUT) {
            valid = false
        }
        return valid
    }

    return true
}
export const validateContainAtLeastOneCapitalCharacter = (value: string) => {
    if (value) {
        const regex = /(?=.*[A-Z])/
        return regex.test(value)
    }
    return true
}

export const validateURLWebsite = (value: string) => {
    // eslint-disable-next-line
    const regexp = /^(http|https|ftp):\/\/[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i
    if (!value) return false
    if (regexp.test(value)) {
        return true
    }
    return false
}

export const validStringWithoutBlank = (value: string) => {
    if (value.indexOf(' ') > 1) {
        return false
    }
    return true
}

export const validStringWithoutUppercase = (value: string) => {
    const regexp = /[A-Z]+/g
    if (!value) return false
    if (regexp.test(value)) {
        return false
    }
    return true
}

export const validateKeyProject = (value: string) => {
    const regexp = /^[A-Z][A-Z0-9]+/g
    if (!value) return false
    if (regexp.test(value)) {
        return true
    }
    return false
}
export const validateImageType = (fileName: string) => {
    const regexp = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i
    if (regexp.test(fileName)) {
        return true
    }
    return false
}

export const validateVideoType = (fileName: string) => {
    const regexp = /\.(m4v|avi|mpg|mp4)$/i
    if (regexp.test(fileName)) {
        return true
    }
    return false
}

export const validStringWithoutSpecialCharacter = (value: string) => {
    const regexp = /`|~|!|@|#|\$|%|\^|&|\*|\(|\)|\+|=|\[|\{|\]|\}|\||\\|'|<|,|\.|>|\?|\/|"|;|:/g
    if (!value) return false
    if (regexp.test(value)) {
        return false
    }
    return true
}