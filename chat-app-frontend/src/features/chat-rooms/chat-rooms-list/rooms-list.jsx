import { useEffect, useState } from "react"
import { getRoomsAPI } from "../../../apis/api";

export default function RoomsList(){

    const [rooms,setRooms] = useState([]);

    const getRooms = async () => {
        const res = await getRoomsAPI();
        try{
            console.log(res.data);
            setRooms(res.data);
        }catch(e){
            console.error(e);
        }
    }

    useEffect(()=>{
        getRooms();
    },[])

    return (
        <>
           {/* <li>
            <ol>room 1</ol>
            <ol>room 2</ol>
            <ol>room 3</ol>
            <ol>room 4</ol>
            <ol>room 5</ol>
            <ol>room 6</ol>
            <ol>room 7</ol>
            <ol>room 8</ol>
            <ol>room 9</ol>
            <ol>room 10</ol>
           </li> */}

           <ol>
            {
                rooms.map(({id,roomName,roomType})=>(
                    <li key={id}>{roomName}</li>
                ))
            }
           </ol>

        </>
    )
}