import { IHttpClient } from "@equinor/fusion-framework-module-http";
import { FusionTask } from "./types/fusion-task";
import { PimsTask } from "./types/pims-task";
import { ProcosysTasks } from "./types/procosys-task";


export async function getFusionTasks(client: IHttpClient, ): Promise<FusionTask[]> {
    const response = await client.fetch('/persons/me/tasks');
    return await response.json();
}

export async function getPimsTasks(client: IHttpClient, ): Promise<FusionTask[]> {
    const response = await client.fetch('/persons/me/tasks/pims');
    const pimsTask: PimsTask[] = await response.json()
    return pimsTask.map((task)=>({
        id: task.id,
        externalId: task.id,
        created:   task.createdDate, 
        dueDate: task.deadlineDate, 
        category: task.category,
        type: task.taskTypeKey,
        sourceSystem: {
            subSystem: 'Pims',
        },
        title: task.title,
        url: task.url, 
    })as FusionTask)
}


export async function getProCoSysAssignments(client: IHttpClient): Promise<FusionTask[]> {
    const response = await client.fetch('/persons/me/tasks/procosys');

    const procosysTasks: ProcosysTasks[] = await response.json();
    return procosysTasks.map(
        (task) =>
        ({
            id: task.id,
            externalId: task.id,
            created:   "-", 
            dueDate: task.dueDate, 
            category: task.category,
            type: task.taskTypeKey,
            sourceSystem: {
                subSystem: 'ProCoSys',
            },
            title: task.description,
            url: task.url, 
        } as FusionTask)
    );
}