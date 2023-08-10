export const Todos = { name: 'todos', builder: function (privateClient, publicClient) {
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
            saveToRemoteStorage: function (data) {
                return privateClient.storeObject("TodoData", "todos/", data)
                    .then(function() {
                        console.log("saved to remoteStorage");
                    })
            }
        }
    }
}}