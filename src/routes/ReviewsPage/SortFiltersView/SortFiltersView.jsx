import "./SortFiltersView.css";

const SortFiltersView = ({filters, handleClick}) => {
    return (
        <div className="sort-filters-view">
            {filters.map(({text, active, type, multiplier}, i) => (
                <button
                    key={i}
                    onClick={() => handleClick(text, type, multiplier)}
                    className={active ? "active" : ""}
                >
                    {text}
                </button>
            ))}
        </div>
    );
};

export default SortFiltersView;