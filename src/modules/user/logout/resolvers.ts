export const resolvers = {
  Query: {
    dummy: () => "dummy"
  },

  Mutation: {
    logout: (_: any, args: any, { req }: any) => {
      new Promise(resolve =>
        req.session.destroy((err: any) => {
          if (err) {
            console.log(err);
          }
          resolve(true);
        })
      );
    }
  }
};
