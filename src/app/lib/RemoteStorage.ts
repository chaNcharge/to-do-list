import RemoteStorage from "remotestoragejs";
import { Todo } from "../page";
import { Todos } from "./RemoteStorage-module";


let remotePromise: Promise<any>;

export async function saveToRemoteStorage(data: Todo[]) {
    const remoteStorage = await remotePromise;
    await remoteStorage.todos.saveToRemoteStorage({ todosData: data });
}

export async function getRemoteStorage(): Promise<any> {
    const remoteStorage = await remotePromise;
    return await remoteStorage.todos.loadRemoteStorage();
}

export async function initRemote() {
    remotePromise = new Promise((resolve) => {
        const remoteStorage = new RemoteStorage({
            cache: true,
            logging: true,
            modules: [Todos]
        });

        remoteStorage.access.claim('todos', 'rw');
        remoteStorage.caching.enable('/todos/');

        remoteStorage.on('ready', function () {
            console.info("remoteStorage ready");
            resolve(remoteStorage);
        });

        remoteStorage.on('network-offline', () => {
            console.info("We're offline now.");
        })

        remoteStorage.on('network-online', () => {
            console.info("Hooray, we're back online!");
        })

        remoteStorage.on('connected', async () => {
            const userAddress = remoteStorage.remote.userAddress;
            console.info(`remoteStorage connected to “${userAddress}”`);
        });

        remoteStorage.on('not-connected', function () {
            console.info("remoteStorage not-connected (anonymous mode)", remoteStorage.remote?.TOKEN_URL);
        });

        remoteStorage.on('disconnected', function () {
            console.info("remoteStorage disconnected", arguments);
        });
    });
    return remotePromise;
}