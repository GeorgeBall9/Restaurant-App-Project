import "./FormField.css";
import React from "react";

const FormField = ({label, type, value, onChangeHandler, className}) => {
    return (
        <label className="form-field">
            {label}

            <input
                type={type}
                value={value}
                onChange={onChangeHandler}
                className={className}
                required={true}
            />
        </label>
    );
};

export default FormField;