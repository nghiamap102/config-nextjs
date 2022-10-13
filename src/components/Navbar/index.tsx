import { Box } from "@mui/material";
import { mainColor } from "@theme/global";
import { Routes } from "contants/common";
import Link from "next/link";
import React from "react";
import { CSSProperties } from "react";
type NavbarProps = {
    routes?: Routes[];
    style?: CSSProperties
};
export const Navbar: React.FC<NavbarProps> = ({
    routes,
    style
}) => {
    return (
        <>
            <Box className="flex justify-between items-center absolute top-0 left-20 py-10 md:w-11/12 " style={style}>
                <Box
                    className="logo_text"
                    sx={{ color: mainColor.white }}
                >
                    <Link
                        href="/"
                    >
                        logo
                    </Link>
                </Box>
                <Box className="flex items-center">
                    {routes?.map((ele) => (
                        <Box
                            key={ele.name}
                            className="link px-5 uppercase"
                            sx={{ color: mainColor.white }}
                        >
                            <Link
                                href={ele.link ? ele.link : `/${ele.name}`}
                            >
                                {ele.name}
                            </Link>
                        </Box>
                    ))}
                </Box>
            </Box>
        </>
    );
};