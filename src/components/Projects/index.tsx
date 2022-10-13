import { Box } from "@mui/material";
import { mainColor } from "@theme/global";
import Image from "next/image";
import Link from "next/link";
import { CSSProperties } from "react";
import { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
type ProjectsProps = {
    img: string;
    title?: string;
    description?: string;
    link?: string;
    style?: CSSProperties;
    more?: boolean;
};
export const Projects: React.FC<ProjectsProps> = ({
    img,
    title,
    description,
    link,
    more,
    style,
}) => {
    const [active, setActive] = useState(false);
    return (
        <>
            <Box
                style={style}
                className="flex  relative overflow-hidden"
                onMouseEnter={() => setActive(true)}    
                onMouseLeave={() => setActive(false)}
            >
                <Image src={img} alt="cat" height={1000} width={1000} />
                {active && (
                    <Box className=" absolute bottom-0 left-0 w-full side-up" sx={{ p: '8% 15% 10% 8%', backgroundColor: mainColor.white }}>
                        <Box className="heading">{title}</Box>
                        <Box className="text2 my-3">{description}</Box>
                        {more &&
                            <Link className="link" href={`/${link}`}>
                                <Box className="inline-flex items-center font-bold cursor-pointer">
                                    see project
                                    <Box className="mx-2">
                                        <AiOutlineArrowRight />
                                    </Box>
                                </Box>
                            </Link>
                        }
                    </Box>
                )}
            </Box>
        </>
    );
};