import { useState } from 'react';

export default function AddTodo({ onAddTodo }: { onAddTodo: (title: string) => void }) {
    const [title, setTitle] = useState('');
    return (
        <form onSubmit={e => {
            e.preventDefault();
            setTitle('');
            onAddTodo(title);
        }}>
            <input
                className='input input__lg'
                placeholder="Add todo"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <button className='btn btn__primary btn__lg' type='submit'>Add</button>
        </form>
    )
}
