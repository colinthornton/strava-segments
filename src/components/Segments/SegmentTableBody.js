import React from 'react';
import PropTypes from 'prop-types';

export default function SegmentTableBody({ segments }) {
  return (
    <tbody>
      {segments.map(segment => (
        <tr key={segment.id}>
          <td>
            <a href={`https://www.strava.com/segments/${segment.id}`}>
              {segment.name}
            </a>
          </td>
          <td className="text-right">{segment.distance} m</td>
          <td className="text-right">{segment.avgGrade}%</td>
          <td className="text-right">{segment.elevDifference} m</td>
          <td>{segment.climbCategoryDesc}</td>
        </tr>
      ))}
    </tbody>
  );
}

SegmentTableBody.propTypes = {
  segments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      distance: PropTypes.number,
      avgGrade: PropTypes.number,
      elevDifference: PropTypes.number,
      climbCategoryDesc: PropTypes.string,
    }),
  ).isRequired,
};
