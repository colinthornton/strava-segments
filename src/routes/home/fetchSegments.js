import getToken from '../../data/token';
import { appendParams, snakeToCamel } from '../../data/utils';

const segmentsQuery = `query Segments(
  $startLatlong: [Float]!,
  $endLatlong: [Float]!,
  $activityType: String,
  $minCat: Int,
  $maxCat: Int
) {
  segments(
    startLatlong: $startLatlong,
    endLatlong: $endLatlong,
    activityType: $activityType,
    minCat: $minCat,
    maxCat: $maxCat
  ) {
    id
    name
    distance
    avgGrade
    elevDifference
    climbCategoryDesc
  }
}`;

async function fetchSegments(fetch, variables, { withGraphQL = false } = {}) {
  if (withGraphQL) {
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
    return data.segments;
  }

  const { startLatlong, endLatlong, activityType, minCat, maxCat } = variables;
  const accessToken = await getToken();
  const params = {
    bounds: `${startLatlong[0]},${startLatlong[1]},${endLatlong[0]},${endLatlong[1]}`,
  };
  if (activityType != null) params.activity_type = activityType;
  if (minCat >= 0 && minCat <= 5) params.min_cat = minCat;
  if (maxCat >= 0 && maxCat <= 5) params.max_cat = maxCat;
  const parameterizedUrl = appendParams(
    `https://www.strava.com/api/v3/segments/explore`,
    params,
  );
  const res = await fetch(parameterizedUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!res.ok) {
    throw new Error(`${res.status}: ${res.statusText}`);
  }
  const data = await res.json();
  return data.segments.map(segment => snakeToCamel(segment));
}

export default fetchSegments;
