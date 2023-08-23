import RemoteStorage from "remotestoragejs";
import { Todo } from "../page";
import { Todos } from "./RemoteStorage-module";


let remotePromise: Promise<RemoteStorage & Record<string, any>>;

/**
 * Saves data to remoteStorage. Stores locally and on user account if connected
 * @param data The Todo[] array to save to storage
 */
export async function saveToRemoteStorage(data: Todo[]) {
    const remoteStorage = await remotePromise;
    await remoteStorage.todos.saveToRemoteStorage({ todosData: data });
}

/**
 * Loads data from remoteStorage.
 * @returns An object including the array (see module) `{todosData: Todo[]}`
 */
export async function getRemoteStorage(): Promise<{todosData: Todo[]}> {
    const remoteStorage = await remotePromise;
    return await remoteStorage.todos.loadRemoteStorage();
}

/**
 * Initializes the remoteStorage protocol
 * 
 * @returns A promise that becomes the remoteStorage object
 * to use in the read/write functions
 */
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
            // Fulfills the promise as a prepared RemoteStorage object
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