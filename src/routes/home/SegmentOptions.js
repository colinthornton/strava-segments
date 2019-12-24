const locations = {
  kanto: {
    text: 'Kanto',
    value: {
      startLatlong: [34.8968, 138.3825],
      endLatlong: [37.1622, 140.9011],
    },
  },
  honshu: {
    text: 'Honshu',
    value: {
      startLatlong: [33.4, 130.85],
      endLatlong: [41.55, 142.08],
    },
  },
  kyushu: {
    text: 'Kyushu',
    value: {
      startLatlong: [30.9843, 128.5272],
      endLatlong: [33.9635, 132.0867],
    },
  },
  shikoku: {
    text: 'Shikoku',
    value: {
      startLatlong: [32.5373, 131.7891],
      endLatlong: [34.6282, 135.4551],
    },
  },
  hokkaido: {
    text: 'Hokkaido',
    value: {
      startLatlong: [41.37, 139.32],
      endLatlong: [45.58, 145.54],
    },
  },
  colorado: {
    text: 'Colorado',
    value: {
      startLatlong: [36.99, -109.04],
      endLatlong: [41.0, -102.04],
    },
  },
};

const activityTypes = {
  any: {
    text: 'Any',
    value: null,
  },
  riding: {
    text: 'Riding',
    value: 'riding',
  },
  running: {
    text: 'Running',
    value: 'running',
  },
};

const climbingCategories = {
  cat5: {
    text: 'HC',
    value: 5,
  },
  cat4: {
    text: '1',
    value: 4,
  },
  cat3: {
    text: '2',
    value: 3,
  },
  cat2: {
    text: '3',
    value: 2,
  },
  cat1: {
    text: '4',
    value: 1,
  },
  cat0: {
    text: 'NC',
    value: 0,
  },
};

export default class SegmentOptions {
  static get locationKeys() {
    return Object.keys(locations);
  }

  static get locations() {
    return { ...locations };
  }

  static get activityTypeKeys() {
    return Object.keys(activityTypes);
  }

  static get activityTypes() {
    return { ...activityTypes };
  }

  static get climbingCategoryKeys() {
    return Object.keys(climbingCategories);
  }

  static get climbingCategories() {
    return { ...climbingCategories };
  }

  static toQueryVariables({
    locationKey,
    activityTypeKey,
    minCatKey,
    maxCatKey,
  }) {
    return {
      startLatlong: SegmentOptions.locations[locationKey].value.startLatlong,
      endLatlong: SegmentOptions.locations[locationKey].value.endLatlong,
      activityType: SegmentOptions.activityTypes[activityTypeKey].value,
      minCat: SegmentOptions.climbingCategories[minCatKey].value,
      maxCat: SegmentOptions.climbingCategories[maxCatKey].value,
    };
  }
}
