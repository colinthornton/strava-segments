import React from 'react';
import PropTypes from 'prop-types';
import SegmentTableBody from './SegmentTableBody';

export default function SegmentTable({ segments, loading }) {
  return (
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
      {loading ? null : <SegmentTableBody segments={segments} />}
    </table>
  );
}

SegmentTable.propTypes = {
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
  loading: PropTypes.bool.isRequired,
};
