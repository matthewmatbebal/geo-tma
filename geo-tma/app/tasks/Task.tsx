"use client";

import { useState } from "react";
import styles from './Task.module.css';
import {Button} from "@telegram-apps/telegram-ui";
import starImg from '../icons/star.svg'
import Image from "next/image";
import arrowImg from '../icons/arrow.svg'

interface TaskProps {
    id: number;
    title: string;
    description: string;
    isStarted: boolean;
    isCompleted: boolean;
    reward: number;
    taskUrl: string;
}

const tasksMock: TaskProps[] = [
    {
        id: 1,
        title: "Join tg channel",
        description: "Join our partner's Telegram channel",
        isStarted: true,
        isCompleted: false,
        reward: 50,
        taskUrl: "https://tgui.xelene.me/?path=/docs/typography-largetitle--documentation"
    },
    {
        id: 2,
        title: "Follow us on Twitter",
        description: "Follow our official Twitter account",
        isStarted: false,
        isCompleted: false,
        reward: 100,
        taskUrl: "https://twitter.com/yourproject"
    },
    {
        id: 3,
        title: "Sign up for newsletter",
        description: "Stay updated with our latest news",
        isStarted: true,
        isCompleted: false,
        reward: 75,
        taskUrl: "https://example.com/newsletter-signup"
    }
];

const Task = () => {
    const [tasks, setTasks] = useState(tasksMock);

    const handleTaskComplete = (taskId: number) => {
        setTimeout(() => {
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === taskId ? { ...task, isCompleted: true } : task
                )
            );
        }, 3000); // Засчитываем задание через 3 секунды
    };

    return (
        <div className={styles.taskList}>
            {tasks.map((task) => (
                <div key={task.id} className={styles.taskCard}>
                    <div className={styles.taskHeader}>
                        <Image className={styles.icon} src={starImg} alt={'star'} />
                        <div>
                            <h5>{task.title}</h5>
                            <div className={styles.descr}>{task.description}</div>
                        </div>
                    </div>
                    <Button
                        className={styles.button}
                        mode="outline"
                        size="s"
                        disabled={task.isCompleted}
                        onClick={() => {
                            if (!task.isCompleted) {
                                window.open(task.taskUrl, "_blank"); // Открываем ссылку в новой вкладке
                                handleTaskComplete(task.id); // Засчитываем выполнение задания
                            }
                        }}
                    >
                        {task.isCompleted ? "Done" : "Start"}
                    </Button>
                </div>
            ))}
        </div>
    );
};

export default Task;
