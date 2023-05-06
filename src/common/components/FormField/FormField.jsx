import "./FormField.css";
import React from "react";

const FormField = ({label, placeholder, name, type, value, onChangeHandler, className, onKeyDown, padding, onFocus, onBlur}) => {

    const style = {
        padding: padding || "0.5em"
    };

    return (
        <label className="form-field">
            {label}

            <input
                style={style}
                name={name}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChangeHandler}
                className={className}
                onKeyDown={onKeyDown}
                onFocus={onFocus}
                onBlur={onBlur}
            />
        </label>
    );
};

export default FormField;