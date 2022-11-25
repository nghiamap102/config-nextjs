import { Flex, Heading, Link } from "@chakra-ui/react";
import React from "react";

type HeaderViewAllProps = {
    title: string
};
export const HeaderViewAll: React.FC<HeaderViewAllProps> = ({ title }) => {
    return (
        <Flex marginY={10} alignItems='flex-end'>
            <Heading className="capitalize" fontSize='1.5rem'>{title}</Heading>
            <Link href="abc" marginLeft={10} borderBottom="1px solid" textTransform={'capitalize'}>view all</Link>
        </Flex>
    );
};