import React from 'react';
import PropTypes from 'prop-types';

export default function LabeledSelect({
  id,
  label,
  value,
  setValue,
  options,
  labelClass,
  selectClass,
  optionClass,
  disabled,
}) {
  return (
    <label className={labelClass} htmlFor={id}>
      {label}
      <select
        disabled={disabled}
        className={selectClass}
        id={id}
        value={value}
        onChange={e => setValue(e.target.value)}
      >
        {options.map(({ value: optionVal, text }) => (
          <option className={optionClass} key={optionVal} value={optionVal}>
            {text}
          </option>
        ))}
      </select>
    </label>
  );
}

LabeledSelect.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      text: PropTypes.string,
    }),
  ).isRequired,
  label: PropTypes.string,
  labelClass: PropTypes.string,
  selectClass: PropTypes.string,
  optionClass: PropTypes.string,
  disabled: PropTypes.bool,
};

LabeledSelect.defaultProps = {
  label: '',
  labelClass: '',
  selectClass: '',
  optionClass: '',
  disabled: false,
};
