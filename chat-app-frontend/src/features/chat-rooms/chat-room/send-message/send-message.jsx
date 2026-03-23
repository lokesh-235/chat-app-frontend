import { useEffect, useRef, useState } from "react";
import { connectWebSocket, sendMessage } from "../../../web-sockets/web-socket";
import styles from './send-message.module.css';
import { useSelector } from "react-redux";


export default function SendMessage({ setMessages, roomId }) {

    const [message, setMessage] = useState("");
    const inputRef = useRef(null);

    const userId = useSelector((state) => state.user.userId);

    useEffect(() => {
        connectWebSocket((msg) => {
            setMessages(prev => [...prev, msg]);
        }, roomId);

        // ✅ focus input safely
        inputRef.current?.focus();

    }, [roomId]);

    const submitSendMessage = (e) => {
        e.preventDefault();

        if (!message.trim()) return; // 🔥 prevent empty

        sendMessage({
            content: message,
            roomId: roomId,
            messageType: 'TEXT',
            senderId: userId
        });

        setMessage("");
    };

    return (
        <form onSubmit={submitSendMessage} className={styles.sendMessageForm}>
            <textarea
                ref={inputRef}
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type message..."
                className={styles.messageInput}
            />
            <button className={styles.sendButton}>Send</button>
        </form>
    );
}