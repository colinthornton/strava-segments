import React from 'react';
import PropTypes from 'prop-types';

export default function SegmentMessage({ noSegments, loading, errorMessage }) {
  return (
    <div className="d-flex justify-content-center w-100">
      {noSegments && !errorMessage ? <p>No segments found</p> : null}
      {loading ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : null}
      {errorMessage ? <p className="text-danger">{errorMessage}</p> : null}
    </div>
  );
}

SegmentMessage.propTypes = {
  noSegments: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
};

SegmentMessage.defaultProps = {
  errorMessage: null,
};
