import { Auth } from '@apollosproject/data-connector-rock';

const authResolver = Auth.resolver;

authResolver.Mutation.registerPersonWithFullName = (
  root,
  args,
  { dataSources }
) => dataSources.Auth.registerPersonWithFullName(args);

export default authResolver;
