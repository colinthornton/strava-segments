import React from 'react';

import Home from './Home';
import Layout from '../../components/Layout';
import { getOptions } from './segmentOptions';

const segmentsQuery = `query Segments($startLatlong: [Float]!, $endLatlong: [Float]!) {
  segments(startLatlong: $startLatlong, endLatlong: $endLatlong) {
    id
    name
    distance
    avgGrade
    elevDifference
    climbCategoryDesc
  }
}`;

const variables = { ...getOptions().location };

async function action({ fetch }) {
  const res = await fetch('/graphql', {
    body: JSON.stringify({
      query: segmentsQuery,
      variables,
    }),
  });
  const { data } = await res.json();
  if (!data || !data.segments) {
    throw new Error('Failed to load segments.');
  }
  return {
    chunks: ['home'],
    title: 'Strava Segments',
    component: (
      <Layout>
        <Home initSegments={data.segments} />
      </Layout>
    ),
  };
}

export default action;
