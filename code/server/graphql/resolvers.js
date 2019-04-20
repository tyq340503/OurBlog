const resolvers = {
  Query: {
    info: () => `Testing GraphQL Server`,
    feed: (root, args, context, info) => {
      return context.prisma.links();
    }
  },
  Mutation: {
    post: (root, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description
      });
    }
  }
}

module.exports = resolvers;

/**
 * parent --> parent is the result of the previous resolver execution level
 * Resolver for Type itself like Link is not needed
 * 
 * context --> is a plain JS object that every resolver in the resolver chain can read from and write to
 * It thus basically is a means for resolvers to communicate
 */