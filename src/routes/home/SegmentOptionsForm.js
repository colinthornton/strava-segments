import React from 'react';
import PropTypes from 'prop-types';

import SegmentOptions from './SegmentOptions';

export default function SegmentOptionsForm({
  locationKey,
  activityTypeKey,
  minCatKey,
  maxCatKey,
  setState,
  loading,
}) {
  return (
    <form className="d-flex flex-row flex-wrap w-100">
      <div className="form-group ml-4 mb-2">
        <label
          className="d-flex flex-row align-items-center"
          htmlFor="locationSelect"
        >
          Location
          <select
            disabled={loading}
            className="form-control ml-2"
            id="locationSelect"
            value={locationKey}
            onChange={e => setState({ locationKey: e.target.value })}
          >
            {SegmentOptions.locationKeys.map(key => (
              <option key={key} value={key}>
                {SegmentOptions.locations[key].text}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="form-group ml-4 mb-2">
        <label
          className="d-flex flex-row align-items-center"
          htmlFor="activityTypeSelect"
        >
          Activity
          <select
            disabled={loading}
            className="form-control ml-2"
            id="activityTypeSelect"
            value={activityTypeKey}
            onChange={e => setState({ activityTypeKey: e.target.value })}
          >
            {SegmentOptions.activityTypeKeys.map(key => (
              <option key={key} value={key}>
                {SegmentOptions.activityTypes[key].text}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="form-group d-flex flex-row align-items-center ml-4 mb-2">
        <label
          className="d-flex flex-row align-items-center text-nowrap"
          htmlFor="minCatSelect"
        >
          Climbing Category
          <select
            disabled={loading}
            className="form-control mx-2"
            id="minCatSelect"
            value={minCatKey}
            onChange={e =>
              setState({
                minCatKey: e.target.value,
                maxCatKey:
                  e.target.value > maxCatKey ? e.target.value : maxCatKey,
              })
            }
          >
            {SegmentOptions.climbingCategoryKeys.map(key => (
              <option key={key} value={key}>
                {SegmentOptions.climbingCategories[key].text}
              </option>
            ))}
          </select>
        </label>
        <label
          className="d-flex flex-row align-items-center text-nowrap"
          htmlFor="maxCatSelect"
        >
          ～
          <select
            disabled={loading}
            className="form-control ml-2"
            id="maxCatSelect"
            value={maxCatKey}
            onChange={e =>
              setState({
                maxCatKey: e.target.value,
                minCatKey:
                  e.target.value < minCatKey ? e.target.value : minCatKey,
              })
            }
          >
            {SegmentOptions.climbingCategoryKeys.map(key => (
              <option key={key} value={key}>
                {SegmentOptions.climbingCategories[key].text}
              </option>
            ))}
          </select>
        </label>
      </div>
    </form>
  );
}

SegmentOptionsForm.propTypes = {
  locationKey: PropTypes.string.isRequired,
  activityTypeKey: PropTypes.string.isRequired,
  minCatKey: PropTypes.string.isRequired,
  maxCatKey: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
