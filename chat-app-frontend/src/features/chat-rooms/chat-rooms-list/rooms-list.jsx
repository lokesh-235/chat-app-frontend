import { useEffect, useState } from "react"
import { getRoomsAPI } from "../../../apis/api";
import styles from './rooms-list.module.css';

export default function RoomsList({ setIsRoomSelected, setRoomId ,setRoomName}) {

    const [rooms, setRooms] = useState([]);
    const [activeRoom, setActiveRoom] = useState(null);

    const getRooms = async () => {
        try {
            const res = await getRoomsAPI();
            setRooms(res.data);
        } catch (e) {
            console.error(e);
        }
    };

    const showSelectedRoom = (roomId,roomName) => {
        setIsRoomSelected(true);
        setRoomId(roomId);
        setRoomName(roomName);
        setActiveRoom(roomId);
    };

    useEffect(() => {
        getRooms();
    }, []);

    return (
        <ol className={styles.rooms}>
            {rooms.map(({ id, roomName }) => (
                <li
                    key={id}
                    onClick={() => showSelectedRoom(id,roomName)}
                    className={activeRoom === id ? styles.activeRoom : ""}
                >
                    {roomName}
                </li>
            ))}
        </ol>
    );
}