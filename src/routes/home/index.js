import React from 'react';

import Layout from '../../components/Layout';
import SegmentOptions from '../../data/services/SegmentOptions';
import fetchSegments from './fetchSegments';
import Home from './Home';

const initialOptions = {
  locationKey: 'kanto',
  activityTypeKey: 'any',
  minCatKey: 'cat0',
  maxCatKey: 'cat5',
};

const variables = {
  startLatlong:
    SegmentOptions.locations[initialOptions.locationKey].value.startLatlong,
  endLatlong:
    SegmentOptions.locations[initialOptions.locationKey].value.endLatlong,
  activityType:
    SegmentOptions.activityTypes[initialOptions.activityTypeKey].value,
  minCat: SegmentOptions.climbingCategories[initialOptions.minCatKey].value,
  maxCat: SegmentOptions.climbingCategories[initialOptions.maxCatKey].value,
};

async function action({ fetch }) {
  const segments = await fetchSegments(fetch, variables);
  return {
    chunks: ['home'],
    title: 'Strava Segments',
    component: (
      <Layout>
        <Home initialSegments={segments} initialOptions={initialOptions} />
      </Layout>
    ),
  };
}

export default action;
