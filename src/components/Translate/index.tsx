import { BoxProps, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'

type TranslationProps = {
    formatTranslate?: any
    text: string
} & BoxProps

const Translation: FC<TranslationProps> = ({
    text,
    formatTranslate,
    ...rest
}) => {
    const { t } = useTranslation(['common'])
    return (
        <Text {...rest}>
            {formatTranslate && t(text, formatTranslate)}
            {!formatTranslate && t(text)}
        </Text>
    )
}

export default Translation
