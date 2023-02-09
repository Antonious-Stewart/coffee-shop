import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';

export const schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'Index',
		fields: () => ({
			message: { type: new GraphQLNonNull(GraphQLString) }
		})
	})
})