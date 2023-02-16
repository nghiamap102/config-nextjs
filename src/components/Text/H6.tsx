import { BoxProps } from '@chakra-ui/react';
import Translation from '@components/Translate';
import { FC } from 'react';

type H6Props = {
    text?: string
} & BoxProps

export const H6: FC<H6Props> = ({ text, ...props }) => {
    return <Translation text={text} fontSize='2xl' {...props} />
};