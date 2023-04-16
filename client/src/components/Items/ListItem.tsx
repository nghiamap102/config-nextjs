import { Box, BoxProps } from "@chakra-ui/react";
import { FC } from "react";

// type ListItemProps = {
// a
// } & BoxProps
const ListItem: FC<BoxProps> = ({
    children,
    ...props
}) => {
    return (
        <Box className="link hover-bg-gray" {...props}>
            {children}
        </Box>
    );
};

export default ListItem