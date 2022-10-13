import { Box, Card, CardActions, CardContent } from "@mui/material";
import { mainColor } from "@theme/global";
import Link from "next/link";
import { AiOutlineArrowRight } from "react-icons/ai";

type CardBlockProps = {
    title?: string;
    description?: string;
    link?: string;
    price?: number;
};
export const CardBlock: React.FC<CardBlockProps> = ({
    title,
    description,
    link,
    price,
}) => {
    return (
        <>
            <Card className="my-5 mx-5" sx={{}}  >
                <CardContent className="p-10">
                    <Box className="heading">{title}</Box>
                    <Box className="text2 my-3">{description}</Box>
                    <Link className="" href={`/${link}`}>
                        <Box className="cursor-pointer flex items-center font-bold">
                            see project
                            <Box className="mx-3">
                                <AiOutlineArrowRight />
                            </Box>
                        </Box>
                    </Link>
                </CardContent>
                <CardActions className="px-10" sx={{ backgroundColor: mainColor.green, color: mainColor.white }} >
                    Starting at ${price}
                </CardActions>
            </Card>
        </>
    );
};