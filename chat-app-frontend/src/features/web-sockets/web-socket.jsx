import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient = null;
let isConnected = false;
let currentSubscription = null;

export const connectWebSocket = (onMessageReceived, roomId) => {

    const socket = new SockJS("http://10.48.46.99:8080/chat");

    // create only once
    if (!stompClient) {
        stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,

            onConnect: () => {
                console.log("✅ Connected to WebSocket");
                isConnected = true;

                subscribeToRoom(roomId, onMessageReceived);
            },

            onDisconnect: () => {
                console.log("❌ Disconnected");
                isConnected = false;
            }
        });

        stompClient.activate();
    } else if (isConnected) {
        // already connected → just change room
        subscribeToRoom(roomId, onMessageReceived);
    }
};

const subscribeToRoom = (roomId, onMessageReceived) => {

    // ❌ unsubscribe old room
    if (currentSubscription) {
        currentSubscription.unsubscribe();
    }

    // ✅ subscribe new room
    currentSubscription = stompClient.subscribe(
        `/topic/${roomId}/messages`,
        (message) => {
            onMessageReceived(JSON.parse(message.body));
        }
    );

    console.log("📡 Subscribed to room:", roomId);
};

export const sendMessage = (msg) => {
    console.log(JSON.stringify(msg))

if (!stompClient || !isConnected) {
        console.warn("⚠️ Not connected yet");
        return;
    }

        stompClient.publish({
            destination: `/app/rooms/${msg.roomId}/sendMessage`,
            body: JSON.stringify(msg)
        });
    
};