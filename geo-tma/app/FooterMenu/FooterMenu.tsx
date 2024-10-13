"use client"; // Это делает компонент клиентским
import Link from 'next/link';
import styles from './FooterMenu.module.css'; // Импортируем CSS-модуль
import Image from 'next/image';
import task from '@/app/tasks/Task'
import referralImg from '../icons/refferal.svg';
import homePageImg from '../icons/HomePage.svg';
import aiImg from '../icons/ai.svg';
import donateImg from '../icons/donate.svg'
import taskImg from '../icons/task.svg';
import { InlineButtons } from "@telegram-apps/telegram-ui";
import {
    InlineButtonsItem
} from "@telegram-apps/telegram-ui/dist/components/Blocks/InlineButtons/components/InlineButtonsItem/InlineButtonsItem";
import {
    SectionFooter
} from "@telegram-apps/telegram-ui/dist/components/Blocks/Section/components/SectionFooter/SectionFooter";

const FooterMenu = () => {
    return (
        <SectionFooter className={styles.menu}>

            <InlineButtons mode="gray">
                <Link href="/" className={styles.menuItem}>
                    <InlineButtonsItem mode="gray">
                        <Image src={homePageImg} alt="home" />
                    </InlineButtonsItem>
                </Link>
                <Link href="/referral" className={styles.menuItem}>
                    <InlineButtonsItem mode="gray">
                        <Image alt="referral" src={referralImg} />
                    </InlineButtonsItem>
                </Link>
                <Link href="/tasks" className={styles.menuItem}>
                    <InlineButtonsItem mode="gray">
                        <Image src={taskImg} alt="tasks" />
                    </InlineButtonsItem>
                </Link>
                <Link href="/ai" className={styles.menuItem}>
                    <InlineButtonsItem mode="gray">
                        <Image src={aiImg} alt="ai" />
                    </InlineButtonsItem>
                </Link>
                <Link href="/donate" className={styles.menuItem}>
                    <InlineButtonsItem mode="gray">
                        <Image src={donateImg} alt="donate" />
                    </InlineButtonsItem>
                </Link>

            </InlineButtons>
        </SectionFooter>
    );
};

export default FooterMenu;
