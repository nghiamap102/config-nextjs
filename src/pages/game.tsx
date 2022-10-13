import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { caroActions, selectCaro } from "redux/caro/caroSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";

type GameProps = {

};
const Game: React.FC<GameProps> = ({

}) => {
    const dispatch = useAppDispatch()
    const caro = useAppSelector(selectCaro)
    const [time, setTime] = useState(60 * 20)
    const [activeTimer, setActiveTimer] = useState(false)
    console.log(caro.player1);
    useEffect(() => {
    }, [])
    return (
        <>
            <Box>
                <TextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                    required
                    helperText="invalid"
                    onChange={e => dispatch(caroActions.setPlayer1({ ...caro.player1, name: e.target.value }))}
                />
            </Box>
            <Box>
                <TextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                    required
                    helperText="invalid"
                    onChange={e => dispatch(caroActions.setPlayer2({ ...caro.player2, name: e.target.value }))}
                />
            </Box>
            <Button onClick={() => setActiveTimer(true)}>Start</Button>
            <Box>{time}</Box>
        </>
    );
};

export default Game;