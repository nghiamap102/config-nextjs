
export const API_URL = process.env.API_URL
export const API_URL_BE = process.env.API_URL_BE
export const DOTS = '...'
export const tooltipArrayRating = [
    'Terrible',
    'Bad',
    'Average',
    'Great',
    'Awesome',
]
export const fillColorArrayRating = [
    '#f17a45',
    '#f17a45',
    '#f19745',
    '#f19745',
    '#f1a545',
]

export const Currency = {
    en: 'usd',
    vi: 'vnd',
}
export const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'full']
export const TOASTID = {
    CART: 'CART',
    LOGIN: 'LOGIN',
}

export const SEX = ['male', 'female', 'other']

export const paypalScriptOptions = {
    "client-id": process.env.PAYPAL_CLIENT_ID,
    currency: "USD"
};

export const paymentStatus = {
    PENDING: 'PENDING',
    COMPLETE: 'COMPLETE',
    SHIPPING: 'SHIPPING',
}

export const SORTTYPE = {
    POP: 'pop',
    SALE: 'sale',
    TIME: 'time',
}

export const LIMIT_PAGE = 50