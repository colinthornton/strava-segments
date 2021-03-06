import {
  GraphQLNonNull as NonNull,
  GraphQLList as ListType,
  GraphQLFloat as FloatType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
} from 'graphql';
import fetch from 'node-fetch';

import getStravaToken from '../services/stravaToken';
import SegmentType from '../types/SegmentType';
import { toParamString, snakeToCamel } from '../utils';

const url = `https://www.strava.com/api/v3/segments/explore`;

const segments = {
  args: {
    startLatlong: {
      type: new NonNull(new ListType(FloatType)),
    },
    endLatlong: {
      type: new NonNull(new ListType(FloatType)),
    },
    activityType: { type: StringType },
    minCat: { type: IntType },
    maxCat: { type: IntType },
  },
  type: new ListType(SegmentType),
  async resolve(_, { startLatlong, endLatlong, activityType, minCat, maxCat }) {
    const accessToken = await getStravaToken();

    const params = {
      bounds: `${startLatlong[0]},${startLatlong[1]},${endLatlong[0]},${endLatlong[1]}`,
    };
    if (activityType === 'riding' || activityType === 'running')
      params.activity_type = activityType;
    if (minCat >= 0 && minCat <= 5) params.min_cat = minCat;
    if (maxCat >= 0 && maxCat <= 5) params.max_cat = maxCat;
    const paramString = toParamString(params);

    const urlWithParams = `${url}?${paramString}`;
    return fetch(urlWithParams, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        return data.segments.map(segment => snakeToCamel(segment));
      });
  },
};

export default segments;
