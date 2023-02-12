import express, { Request } from 'express';
import { graphqlHTTP } from 'express-graphql';
import envs from '../envs';
import { schema } from './schema';
import cors from 'cors';
import routes from './routes';

const app = express();
app.use(
	envs.graphqlPath,
	graphqlHTTP({ graphiql: true, schema })
)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes);

export default app;