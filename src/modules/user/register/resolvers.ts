import * as bcrypt from "bcryptjs";
import * as yup from "yup";
import { formatYupError } from "../../../utils/formatYupErrors";
import { User } from "../../../entity/User";
import { confirmEmailLink } from "../../../utils/createConfirmEmailLink";
import { sendEmail } from "../../../utils/sendEmail";

const schema = yup.object().shape({
  email: yup
    .string()
    .min(3)
    .max(255)
    .email(),
  password: yup
    .string()
    .min(3)
    .max(255)
});

export const resolvers = {
  Query: {
    bye: () => "Bye"
  },

  Mutation: {
    register: async (_: any, args: any, { redis, url }: any) => {
      const { email, password } = args;
      try {
        await schema.validate(args, { abortEarly: false });
      } catch (err) {
        return formatYupError(err);
      }

      const userAlreadyExists = await User.findOne({
        where: { email },
        select: ["id"]
      });
      if (userAlreadyExists) {
        return [{ path: "email", message: "already taken" }];
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = User.create({
        email,
        password: hashedPassword
      });
      await user.save();

      const link = await confirmEmailLink(url, user.id, redis);

      await sendEmail(email, link);

      return null;
    }
  }
};
