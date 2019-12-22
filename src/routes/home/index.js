import React from 'react';

import Home from './Home';
import Layout from '../../components/Layout';

// const honshu = {
//   startLatlong: [33.4, 130.85],
//   endLatlong: [41.55, 142.08],
// };
const kanto = {
  startLatlong: [34.8968, 138.3825],
  endLatlong: [37.1622, 140.9011],
};

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

async function action({ fetch }) {
  const res = await fetch('/graphql', {
    body: JSON.stringify({
      query: segmentsQuery,
      variables: { ...kanto },
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
        <Home segments={data.segments} />
      </Layout>
    ),
  };
}

export default action;
