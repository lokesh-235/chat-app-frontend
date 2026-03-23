import { useEffect, useState } from "react";
import ChatRoom from "./chat-room/chat-room";
import RoomsList from "./chat-rooms-list/rooms-list";
import styles from './chat-rooms.module.css';
import UserDetails from "../user-details/user-details";

export default function ChatRooms() {

    const [isRoomSelected, setIsRoomSelected] = useState(false);
    const [roomId, setRoomId] = useState();
    const [roomName,setRoomName] = useState();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);


    // detect screen resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className={styles.chats}>

           
            
            {/* 💻 DESKTOP → always show rooms */}
            {(!isMobile || !isRoomSelected) && (
                <div className={styles.leftPanel}>

                    {/* 👤 User Info */}
                    <UserDetails />

                    {/* 🏠 Rooms */}
                    <RoomsList 
                        setIsRoomSelected={setIsRoomSelected} 
                        setRoomId={setRoomId}
                        setRoomName={setRoomName} 
                    />

                </div>
                
            )}

            {/* 💻 DESKTOP → always show chat */}
            {/* 📱 MOBILE → only after selecting room */}
            {(!isMobile || isRoomSelected) && (
    roomId ? (
        <ChatRoom 
            roomId={roomId} 
            roomName={roomName}
            setIsRoomSelected={setIsRoomSelected}

        />
    ) : (
        <div className={styles.emptyState}>
            <h2>Select a room</h2>
        </div>
    )
)}

        </div>
    );
}