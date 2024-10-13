"use client";

import { useState } from "react";
import styles from './Referral.module.css';
import {LargeTitle, Button, Headline, Subheadline} from "@telegram-apps/telegram-ui"; // Импорт кнопки из telegram-ui
import Image from 'next/image';
import userIcon from '../icons/UserIcon.svg'; // Пример дефолтной иконки пользователя

interface Friend {
    username: string;
    tokens: number;
    photoUrl: string | null; // Здесь можно задать URL фотографии или оставить null для дефолтной иконки
}

const Referral = () => {
    const [referralPoints, setReferralPoints] = useState<number>(150); // Статичные данные по реферальным поинтам
    const [friends, setFriends] = useState<Friend[]>([
        {
            username: "@kefteme",
            tokens: 120,
            photoUrl: null, // Пример уникальной иконки
        },
        {
            username: "@NikiToS",
            tokens: 95,
            photoUrl: null, // Пример другой уникальной иконки
        },
        {
            username: "@Trigge_r",
            tokens: 45,
            photoUrl: null, // Этот пользователь будет с дефолтной иконкой
        },
        {
            username: "@Leo_di",
            tokens: 45,
            photoUrl: null, // Этот пользователь будет с дефолтной иконкой
        },
        {
            username: "@Al_pl",
            tokens: 45,
            photoUrl: null, // Этот пользователь будет с дефолтной иконкой
        },
    ]);

    const handleClaim = () => {
        console.log("Claim clicked");
        // Здесь будет логика получения токенов
    };

    return (
        <div className={styles.container}>
            {/* Окно с поинтами и кнопкой Claim */}
            <div className={styles.pointsWindow}>
                <Headline weight="2" className={styles.points}>{referralPoints} Points</Headline>
                <Button mode="outline" size="s" className={styles.button} onClick={handleClaim}>Claim</Button>
            </div>

            {/* Описание программы рефералов */}
            <div className={styles.description}>
                Earn 10% of your fren's farm.
                Earn 2.5% of your fren's fren farm
            </div>

            {/* Список друзей */}
            <div className={styles.friendsList}>
                {friends.map((friend, index) => (
                    <div key={index} className={styles.friendCard}>
                        <Image
                            src={friend.photoUrl || userIcon} // Если у пользователя есть иконка, отображаем её, иначе - дефолтную
                            alt={`${friend.username} avatar`}
                            className={styles.friendAvatar}
                            width={25} height={25} // Размер изображения
                        />
                        <div className={styles.friendInfo}>
                            <Subheadline weight="2">{friend.username}</Subheadline>
                            <Subheadline className={styles.userToken} weight="1">{friend.tokens}G</Subheadline>
                        </div>

                    </div>
                ))}
            </div>

            {/* Кнопка Invite a friend */}
            <div className={styles.inviteButtonContainer}>
                <Button className={styles.button} mode="outline" size="l" stretched>Invite a friend</Button>
            </div>
        </div>
    );
};

export default Referral;
