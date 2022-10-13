import { Box } from "@mui/material";
import { mainColor } from "@theme/global";
import React from "react";

type BannerProps = {
    title: string;
    description: string;
};
export const Banner: React.FC<BannerProps> = ({
    title,
    description,
}) => {
    return (
        <>
            <Box sx={{ backgroundColor: mainColor.black, color: mainColor.white, p: '325px  142px 435px 179px' }} className="relative">
                <Box className="text-center m-auto ">
                    <Box className="title mb-10">
                        {title}
                    </Box>
                    <Box color={mainColor.grey} className="text py-5">
                        {description}
                    </Box>
                </Box>
                <Box className="absolute bottom-10 left-1/2 sub_title -translate-x-1/2">work</Box>
            </Box>
        </>
    );
};