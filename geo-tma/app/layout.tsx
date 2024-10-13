"use client";

import '@telegram-apps/telegram-ui/dist/styles.css';
import { AppRoot } from "@telegram-apps/telegram-ui"; // Импорт AppRoot
import FooterMenu from "@/app/FooterMenu/FooterMenu";
import './globals.css'; // Импортируем глобальные стили

import React from "react"; // Импорт FooterMenu

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body>
        <AppRoot>
            {children}
            <FooterMenu />
        </AppRoot>
        </body>
        </html>
    );
}
