import * as bcrypt from "bcryptjs";
import * as yup from "yup";

export const resolvers = {
  Query: {
    dummy3: () => "dummy"
  },

  Mutation: {
    sendForgotPasswordEmail: (_: any, args: any, { req }: any) => {}
  }
};
