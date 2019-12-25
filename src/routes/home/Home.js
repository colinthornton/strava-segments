import React, { useState, useEffect, useContext, useRef } from 'react';
import PropTypes from 'prop-types';

import SegmentMessage from '../../components/Segments/SegmentMessage';
import SegmentOptionsForm from '../../components/Segments/SegmentOptionsForm';
import SegmentTable from '../../components/Segments/SegmentTable';
import ApplicationContext from '../../components/ApplicationContext';
import SegmentOptions from '../../data/services/SegmentOptions';
import fetchSegments from './fetchSegments';

export default function Home({ initialSegments, initialOptions }) {
  const { context } = useContext(ApplicationContext);
  // Segment data state
  const [segments, setSegments] = useState(initialSegments);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  // Segment filter options
  const [formState, setFormState] = useState(initialOptions);

  const initialRender = useRef(true);
  useEffect(() => {
    // Skips fetching on initial render
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    fetchSegments(context.fetch, SegmentOptions.toQueryVariables(formState))
      .then(fetchedSegments => {
        setSegments(fetchedSegments);
      })
      .catch(() => {
        setErrorMessage('Failed to load segments');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [formState]);

  return (
    <div>
      <h1>Strava Segments</h1>
      <div className="row">
        <SegmentOptionsForm
          state={formState}
          setState={setFormState}
          disabled={loading}
        />
      </div>
      <div className="row">
        <SegmentTable segments={segments} loading={loading} />
        <SegmentMessage
          noSegments={segments.length === 0}
          loading={loading}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
}

Home.propTypes = {
  initialSegments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      distance: PropTypes.number,
      avgGrade: PropTypes.number,
      elevDifference: PropTypes.number,
      climbCategoryDesc: PropTypes.string,
    }),
  ).isRequired,
  initialOptions: PropTypes.shape({
    locationKey: PropTypes.string,
    activityTypeKey: PropTypes.string,
    minCatKey: PropTypes.string,
    maxCatKey: PropTypes.string,
  }).isRequired,
};
