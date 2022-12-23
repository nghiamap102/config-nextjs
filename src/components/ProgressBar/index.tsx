import { FC, useEffect, useState } from "react";
import styles from './ProgressBar.module.css'

const ProgressBar: FC = () => {
    const [scroll, setScroll] = useState(0);
    const progressBarHandler = () => {
        const totalScroll = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scroll = totalScroll / windowHeight;
        setScroll(scroll);
    }

    useEffect(() => {

        window.addEventListener("scroll", progressBarHandler);

        return () => window.removeEventListener("scroll", progressBarHandler);
    });


    return (
        <div className={styles.progressBarContainer} >
            <div className={styles.progressBar} style={{ transform: `scale(${scroll}, 1)`, opacity: `${scroll}` }} />
        </div>
    );
};

export default ProgressBar