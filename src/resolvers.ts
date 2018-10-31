import * as bcrypt from "bcryptjs";
import { User } from "./entity/User";

export const resolvers = {
  Query: {
    hello: (_: any, { name }: any) => `Hello ${name || "World"}`
  },

  Mutation: {
    register: async (_: any, { email, password }: any) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = User.create({
        email,
        password: hashedPassword
      });
      await user.save();
      return true;
    }
  }
};
