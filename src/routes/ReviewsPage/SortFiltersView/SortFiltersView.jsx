import "./SortFiltersView.css";

const SortFiltersView = ({filters, handleClick}) => {
    return (
        <div className="sort-filters">
            {filters.map(({active, text}) => (
                <button onClick={handleClick} className={active ? "active" : ""}>{text}</button>
            ))}
        </div>
    );
};

export default SortFiltersView;