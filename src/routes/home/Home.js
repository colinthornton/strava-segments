import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import ApplicationContext from '../../components/ApplicationContext';
import SegmentOptions from './SegmentOptions';
import fetchSegments from './fetchSegments';

export default function Home({ initSegments }) {
  const { context } = useContext(ApplicationContext);
  const [segments, setSegments] = useState(initSegments);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  // Search options
  const [formLocationKey, setFormLocationKey] = useState(
    SegmentOptions.locationKeys[0],
  );
  const [formActivityTypeKey, setFormActivityTypeKey] = useState(
    SegmentOptions.activityTypeKeys[0],
  );

  useEffect(() => {
    setLoading(true);
    setErrorMessage(null);
    fetchSegments(context.fetch, {
      startLatlong:
        SegmentOptions.locations[formLocationKey].value.startLatlong,
      endLatlong: SegmentOptions.locations[formLocationKey].value.endLatlong,
      activityType: SegmentOptions.activityTypes[formActivityTypeKey].value,
    })
      .then(fetchedSegments => {
        setSegments(fetchedSegments);
      })
      .catch(() => {
        setSegments([]);
        setErrorMessage('Failed to load segments');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [formLocationKey, formActivityTypeKey]);

  return (
    <div>
      <h1>Strava Segments</h1>
      <div className="row">
        <form className="form-inline p-3">
          <div className="form-group">
            <label htmlFor="locationNameSelect">
              Location
              <select
                className="form-control ml-2"
                id="locationNameSelect"
                value={formLocationKey}
                onChange={e => setFormLocationKey(e.target.value)}
              >
                {SegmentOptions.locationKeys.map(key => (
                  <option key={key} value={key}>
                    {SegmentOptions.locations[key].text}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="form-group ml-4">
            <label htmlFor="activityTypeSelect">
              Activity
              <select
                className="form-control ml-2"
                id="activityTypeSelect"
                value={formActivityTypeKey}
                onChange={e => setFormActivityTypeKey(e.target.value)}
              >
                {SegmentOptions.activityTypeKeys.map(key => (
                  <option key={key} value={key}>
                    {SegmentOptions.activityTypes[key].text}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </form>
      </div>
      <div className="row">
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th className="text-center">Name</th>
              <th className="text-center">Distance</th>
              <th className="text-center">Avg Grade</th>
              <th className="text-center">Elev Difference</th>
              <th className="text-center">Climb Category</th>
            </tr>
          </thead>
          {loading ? null : (
            <tbody>
              {segments.map(segment => (
                <tr key={segment.id}>
                  <td>{segment.name}</td>
                  <td className="text-right">{segment.distance} m</td>
                  <td className="text-right">{segment.avgGrade}%</td>
                  <td className="text-right">{segment.elevDifference} m</td>
                  <td>{segment.climbCategoryDesc}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        <div className="d-flex justify-content-center w-100">
          {segments.length === 0 ? <p>No segments found</p> : null}
          {loading ? (
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : null}
          {errorMessage ? <p className="text-danger">{errorMessage}</p> : null}
        </div>
      </div>
    </div>
  );
}

Home.propTypes = {
  initSegments: PropTypes.arrayOf(PropTypes.object).isRequired,
};
