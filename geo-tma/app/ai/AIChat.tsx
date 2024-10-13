"use client";

import { useState } from "react";
import { FileInput, ButtonCell, LargeTitle, Text } from "@telegram-apps/telegram-ui";
import styles from './AIChat.module.css';

const AIChat = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);  // Для хранения выбранного файла
    const [response, setResponse] = useState<{ title: string; description: string } | null>(null); // Ответ от сервера
    const [loading, setLoading] = useState(false);  // Состояние загрузки
    const [error, setError] = useState<string | null>(null); // Для хранения ошибки
    const [imagePreview, setImagePreview] = useState<string | null>(null); // Для отображения превью изображения

    const userId = "testUser123"; // Текущий userId, который отправляется в запросе

    // Обработка изменения файла
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedFile(file);
        if (file) {
            const fileURL = URL.createObjectURL(file); // Создаем превью
            setImagePreview(fileURL);
        }
    };

    // Отправка файла на сервер для анализа
    const handleSend = async () => {
        if (!selectedFile) return;  // Если файл не выбран, не отправляем запрос
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            // Добавляем userId как query-параметр в URL
            const response = await fetch(`http://13.51.205.105/analyze/img?userId=${encodeURIComponent(userId)}`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();  // Получаем детализированное сообщение об ошибке
                const errorMsg = errorData.detail?.[0]?.msg || 'Произошла ошибка';
                throw new Error(errorMsg);
            }

            const data = await response.json();  // Получаем успешный ответ от сервера
            setResponse(data);
        } catch (error) {
            setError(`Ошибка: ${(error as Error).message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <LargeTitle className={styles.instructions}>
                You can upload photos of any test results and get an interpretation.
            </LargeTitle>

            <div className={styles.fileInput}>
                <FileInput
                    label="Upload image"
                    onChange={handleFileChange}
                    multiple={false}
                    className={styles.input}
                />
            </div>

            {imagePreview && (
                <div className={styles.imagePreview}>
                    <img src={imagePreview} alt="Preview" className={styles.previewImage} />
                </div>
            )}

            <div className={styles.sendButton}>
                <ButtonCell disabled={!selectedFile || loading} onClick={handleSend}>
                    {loading ? 'Sending...' : 'Send'}
                </ButtonCell>
            </div>

            {error && <Text className={styles.errorText}>{error}</Text>}

            {response && (
                <div className={styles.response}>
                    <Text className={styles.responseTitle}>{response.title}</Text> <br/>
                    <Text className={styles.responseDescription} dangerouslySetInnerHTML={{ __html: response.description }} />
                </div>
            )}
        </div>
    );
};

export default AIChat;
