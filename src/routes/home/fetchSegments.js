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

async function fetchSegments(fetch, variables) {
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

export default fetchSegments;
