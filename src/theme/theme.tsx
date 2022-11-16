import { extendTheme } from '@chakra-ui/react'
import { mainColor } from './common/color'

const theme = extendTheme({
    styles: {
        global: {
            'html, body': {
                lineHeight: 'tall',
                background: '#FFFFFF',
                color: '#2D2C3C',
                fontFamily: 'DMSans',
                fontSize: {
                    base: '14px !important',
                    md: '16px'
                }
            },
            'input:hover': {
                borderColor: '#CFD2D6'
            },
            '*, *::before, *::after': {
                borderColor: '#CFD2D6'
            }
        }
    },
    fonts: {
        heading: 'Heading Font Name',
        body: 'Body Font Name',
        DMSans: 'DM Sans',
        Rubik: 'Rubik',
    },
    colors: {
        main: mainColor,
        second: {
            40: '#dceeff',
            50: '#d8ffff',
            100: '#acffff',
            200: '#7dfffd',
            300: '#4dfffc',
            400: '#27fffc',
            500: '#17e6e2',
            600: '#00b3b0',
            700: '#00807e',
            800: '#004e4c',
            900: '#001c1b'
        },
        sub: {
            50: '#FBFBFB',
            100: '#f6f7f9',
            150: '#84888D',
            200: '#787880',
            300: '#A7AEB6'
        }
    },
    components: {
    }
})

export { mainColor }
export default theme
