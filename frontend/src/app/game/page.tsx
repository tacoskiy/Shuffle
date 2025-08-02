'use client'

import styles from './page.module.css'
import {useEffect, useRef, useState} from 'react'

import Background from "@components/Background/Background"
import Pedestal, { PedestalHandle } from '@components/Pedestal/Pedestal';

function GamePage(){
    const pedestalRef = useRef<PedestalHandle>(null);

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === ' '){
            pedestalRef.current?.setState();
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        const interval = setInterval(() => {
            
        }, 1000);

        return() => clearInterval(interval);
    }, []);

    return(
        <div className={styles.gamePage}>
            <h1>GamePage</h1>
            <Pedestal ref={pedestalRef}/>
            <Background />
        </div>
    );
}

export default GamePage;