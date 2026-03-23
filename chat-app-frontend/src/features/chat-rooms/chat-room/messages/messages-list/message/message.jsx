import styles from './message.module.css';

function formatTimeAgo(dateString) {
    const now = new Date();
    const past = new Date(dateString);

    const diffInSeconds = Math.floor((now - past) / 1000);

    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(diffInSeconds / 3600);
    const days = Math.floor(diffInSeconds / 86400);

    if (diffInSeconds < 60) return "just now";
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hr ago`;
    return `${days} days ago`;
}

export default function Message({ content, messageId, isSender, senderUsername, sentAt }) {

    return (
        <li
            key={messageId}
            className={`${styles.message} ${isSender ? styles.sent : styles.received}`}
        >
            <p className={styles.username}>{isSender ? 'you'  : senderUsername}</p>
            <p className={styles.content}>{content}</p>
            <p className={styles.sentAt}>{formatTimeAgo(sentAt)}</p>
        </li>
    );
}