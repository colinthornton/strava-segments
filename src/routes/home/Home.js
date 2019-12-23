import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import ApplicationContext from '../../components/ApplicationContext';
import { getLocations } from './segmentOptions';
import fetchSegments from './fetchSegments';

export default function Home({ initSegments }) {
  const { context } = useContext(ApplicationContext);
  const [segments, setSegments] = useState(initSegments);
  const [errorMessage, setErrorMessage] = useState(null);

  const locationNames = Object.keys(getLocations());
  const [formLocation, setFormLocation] = useState(locationNames[0]);

  useEffect(() => {
    (async () => {
      try {
        setErrorMessage(null);
        const fetchedSegments = await fetchSegments(context.fetch, {
          ...getLocations()[formLocation],
        });
        setSegments(fetchedSegments);
      } catch (error) {
        setSegments([]);
        setErrorMessage('Failed to load segments');
      }
    })();
  }, [formLocation]);

  return (
    <div>
      <form>
        <select
          value={formLocation}
          onChange={e => setFormLocation(e.target.value)}
        >
          {locationNames.map(location => (
            <option value={location}>{location.toUpperCase()}</option>
          ))}
        </select>
      </form>
      <h1>Kanto Segments</h1>
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
      </table>
      {errorMessage ? <p className="text-danger">{errorMessage}</p> : null}
    </div>
  );
}

Home.propTypes = {
  initSegments: PropTypes.arrayOf(PropTypes.object).isRequired,
};
