import React from 'react';
import PropTypes from 'prop-types';

import SegmentOptions from '../../data/services/SegmentOptions';
import SegmentOptionSelect from './SegmentOptionSelect';

const locationOptions = SegmentOptions.locationKeys.map(key => ({
  value: key,
  text: SegmentOptions.locations[key].text,
}));
const activityTypeOptions = SegmentOptions.activityTypeKeys.map(key => ({
  value: key,
  text: SegmentOptions.activityTypes[key].text,
}));
const climbingCategoryOptions = SegmentOptions.climbingCategoryKeys.map(
  key => ({
    value: key,
    text: SegmentOptions.climbingCategories[key].text,
  }),
);

export default function SegmentOptionsForm({ state, setState, disabled }) {
  return (
    <form className="d-flex flex-row flex-wrap w-100">
      <div className="form-group ml-4 mb-2">
        <SegmentOptionSelect
          id="locationSelect"
          label="Location"
          value={state.locationKey}
          setValue={locationKey => setState({ ...state, locationKey })}
          options={locationOptions}
          labelClass="d-flex flex-row align-items-center"
          selectClass="form-control ml-2"
          disabled={disabled}
        />
      </div>
      <div className="form-group ml-4 mb-2">
        <SegmentOptionSelect
          id="activityTypeSelect"
          label="Activity"
          value={state.activityTypeKey}
          setValue={activityTypeKey => setState({ ...state, activityTypeKey })}
          options={activityTypeOptions}
          labelClass="d-flex flex-row align-items-center"
          selectClass="form-control ml-2"
          disabled={disabled}
        />
      </div>
      <div className="form-group d-flex flex-row align-items-center ml-4 mb-2">
        <SegmentOptionSelect
          id="minCatSelect"
          label="Climbing Category"
          value={state.minCatKey}
          setValue={minCatKey =>
            setState({
              ...state,
              minCatKey,
              maxCatKey:
                state.maxCatKey < minCatKey ? minCatKey : state.maxCatKey,
            })
          }
          options={climbingCategoryOptions}
          labelClass="d-flex flex-row align-items-center text-nowrap"
          selectClass="form-control mx-2"
          disabled={disabled}
        />
        <SegmentOptionSelect
          id="maxCatSelect"
          label="～"
          value={state.maxCatKey}
          setValue={maxCatKey =>
            setState({
              ...state,
              maxCatKey,
              minCatKey:
                state.minCatKey > maxCatKey ? maxCatKey : state.minCatKey,
            })
          }
          options={climbingCategoryOptions}
          labelClass="d-flex flex-row align-items-center text-nowrap"
          selectClass="form-control ml-2"
          disabled={disabled}
        />
      </div>
    </form>
  );
}

SegmentOptionsForm.propTypes = {
  state: PropTypes.exact({
    locationKey: PropTypes.string,
    activityTypeKey: PropTypes.string,
    minCatKey: PropTypes.string,
    maxCatKey: PropTypes.string,
  }).isRequired,
  setState: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};
