'use client';

import styles from "./Pedestal.module.css"
import { useImperativeHandle, forwardRef, useState} from "react";
import classNames from "classnames";

export type PedestalHandle = {
    setState: () => void;
}

const Pedestal = forwardRef<PedestalHandle>((props, ref) => {
    const[shrink, setShrink] = useState(false);

    useImperativeHandle(ref, () => ({
        setState: () => {
            if(shrink == false){
                setShrink(true);
            } else{
                setShrink(false);
            }
        }
    }));

    return(
        <div className={classNames(styles.pedestal, shrink ? styles.shrink : '')}></div>
    );
});

export default Pedestal;