import classNames from "classnames";

import styles from './KeyNote.module.css'

interface KeyNoteProps{
    noteType: string;
}

function KeyNote({noteType}:KeyNoteProps){
    return(
        <div className={classNames(styles.keyNote, styles.noteType)}></div>
    );
}

export default KeyNote;