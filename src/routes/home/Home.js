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
  const [formLocationKey, setFormLocationKey] = useState(
    SegmentOptions.locationKeys[0],
  );
  const [formActivityTypeKey, setFormActivityTypeKey] = useState(
    SegmentOptions.activityTypeKeys[0],
  );
  const [formMinCatKey, setFormMinCatKey] = useState(
    SegmentOptions.climbingCategoryKeys[
      SegmentOptions.climbingCategoryKeys.length - 1
    ],
  );
  const [formMaxCatKey, setFormMaxCatKey] = useState(
    SegmentOptions.climbingCategoryKeys[0],
  );
  const setFormState = ({
    locationKey,
    activityTypeKey,
    minCatKey,
    maxCatKey,
  }) => {
    if (locationKey !== undefined) setFormLocationKey(locationKey);
    if (activityTypeKey !== undefined) setFormActivityTypeKey(activityTypeKey);
    if (minCatKey !== undefined) setFormMinCatKey(minCatKey);
    if (maxCatKey !== undefined) setFormMaxCatKey(maxCatKey);
  };

  const initialRender = useRef(true);
  useEffect(() => {
    // Skips fetching on initial render
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    fetchSegments(context.fetch, {
      startLatlong:
        SegmentOptions.locations[formLocationKey].value.startLatlong,
      endLatlong: SegmentOptions.locations[formLocationKey].value.endLatlong,
      activityType: SegmentOptions.activityTypes[formActivityTypeKey].value,
      minCat: SegmentOptions.climbingCategories[formMinCatKey].value,
      maxCat: SegmentOptions.climbingCategories[formMaxCatKey].value,
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
  }, [formLocationKey, formActivityTypeKey, formMinCatKey, formMaxCatKey]);

  return (
    <div>
      <h1>Strava Segments</h1>
      <div className="row">
        <SegmentOptionsForm
          locationKey={formLocationKey}
          activityTypeKey={formActivityTypeKey}
          minCatKey={formMinCatKey}
          maxCatKey={formMaxCatKey}
          setState={setFormState}
          loading={loading}
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
