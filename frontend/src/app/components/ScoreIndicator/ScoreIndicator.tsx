import { FC } from "react";
import styles from './ScoreIndicator.module.css';

interface ScoreIndicatorProps{
    score: number;
}

const ScoreIndicator : FC<ScoreIndicatorProps> = (({score}) => {
    return(
        <div className={styles.scoreIndicator}>
            {score}
        </div>
    );
});

export default ScoreIndicator;