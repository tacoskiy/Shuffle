"use client";

import classNames from "classnames";

import styles from './KeyNote.module.css'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import gsap from "gsap";

interface KeyNoteProps{
    noteType: "W" | "A" | "S" | "D";
    interval: number;
    id: number;
}

export type KeyNoteHandle = {
    keyNoteDown: () => void;
    hit: () => void;
}

const KeyNote = forwardRef<KeyNoteHandle, KeyNoteProps>(({noteType, interval, id}, ref) => {
    const keyNoteRef = useRef<HTMLDivElement>(null);
    const keyNoteDownIndex = useRef(1);
    const [isAnimationEnded, setAnimationEnded] = useState(false);

    useImperativeHandle(ref, () => ({
        keyNoteDown: () => {
            if(isAnimationEnded){
                gsap.to(keyNoteRef.current, {
                    y: 80 * keyNoteDownIndex.current,
                    filter: 'brightness(0.75)',
                    duration: interval / 3000,
                    ease: "power1.easeInOut",
                }).then(() => {
                    keyNoteDownIndex.current++;
                });
            }
        },
        hit: () => {
            gsap.to(keyNoteRef.current, {
                keyframes: [
                    {
                        filter: 'brightness(1.5)',
                        scale: 0.95,
                        duration: 0.1,
                        ease: "power1.easeInOut"
                    },
                    {
                        filter: 'brightness(.75)',
                        scale: 1,
                        duration: 0.1,
                        ease: "power1.easeInOut"
                    }
                ]
            });
        }
    }));

    useEffect(() => {
        const startX = (window.innerWidth / 2) + 150;
        const startY = (window.innerWidth / 4) + 90;
        const centerX = 0;
        const centerY = 0;

        const startPositions = {
            W: {x: -startX, y: -startY},
            A: {x: -startX, y: startY},
            S: {x: startX, y: startY},
            D: {x: startX, y: -startY}
        }

        if(!keyNoteRef.current) return;

        const startPosition = startPositions[noteType];

        gsap.set(keyNoteRef.current, {
            x: startPosition.x,
            y: startPosition.y,
        });

        gsap.to(keyNoteRef.current, {
            keyframes: [
                {
                    x: startPosition.x * 0.67,
                    y: startPosition.y * 0.67,
                    duration: interval / 1000 * 0.3,
                    ease: "power1.easeInOut"
                },
                {
                    x: startPosition.x * 0.33,
                    y: startPosition.y * 0.33,
                    duration: interval / 1000 * 0.3,
                    ease: "power1.easeInOut"
                },
                {
                    x: centerX,
                    y: centerY,
                    duration: interval / 1000 * 0.3,
                    ease: "power1.easeInOut"
                }
            ]
        }).then(() => {
            setAnimationEnded(true);
        })
    }, [])

    return(
        <div ref={keyNoteRef} className={classNames(styles.keyNote, styles[noteType])}>
            {/* <h1>{id}</h1> */}
        </div>
    );
})

export default KeyNote;