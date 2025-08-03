'use client'

import styles from './page.module.css'
import {useEffect, useRef, useState, createRef, RefObject} from 'react'

import Background from "@components/Background/Background"
import Pedestal, { PedestalHandle } from '@components/Pedestal/Pedestal';
import KeyNote, { KeyNoteHandle } from '@components/KeyNote/KeyNote';
import ScoreIndicator from '@components/ScoreIndicator/ScoreIndicator';

type KeyNoteData = {
    ref: RefObject<KeyNoteHandle | null>,
    id: number,
    type: string,
    interval: number,
    spawnTime: number
}

function GamePage(){
    const pedestalRef = useRef<PedestalHandle>(null);
    const [notes, setNotes] = useState<KeyNoteData[]>([]);
    const notesRef = useRef<KeyNoteData[]>([]);
    const maxNotes = 10;
    let intervalMs = 1200;
    const [currentInterval, setCurrentInterval] = useState(intervalMs);
    const intervalRef = useRef(currentInterval);
    const noteId = useRef(0);
    const [score, setScore] = useState(0);
    const HIT_WINDOW_MS = 200;
    const GOOD_WINDOW_MS = 100;
    const PERFECT_WINDOW_MS = 50;
    const [isPaused, setPaused] = useState(false);

    const handleKeyDown = (event: KeyboardEvent) => {
        const pressedKey = event.key.toUpperCase();
        if (!['W', 'A', 'S', 'D'].includes(pressedKey)) return;

        const now = Date.now();

        const hitIndex = notesRef.current.findIndex(note => {
            console.log('hit!');
            if (note.type !== pressedKey) return false;
            const diff = Math.abs(now - (note.spawnTime + note.interval));
            return diff <= HIT_WINDOW_MS;
        });


        if (hitIndex !== -1) {
            const hitNote = notesRef.current[hitIndex];
            hitNote.ref.current?.hit(); // 命中したノートだけ .hit() 呼ぶ！
            const diff = Math.abs(now - (hitNote.spawnTime + hitNote.interval));
            let addScore = 0;

            if(diff <= PERFECT_WINDOW_MS){
                addScore = 15;
            } else if(diff <= GOOD_WINDOW_MS){
                addScore = 10;
            } else{
                addScore = 5;
            }

            setScore(prev => prev + addScore);
        }
    }

    function getRandomType(){
        const types = ['W','A','S','D'] as const;
        const randomIndex = Math.floor(Math.random() * types.length);

        return types[randomIndex];
    }

    function keyNotesDown(){
        notes.forEach((note) => {
            note.ref.current?.keyNoteDown();
        });

        pedestalRef.current?.pedestalDown();
    }

    function spawnKeyNotes(){
        const newId = noteId.current++;
        const ref = createRef<KeyNoteHandle>();

        const newNote: KeyNoteData = {
            id: newId,
            type: getRandomType(),
            ref: ref,
            interval: intervalRef.current,
            spawnTime: Date.now(),
        }

        setNotes(prevNotes => {
            const updated = [...prevNotes, newNote];
            if (updated.length > maxNotes) {
                updated.shift();
            }

            notesRef.current = updated;
            
            return updated;
        });
        setCurrentInterval((prev) => {
            const nextInterval =  Math.max(prev - 10, 400)

            intervalRef.current = nextInterval;

            return nextInterval;
        });

        setTimeout(spawnKeyNotes, intervalRef.current);
    }

    function startGame(){
        setCurrentInterval(intervalMs);
        intervalRef.current = currentInterval;
        noteId.current = 0;
        setScore(0);
        setNotes([]);
        notesRef.current = [];
    }

    function finishGame(){
        
    }

    function pauseGame(){

    }

    function restartGame(){

    }

    useEffect(() => {
        if (notes.length > 0) keyNotesDown();
    }, [notes]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        spawnKeyNotes();

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    },[]);

    return(
        <div className={styles.gamePage}>
            <h1>{score}</h1>
            {notes.map((note) => (
                <KeyNote id={note.id} ref={note.ref} key={note.id} noteType={note.type as "W" | "A" | "S" | "D"} interval={note.interval}/>
            ))}
            <Pedestal interval={intervalRef.current} ref={pedestalRef}/>
            <ScoreIndicator score={score}/>
            <Background />
        </div>
    );
}

export default GamePage;