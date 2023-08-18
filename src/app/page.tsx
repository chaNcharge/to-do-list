'use client';

import { useImmer } from 'use-immer';
import { useEffect, useState } from 'react';
import AddTodo from './components/AddTodo';
import TaskList from './components/TaskList';
import FilterButton from './components/FilterButton';
import { getRemoteStorage, initRemote } from './lib/RemoteStorage';


export interface Todo {
    id: number;
    title: string;
    done: boolean;
}

export interface FilterMap {
    [key: string]: (todo: Todo) => boolean;
}

// All todos stored in JSON format under 'todos' key
/*
const RemoteStorageWidget = dynamic(() => import("./components/RemoteStorageWidget"), {
    ssr: false
});
*/
const initialTodos: Todo[] = []

let nextId = 0;

const FILTER_MAP: FilterMap = {
    All: () => true,
    Active: (todo: { done: boolean; }) => !todo.done,
    Completed: (todo: { done: boolean; }) => todo.done,
};

const FILTER_NAMES: string[] = Object.keys(FILTER_MAP);

export default function TaskApp() {
    const [todos, updateTodos] = useImmer(initialTodos);
    const [highlightedId, setHighlightedId] = useImmer<number | null>(null);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        async function remoteStartup() {
            const remoteStorage = await initRemote();
            const { default: Widget } = await import('remotestorage-widget');
            new Widget(remoteStorage).attach("storage-login");
            try {
                const remoteStorageTodoObject = await getRemoteStorage();

                console.debug("Remote storage object:", remoteStorageTodoObject);

                const remoteStorageTodoArray: Todo[] = remoteStorageTodoObject.todosData;
                console.debug(remoteStorageTodoArray);

                nextId = remoteStorageTodoArray.length;
                updateTodos(remoteStorageTodoArray.map((todo, index) => ({
                    ...todo,
                    id: index,
                })));
            } catch (error) {
                console.warn("Error loading from remoteStorage (possibly just empty and intentional):", error);
            }
        }

        remoteStartup();
    }, [updateTodos]);

    function handleAddTodo(title: string) {
        updateTodos(draft => {
            draft.push({
                id: nextId++,
                title: title,
                done: false
            });
        })
    }

    function handleChangeTodo(nextTodo: { id: number; title: string; done: boolean; }) {
        updateTodos(draft => {
            const todo = draft.find(t => t.id === nextTodo.id);

            if (todo) {
                todo.title = nextTodo.title;
                todo.done = nextTodo.done;
            } else {
                console.error(`Todo with id ${nextTodo.id} not found.`);
            }
        });
    }

    function handleDeleteTodo(todoId: number) {
        updateTodos(draft => {
            const index = draft.findIndex(t =>
                t.id === todoId
            );
            draft.splice(index, 1);
        })
    }

    function handleHover(todoId: number | null) {
        setHighlightedId(todoId);
    }

    return (
        <>
            <div className='todoapp stack-large dark:bg-neutral-900'>
                <h1>To Do List</h1>
                <AddTodo
                    onAddTodo={handleAddTodo}
                />
                <div className='filters btn-group stack-exception'>
                    {FILTER_NAMES.map(name => (
                        <FilterButton key={name} name={name} setFilter={setFilter} isPressed={name === filter} />
                    ))}
                </div>
                <TaskList
                    todos={todos}
                    onChangeTodo={handleChangeTodo}
                    onDeleteTodo={handleDeleteTodo}
                    highlightedId={highlightedId}
                    onHover={handleHover}
                    filter={filter}
                    filterMap={FILTER_MAP}
                />
            </div>
            <div
                id="storage-login"
                className="flex flex-col items-center justify-center border p-6"
            >
                Log in to remoteStorage
            </div>
        </>
    );
}
