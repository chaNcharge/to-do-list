import { useEffect, useState } from 'react';
import { FilterMap, Todo } from '../page';
import { saveToRemoteStorage } from '../lib/RemoteStorage';

export default function TaskList({
    todos,
    onChangeTodo,
    onDeleteTodo,
    highlightedId,
    onHover,
    filter,
    filterMap
}: {
    todos: Todo[];
    onChangeTodo: (nextTodo: { id: number; title: string; done: boolean; }) => void;
    onDeleteTodo: (todoId: number) => void;
    highlightedId: number | null;
    onHover: (todoId: number | null) => void;
    filter: string;
    filterMap: FilterMap;
}) {
    useEffect(() => {
        //saveToLocalStorage("todos", todos);
        //console.log("saving to localStorage");
        saveToRemoteStorage(todos);
    }, [todos])

    return (
        <ul
            role='list'
            className='todo-list stack-large stack-exception'
            aria-labelledby='list-heading'
        >
            {todos
                .filter(filterMap[filter])
                .map(todo => (
                    <li key={todo.id}
                        className={`todo stack-small ${todo.id === highlightedId ? 'bg-sky-100 dark:bg-neutral-700' : ''}`}
                        onFocus={() => {
                            onHover(todo.id);
                        }}
                        onPointerMove={() => {
                            onHover(todo.id);
                        }}
                        onPointerLeave={() => {
                            onHover(null);
                        }}>
                        <Task
                            todo={todo}
                            onChange={onChangeTodo}
                            onDelete={onDeleteTodo}
                        />
                    </li>
                ))}
        </ul>
    );
}

function Task({
    todo,
    onChange,
    onDelete
}: {
    todo: { id: number; title: string; done: boolean; };
    onChange: (nextTodo: { id: number; title: string; done: boolean; }) => void;
    onDelete: (todoId: number) => void;
}) {
    const [isEditing, setIsEditing] = useState(false);
    let todoContent: JSX.Element;
    if (isEditing) {
        todoContent = (
            <form
                className='stack-small'
                onSubmit={e => {
                    e.preventDefault();
                    setIsEditing(false);
                }}
            >
                <div className='form-group'>
                    <input
                        value={todo.title}
                        onChange={e => {
                            onChange({
                                ...todo,
                                title: e.target.value
                            });
                        }}
                    />
                </div>

                <div className='btn-group'>
                    <button type='submit' className='btn' onClick={() => setIsEditing(false)}>
                        Save
                    </button>
                    <button type='button' className='btn btn__danger' onClick={() => onDelete(todo.id)}>
                        Delete
                    </button>
                </div>
            </form>
        );
    } else {
        todoContent = (
            <div className='stack-small'>
                <div className='c-cb'>
                    <input
                        type="checkbox"
                        checked={todo.done}
                        onChange={e => {
                            onChange({
                                ...todo,
                                done: e.target.checked
                            });
                        }}
                    />
                    <label className='todo-label' htmlFor={todo.id.toString()}>
                        {todo.title}
                    </label>
                </div>

                <div className='btn-group'>
                    <button type='button' className='btn' onClick={() => setIsEditing(true)}>
                        Edit
                    </button>
                    <button type='button' className='btn btn__danger' onClick={() => onDelete(todo.id)}>
                        Delete
                    </button>
                </div>
            </div>
        );
    }
    return (
        todoContent
    );
}
