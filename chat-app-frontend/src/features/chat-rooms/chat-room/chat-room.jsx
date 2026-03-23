import { useState } from "react";
import SendMessage from "./send-message/send-message";
import Message from "./messages/messages-list/message/message";
import MessagesList from "./messages/messages-list";
import styles from './chat-room.module.css';

export default function ChatRoom({ roomId, roomName, setIsRoomSelected }) {
    return (
        <div className={styles.chatRoom}>
            
            <div className={styles.header}>
                <button 
                    onClick={() => setIsRoomSelected(false)} 
                    className={styles.backButton}
                >
                    ← Back
                </button>

                <h3>{roomName}</h3>
            </div>

            <MessagesList roomId={roomId} />
        </div>
    );
}