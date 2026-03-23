import { useEffect, useState, useRef } from "react";
import { getMessagesAPI } from "../../../../apis/api";
import SendMessage from "../send-message/send-message";
import Message from "./messages-list/message/message";
import styles from './messages-list.module.css';
import { useSelector } from "react-redux";


export default function MessagesList({ roomId}) {

    const [messages, setMessages] = useState([]);
    const containerRef = useRef(null);

     const userId = useSelector((state) => state.user.userId);

    const getMessages = async () => {
        const res = await getMessagesAPI(roomId);
        setMessages(res.data);
        console.log(res.data);
    };



    useEffect(() => {
        getMessages();
    }, [roomId]);

    // ✅ smooth auto-scroll
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <>
            <ul ref={containerRef} className={styles.messages}>
                {messages.map(({ content, id, senderId, senderUsername, sentAt }) => (
                    
                    <Message
                        key={id}
                        content={content}
                        senderUsername={senderUsername}
                        sentAt={sentAt}
                        isSender={senderId === userId}
                    />
                    
                ))}
            </ul>

            <SendMessage setMessages={setMessages} roomId={roomId} />
        </>
    );
}