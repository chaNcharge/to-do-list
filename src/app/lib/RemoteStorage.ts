import { Todo, remoteStorage } from "../page";


export function saveToRemoteStorage(data: Todo[]) {
    remoteStorage.todos.saveToRemoteStorage({todosData: data});
}

export function getRemoteStorage() {
    
}