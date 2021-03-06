import { v4 } from "uuid";
import { Redis } from "ioredis";

export const confirmEmailLink = async (
  url: string,
  userId: any,
  redis: Redis
) => {
  const id = v4();

  await redis.set(id, userId, "ex", 60 * 60 * 24);
  return `${url}/confirm/${id}`;
};
