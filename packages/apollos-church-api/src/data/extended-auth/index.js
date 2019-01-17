import schema from './schema';
import resolver from './resolver';
import dataSource from './data-source';

export {
  contextMiddleware,
} from '@apollosproject/data-connector-rock/lib/auth';

export { schema, resolver, dataSource };
