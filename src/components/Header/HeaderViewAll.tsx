import { Box, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";

type HeaderViewAllProps = {
    title: string
    LinkTo: string
};
export const HeaderViewAll: FC<HeaderViewAllProps> = ({ title, LinkTo }) => {
    return (
        <Flex marginY={10} alignItems='flex-end'>
            <Heading className="capitalize" fontSize='1.5rem'>{title}</Heading>
            <Link href={LinkTo}>
                <Box marginLeft={10} borderBottom="1px solid" textTransform={'capitalize'}>view all</Box>
            </Link>
        </Flex>
    );
};