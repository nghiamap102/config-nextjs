import { Box } from "@chakra-ui/react";
import { FC } from "react";

type OverlayProps = {
    background?: string
};
const Overlay: FC<OverlayProps> = ({
    background
}) => {
    return (
        <Box bg={background}>

        </Box>
    );
};


export default Overlay