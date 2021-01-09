import React from "react";
import classnames from "classnames";
import {Link} from "react-router-dom";
import PropTypes from "prop-types"


const SelectListGroup = ({name, value, error, info, onChange, options, disable}) => {
    const selectOptions = options.map(option => (
        <option disabled={disable} key={option.id} value={option.id ? option.id : option}>
            {(option.province) ? (
                option.province + " vil, " + option.city + " shahar(tuman), " + option.home) : option.name ? option.name : option
            }

        </option>
    ));
    return (
        <div className="form-group">
            <select
                className={classnames("form-control form-control-lg", {
                    "is-invalid": error
                })}
                name={name}
                value={value}
                onChange={onChange}
            >
                {selectOptions}
            </select>
            {info && <small
                className="form-text text-muted">{info} {info.toString().includes("Kerakli manzilni") ?
                < Link to={"/addresses"}>Yaratish</Link> : ""}</small>}
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

SelectListGroup.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired
};
SelectListGroup.defaultProps = {
    type: false
};

export default SelectListGroup;
