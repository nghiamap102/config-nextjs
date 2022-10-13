import { Box } from "@mui/material";
import { mainColor } from "@theme/global";
import { Routes } from "contants/common";
import Link from "next/link";

type ContactProps = {
    routes: Routes[]
};
export const Contact: React.FC<ContactProps> = ({
    routes,
}) => {
    return (
        <>
            <Box>
                <Box className="text-center sub_title mb-10">contact</Box>
                <Box className="text-center heading2">contact@website.com</Box>
                <Box className="text-center heading2">+0 0000 0000</Box>
                <Box className="flex mt-10 justify-center" sx={{ p: '0 10%' }}>
                    {routes?.map((ele) => (
                        <Box className="mx-5 text" sx={{ color: mainColor.grey }} key={ele.name} >
                            <Link href={ele.link}>
                                {ele.name}
                            </Link>
                        </Box>
                    ))}
                </Box>
            </Box>
        </>
    );
};