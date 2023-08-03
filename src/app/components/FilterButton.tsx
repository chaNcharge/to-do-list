export default function FilterButton({ name, setFilter }: {
    name: string;
    setFilter: (filterName: string) => void;
}) {
    return (
        <button
            type="button"
            className="btn toggle-btn"
            onClick={() => setFilter(name)}
        >
            {name}
        </button>
    )
}