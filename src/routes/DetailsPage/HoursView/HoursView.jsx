import "./HoursView.css";

const HoursView = ({hours}) => {
    return (
        <div className="hours-view">
            <h2>Opening Times</h2>

            {hours.map((hour, index) => (
                <p key={index}>{hour}</p>
            ))}
        </div>
    );
};

export default HoursView;