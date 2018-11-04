export default async (
  resolver: any,
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  // middleware
  console.log("args", context.req.session);
  if (!context.req.session || !context.req.session.userId) {
    return null;
  }
  const result = await resolver(parent, args, context, info);
  // afterware
  console.log("result", result);

  return result;
};
