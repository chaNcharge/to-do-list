import { Todo } from "../page";

export const Todos = {
    name: 'todos', builder: function (privateClient: { declareType: (arg0: string, arg1: { type: string; properties: { todosData: { type: string; }; }; required: string[]; }) => void; storeObject: (arg0: string, arg1: string, arg2: any) => Promise<unknown>; getObject: (path: string) => Promise<unknown>}) {
        privateClient.declareType("TodoData", {
            type: 'object',
            properties: {
                todosData: {
                    type: 'array',
                },
            },
            required: ['todosData']
        });

        return {
            exports: {
                saveToRemoteStorage: async function (data: Todo[]) {
                    await privateClient.storeObject("TodoData", "to-do-list", data)
                        .then(() => console.log("saved to remoteStorage"))
                        .catch(error => console.error("Error saving to remoteStorage", error));
                },
                
                loadRemoteStorage: async function () {
                    return privateClient.getObject("to-do-list")
                        .then(result => {
                            return result;
                        })
                        .catch(error => {
                            console.error("Error loading remoteStorage", error);
                            return null;
                        });
                }
            }
        }
    }
}