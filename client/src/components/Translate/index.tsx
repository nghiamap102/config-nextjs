import { BoxProps, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'

type TranslationProps = {
    formatTranslate?: any
    text: string
    firstCapital?: boolean
} & BoxProps

const Translation: FC<TranslationProps> = ({
    text,
    formatTranslate,
    firstCapital = false,
    ...rest
}) => {
    const { t } = useTranslation(['common'])

    function capitalizeFirstLetter(string) {
        const newString = t(string)
        return newString.charAt(0).toUpperCase() + newString.slice(1);
    }
    return (
        <Text {...rest}>
            {formatTranslate && t(text, formatTranslate)}
            {!formatTranslate && !firstCapital && t(text)}
            {!formatTranslate && firstCapital && capitalizeFirstLetter(text)}
        </Text>
    )
}

export default Translation
