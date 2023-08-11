export const Todos = {
    name: 'todos', builder: function (privateClient: { declareType: (arg0: string, arg1: { type: string; properties: { todosData: { type: string; }; }; required: string[]; }) => void; storeObject: (arg0: string, arg1: string, arg2: any) => Promise<any>; }, publicClient: any) {
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
                saveToRemoteStorage: async function (data: any) {
                    await privateClient.storeObject("TodoData", "todos/", data);
                    console.log("saved to remoteStorage");
                }
            }
        }
    }
}