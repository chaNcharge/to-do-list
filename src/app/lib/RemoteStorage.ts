import RemoteStorage from "remotestoragejs";
import { Todo } from "../page";


export function saveToRemoteStorage(data: Todo[], remoteStorage: RemoteStorage & Record<string, any>) {
    remoteStorage.todos.saveToRemoteStorage({todosData: data});
}

export async function getRemoteStorage(remoteStorage: RemoteStorage & Record<string, any>): Promise<unknown> {
    return remoteStorage.todos.loadRemoteStorage()
        .then((obj: object) => {
            if (obj !== null) {
                return obj;
            } else {
                console.log("Remote storage object not found!");
            }
        })
}