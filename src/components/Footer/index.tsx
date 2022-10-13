import { Box } from "@mui/material";
import { Routes } from "contants/common";
import Link from "next/link";

type FooterProps = {
    privacy?: Routes[];
};
export const Footer: React.FC<FooterProps> = ({
    privacy,
}) => {
    return (
        <>
            <Box className="flex justify-between" >
                <Box>2022 Creatives</Box>
                <Box className="flex">
                    {privacy?.map((ele) => (
                        <Link
                            key={ele.name}
                            href={ele.link}
                        >
                            <Box className="mx-3 cursor-pointer">
                                {ele.name}
                            </Box>
                        </Link>
                    ))}
                </Box>
            </Box>
        </>
    );
};