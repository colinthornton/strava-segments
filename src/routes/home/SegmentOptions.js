const locations = {
  honshu: {
    text: 'Honshu',
    value: {
      startLatlong: [33.4, 130.85],
      endLatlong: [41.55, 142.08],
    },
  },
  kanto: {
    text: 'Kanto',
    value: {
      startLatlong: [34.8968, 138.3825],
      endLatlong: [37.1622, 140.9011],
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
  0: {
    text: 'NC',
    value: 0,
  },
  1: {
    text: '4',
    value: 1,
  },
  2: {
    text: '3',
    value: 2,
  },
  3: {
    text: '2',
    value: 3,
  },
  4: {
    text: '1',
    value: 4,
  },
  5: {
    text: 'HC',
    value: 5,
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
}