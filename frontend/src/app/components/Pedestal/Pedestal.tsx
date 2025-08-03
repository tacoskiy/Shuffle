'use client';

import styles from "./Pedestal.module.css"
import { useImperativeHandle, forwardRef, useState, useRef} from "react";
import classNames from "classnames";
import gsap from "gsap";

interface PedestalProps{
    interval: number
}

export type PedestalHandle = {
    pedestalDown: () => void;
}

const Pedestal = forwardRef<PedestalHandle, PedestalProps>(({interval}, ref) => {
    const pedestalRef = useRef<HTMLDivElement>(null);
    const pedestalDownIndex = useRef(0);

    useImperativeHandle(ref, () => ({
        pedestalDown: () => {
            if(pedestalDownIndex.current < 10){
                gsap.to(pedestalRef.current, {
                    y: 80 * pedestalDownIndex.current,
                    duration: interval / 3000,
                    ease: "power1.easeInOut",
                }).then(() => {
                    pedestalDownIndex.current++;
                });
            }
        }
    }));

    return(
        <div ref={pedestalRef} className={classNames(styles.pedestal)}></div>
    );
});

export default Pedestal;