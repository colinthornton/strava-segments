import {
  GraphQLObjectType as ObjectType,
  GraphQLNonNull as NonNull,
  GraphQLInt as IntType,
  GraphQLString as StringType,
  GraphQLFloat as FloatType,
  GraphQLList as ListType,
  GraphQLBoolean as BoolType,
} from 'graphql';

const SegmentType = new ObjectType({
  name: 'Segment',
  fields: {
    id: { type: new NonNull(IntType) },
    name: { type: new NonNull(StringType) },
    climbCategory: { type: new NonNull(IntType) },
    climbCategoryDesc: { type: new NonNull(StringType) },
    avgGrade: { type: new NonNull(FloatType) },
    startLatlng: { type: new NonNull(new ListType(FloatType)) },
    endLatlng: { type: new NonNull(new ListType(FloatType)) },
    elevDifference: { type: new NonNull(FloatType) },
    distance: { type: new NonNull(FloatType) },
    points: { type: new NonNull(StringType) },
    starred: { type: new NonNull(BoolType) },
  },
});

export default SegmentType;
