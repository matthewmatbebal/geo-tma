"use client";

import { useEffect, useState } from "react";
import styles from './UserProfile.module.css';
import {LargeTitle, Blockquote, Accordion, Timeline} from "@telegram-apps/telegram-ui"; // Импортируем компоненты аккордеона

declare global {
    interface Window {
        Telegram: {
            WebApp: {
                initDataUnsafe?: {
                    user?: {
                        username?: string;
                        photo_url?: string;
                    };
                };
                ready: () => void;
            };
        };
    }
}

interface TelegramUser {
    username: string;
    photoUrl: string | null;
}

const UserProfile = () => {
    const [user, setUser] = useState<TelegramUser | null>(null);
    const [points, setPoints] = useState<number>(100); // Статическое число поинтов
    const [expanded1, setExpanded1] = useState<boolean>(false);
    const [expanded2, setExpanded2] = useState<boolean>(false);
    const [expanded3, setExpanded3] = useState<boolean>(false);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://telegram.org/js/telegram-web-app.js";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
                const telegramUser = window.Telegram.WebApp.initDataUnsafe?.user;
                if (telegramUser) {
                    setUser({
                        username: telegramUser.username || 'User',
                        photoUrl: telegramUser.photo_url || null,
                    });
                }
            }
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className={styles.container}>
            {user ? (
                <div>
                    <LargeTitle weight="1" className={styles.username}>{user.username}</LargeTitle>
                    {user.photoUrl && (
                        <img src={user.photoUrl} alt="User Avatar" className={styles.avatar} />
                    )}
                    <LargeTitle weight="3" className={styles.points}>Points {points}</LargeTitle>

                    {/*сделать карточки тг ui*/}

                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UserProfile;
