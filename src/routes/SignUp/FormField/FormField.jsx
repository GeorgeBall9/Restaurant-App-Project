import "./FormField.css";
import React from "react";

const FormField = ({label, type, value, onChangeHandler}) => {
    return (
        <label className="signup-label">
            {label}

            <input
                type={type}
                className="signup-input"
                value={value}
                onChange={onChangeHandler}
                required
            />
        </label>
    );
};

export default FormField;