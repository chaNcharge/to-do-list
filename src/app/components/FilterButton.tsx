export default function FilterButton({ name, setFilter, isPressed }: {
    name: string;
    setFilter: (filterName: string) => void;
    isPressed: boolean
}) {
    return (
        <button
            type="button"
            className={`btn toggle-btn ${isPressed ? 'bg-neutral-300 dark:bg-neutral-400' : ''}`}
            onClick={() => setFilter(name)}
        >
            {name}
        </button>
    )
}