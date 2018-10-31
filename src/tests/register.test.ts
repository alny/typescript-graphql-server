import { request } from "graphql-request";
import { host } from "./constants";
import { User } from "../entity/User";
import { createTypeormConn } from "../utils/createTypeormConn";

beforeAll(async () => {
  await createTypeormConn();
});

const email = "jest1@test.com";
const password = "hansen123";

const mutation = `
  mutation {
    register(email: "${email}", password: "${password}")
  }
`;

test("Regsiter User", async () => {
  const response = await request(host, mutation);
  expect(response).toEqual({ register: true });
  const users: any = await User.find({ where: { email } });
  expect(users).toHaveLength(1);
  const user = users[0];
  expect(user.email).toEqual(email);
});
