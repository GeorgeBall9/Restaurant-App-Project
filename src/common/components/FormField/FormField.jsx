import "./FormField.css";
import React from "react";

const FormField = ({label, name, type, value, onChangeHandler, className}) => {
    return (
        <label className="form-field">
            {label}

            <input
                name={name}
                type={type}
                value={value}
                onChange={onChangeHandler}
                className={className}
            />
        </label>
    );
};

export default FormField;