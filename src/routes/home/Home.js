import React, { useState, useEffect, useContext, useRef } from 'react';
import PropTypes from 'prop-types';

import ApplicationContext from '../../components/ApplicationContext';
import SegmentOptionsForm from './SegmentOptionsForm';
import SegmentOptions from './SegmentOptions';
import fetchSegments from './fetchSegments';
import SegmentTable from './SegmentTable';
import SegmentMessage from './SegmentMessage';

export default function Home({ initSegments }) {
  const { context } = useContext(ApplicationContext);
  // Segment data state
  const [segments, setSegments] = useState(initSegments);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  // Segment filter options
  const [formState, setFormState] = useState({
    locationKey: SegmentOptions.locationKeys[0],
    activityTypeKey: SegmentOptions.activityTypeKeys[0],
    minCatKey:
      SegmentOptions.climbingCategoryKeys[
        SegmentOptions.climbingCategoryKeys.length - 1
      ],
    maxCatKey: SegmentOptions.climbingCategoryKeys[0],
  });

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
  initSegments: PropTypes.arrayOf(
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
