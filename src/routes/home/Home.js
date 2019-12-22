import React from 'react';
import PropTypes from 'prop-types';

export default function Home({ segments }) {
  return (
    <div>
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
  segments: PropTypes.arrayOf(PropTypes.object).isRequired,
};
