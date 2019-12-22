const locations = {
  honshu: {
    startLatlong: [33.4, 130.85],
    endLatlong: [41.55, 142.08],
  },
  kanto: {
    startLatlong: [34.8968, 138.3825],
    endLatlong: [37.1622, 140.9011],
  },
};

const options = {
  location: locations.kanto,
};

export function getLocations() {
  return { ...locations };
}

export function getOptions() {
  return { ...options };
}

export function updateOptions(patch) {
  if (patch.location && patch.location in locations) {
    options.location = patch.location;
  }
  return { ...options };
}
