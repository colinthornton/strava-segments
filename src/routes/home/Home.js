import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { getLocations } from './segmentOptions';

export default function Home({ initSegments }) {
  const segments = [...initSegments];

  const locationNames = Object.keys(getLocations());

  const [formLocation, setFormLocation] = useState(locationNames[0]);

  // useEffect

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
            <th>Name</th>
            <th>Distance</th>
            <th>Avg Grade</th>
            <th>Elev Difference</th>
            <th>Climb Category</th>
          </tr>
        </thead>
        <tbody>
          {segments.map(segment => (
            <tr key={segment.id}>
              <td>{segment.name}</td>
              <td className="text-right">{segment.distance}m</td>
              <td className="text-right">{segment.avgGrade}%</td>
              <td className="text-right">{segment.elevDifference}m</td>
              <td>{segment.climbCategoryDesc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

Home.propTypes = {
  initSegments: PropTypes.arrayOf(PropTypes.object).isRequired,
};
