import React from 'react';

import Layout from '../../components/Layout';
import fetchSegments from './fetchSegments';
import Home from './Home';
import { getOptions } from './segmentOptions';

const variables = { ...getOptions().location };

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
