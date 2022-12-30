import { Box, BoxProps, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'

type TranslationProps = {
    type?: string[]
    formatTranslate?: any
    text: string
} & BoxProps

const Translation: FC<TranslationProps> = ({
    type,
    text,
    formatTranslate,
    ...rest
}) => {
    const { t } = useTranslation(type)
    return (
        <Text {...rest}>
            {formatTranslate && t(text, formatTranslate)}
            {!formatTranslate && t(text)}
        </Text>
    )
}

export default Translation
