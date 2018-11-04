import * as bcrypt from "bcryptjs";
import * as yup from "yup";
import { User } from "../../../entity/User";

export const resolvers = {
  Query: {
    bye2: () => "Bye"
  },

  Mutation: {
    login: async (_: any, args: any, { req }: any) => {
      const { email, password } = args;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return [
          {
            path: "email",
            message: "invalid login"
          }
        ];
      }
      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return [
          {
            path: "email",
            message: "invalid login"
          }
        ];
      }

      if (!user.confirmed) {
        return [
          {
            path: "email",
            message: "please confirm email"
          }
        ];
      }

      // Set User Id in session after successfull login
      req.session.userId = user.id;

      return null;
    }
  }
};
