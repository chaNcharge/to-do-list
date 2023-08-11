import RemoteStorage from "remotestoragejs";
import { Todo } from "../page";


export function saveToRemoteStorage(data: Todo[], remoteStorage: RemoteStorage & { todos: { saveToRemoteStorage: (data: any) => Promise<void> } }) {
    remoteStorage.todos.saveToRemoteStorage({todosData: data});
}

export function getRemoteStorage() {
    
}