// app/tasks/page.tsx

import Task from "./Task";
import {LargeTitle} from "@telegram-apps/telegram-ui";

export default function TasksPage() {
    return (
        <div >
            <LargeTitle style={{textAlign: "center" , margin: "20px", border:'1px solid white', padding:'15px'}} weight="3">QUESTS</LargeTitle>
            <Task />
        </div>
    );
}
