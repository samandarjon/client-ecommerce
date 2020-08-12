import React from 'react';
import classnames from "classnames";
import PropTypes from "prop-types"

const InputGroup = ({
                        name,
                        placeholder,
                        value,
                        error,
                        type,
                        info,
                        onChange,
                        addInput,
                        removeInput
                    }) => {
    return (
        <div className="input-group my-2" onChange={onChange}>

            <div className="input-group-prepend">
                <button className="btn btn-danger" onClick={removeInput} type="button">-</button>

            </div>
            <input
                className={classnames("form-control form-control-lg", {
                    "is-invalid": error
                })}
                placeholder={placeholder}
                name={name[0]}
                value={value.name ? value.name : ""}

            />
            <input
                className={classnames("form-control form-control-lg", {
                    "is-invalid": error
                })}
                placeholder={placeholder}
                name={name[1]}
                value={value.value ? value.value : ""}
            />
            <div className="input-group-append">
                <button className="btn btn-info" onClick={addInput} type="button">+</button>
            </div>
            {info && <small className="form-text text-muted">{info}</small>}
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    )
}
InputGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};
InputGroup.defaultProps = {
    type: "text"
};

export default InputGroup;