import middleware from "./middleware";
import { createMiddleware } from "../../../utils/createMiddleware";
import { User } from "../../../entity/User";

export const resolvers = {
  Query: {
    me: createMiddleware(middleware, (_: any, __: any, { req }: any) =>
      User.findOne({ where: { id: req.session.userId } })
    )
  }
};
