import React from 'react';

import Layout from '../../components/Layout';
import fetchSegments from './fetchSegments';
import Home from './Home';
import SegmentOptions from './SegmentOptions';

const variables = {
  startLatlong: SegmentOptions.locations.honshu.value.startLatlong,
  endLatlong: SegmentOptions.locations.honshu.value.endLatlong,
  activityType: SegmentOptions.activityTypes.any.value,
  minCat: SegmentOptions.climbingCategories[0].value,
  maxCat: SegmentOptions.climbingCategories[5].value,
};

async function action({ fetch }) {
  const segments = await fetchSegments(fetch, variables);
  return {
    chunks: ['home'],
    title: 'Strava Segments',
    component: (
      <Layout>
        <Home initSegments={segments} />
      </Layout>
    ),
  };
}

export default action;
