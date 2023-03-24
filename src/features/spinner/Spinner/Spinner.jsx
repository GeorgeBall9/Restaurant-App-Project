import "./Spinner.css";

const Spinner = () => {
    return (
        <div className="spinner-overlay">
            <div className="spin-container">
                <div className="spin" id="loader"></div>
                {/*<div className="spin" id="loader2"></div>*/}
                {/*<div className="spin" id="loader3"></div>*/}
                {/*<div className="spin" id="loader4"></div>*/}
                <span id="text">Loading...</span>
            </div>
        </div>
    );
};

export default Spinner;