import "./FormField.css";
import React from "react";

const FormField = ({label, type, value, onChangeHandler}) => {
    return (
        <label className="form-field">
            {label}

            <input
                type={type}
                value={value}
                onChange={onChangeHandler}
                required
            />
        </label>
    );
};

export default FormField;