import { Box } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { FC } from "react";

type TranslationProps = {
    type?: string[]
    formatTranslate?: any
    text: string
};
const Translation: FC<TranslationProps> = ({ type, text, formatTranslate }) => {

    const { t } = useTranslation(type)

    return (
        <Box>
            {formatTranslate && (t(text), formatTranslate)}
            {!formatTranslate && (t(text))}
        </Box>
    );
};

export default Translation