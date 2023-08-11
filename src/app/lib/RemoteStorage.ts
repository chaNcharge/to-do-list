import RemoteStorage from "remotestoragejs";
import { Todo } from "../page";


export function saveToRemoteStorage(data: Todo[], remoteStorage: RemoteStorage & Record<string, any>) {
    remoteStorage.todos.saveToRemoteStorage({todosData: data});
}

export function getRemoteStorage() {
    
}