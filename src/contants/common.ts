import { ReactPayPalScriptOptions } from "@paypal/react-paypal-js"

export const API_URL = process.env.API_URL
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
export const toastConst = {
    cart: 'cart',
}

export const TYPING = 'TYPING'
export const SEND_MESSAGE = 'SEND_MESSAGE'
export const MODE_MESSAGE = 'MODE_MESSAGE'
export const DELETE_MESSAGE = 'DELETE_MESSAGE'
export const DELETE_CONVERS = 'DELETE_CONVERS'
export const STORE_CONVERS = 'STORE_CONVERS'

export const paypalScriptOptions: ReactPayPalScriptOptions = {
    "client-id":"AaUpVv8WDVM5uezwsQo79K6YBKmqm3EeLSOx5TFTX4RM2_ephwW68aJ4_ASXYPjbI8OyuXchwgkQ7bRl",
    currency: "USD"
};
