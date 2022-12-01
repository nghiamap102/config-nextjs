import { Box } from "@chakra-ui/react";
import { FC, useState } from "react";

type BoxIntroProps = {
    content?: string
};
const BoxIntro: FC<BoxIntroProps> = ({
    content
}) => {

    const [active, setActive] = useState(false)

    return (
        <Box>
            {content}
        </Box>
    );
};

export default BoxIntro