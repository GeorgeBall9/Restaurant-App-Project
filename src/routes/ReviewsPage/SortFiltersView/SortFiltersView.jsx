import "./SortFiltersView.css";

const SortFiltersView = ({filters, handleClick}) => {
    return (
        <div className="sort-filters">
            {filters.map(({active, text}, i) => (
                <button key={i} onClick={() => handleClick(text)} className={active ? "active" : ""}>{text}</button>
            ))}
        </div>
    );
};

export default SortFiltersView;