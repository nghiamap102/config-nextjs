import { Box, BoxProps } from "@chakra-ui/react";
import { FC } from "react";

type ListItemProps = {

} & BoxProps
const ListItem: FC<ListItemProps> = ({
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