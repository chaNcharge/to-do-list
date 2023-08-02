'use client';

import { useImmer } from 'use-immer';
import AddTodo from './components/AddTodo';
import TaskList from './components/TaskList';

let nextId = 3;
const initialTodos = [
    { id: 0, title: 'Buy milk', done: true },
    { id: 1, title: 'Eat tacos', done: false },
    { id: 2, title: 'Brew tea', done: false },
];

export default function TaskApp() {
    const [todos, updateTodos] = useImmer(initialTodos);
    const [highlightedId, setHighlightedId] = useImmer<number | null>(null);

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
        <div className='todoapp stack-large dark:bg-neutral-900'>
            <h1>To Do List</h1>
            <AddTodo
                onAddTodo={handleAddTodo}
            />
            <TaskList
                todos={todos}
                onChangeTodo={handleChangeTodo}
                onDeleteTodo={handleDeleteTodo}
                highlightedId={highlightedId}
                onHover={handleHover}
            />
        </div>
    );
}
