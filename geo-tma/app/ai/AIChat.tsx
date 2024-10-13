"use client";

import { useState } from "react";
import { FileInput, ButtonCell, LargeTitle, Text } from "@telegram-apps/telegram-ui";
import styles from './AIChat.module.css';

const AIChat = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);  // Для хранения выбранного файла
    const [response, setResponse] = useState<{ title: string; description: string } | null>(null); // Ответ от сервера
    const [loading, setLoading] = useState(false);  // Состояние загрузки

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedFile(file);
    };

    const handleSend = async () => {
        if (!selectedFile) return;  // Если файл не выбран, не отправляем запрос
        setLoading(true);

        try {
            // Заглушка для ответа от бэкенда с данными по ЭКГ
            const mockResponse = {
                title: "ECG Results Interpretation",
                description: `
                    - **Heart Rate**: 72 bpm (Normal range: 60-100 bpm)<br />
                    - **Rhythm**: Sinus rhythm with no significant arrhythmias.<br />
                    - **P wave**: Duration 0.08s (Normal: 0.06-0.12s), morphology is normal.<br />
                    - **QRS Complex**: Duration 0.09s (Normal: 0.06-0.10s), axis is normal.<br />
                    - **T wave**: Normal morphology, no signs of ischemia.<br />
                    - **PR Interval**: 0.16s (Normal range: 0.12-0.20s), no first-degree AV block.<br />
                    - **ST Segment**: No signs of ST elevation or depression, normal repolarization.<br />
                    - **QT Interval**: 0.38s (Normal for heart rate).<br />
                    
                    **Conclusion**: This is a normal ECG with no abnormalities. Continue routine check-ups if needed.
                `
            };

            // Симуляция задержки при запросе на сервер
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Устанавливаем статический ответ вместо реального вызова API
            setResponse(mockResponse);
        } catch (error) {
            console.error('Ошибка при отправке файла:', error);
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

            <div className={styles.sendButton}>
                <ButtonCell disabled={!selectedFile || loading} onClick={handleSend}>
                    {loading ? 'Sending...' : 'Send'}
                </ButtonCell>
            </div>

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
