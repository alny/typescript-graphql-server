import * as sendGrid from "@sendgrid/mail";

export const sendEmail = async (recipient: string, url: string) => {
  sendGrid.setApiKey(process.env.SENDGRID_API_KEY as string);
  const msg = {
    to: recipient,
    from: "test@example.com",
    subject: "Confirm Email",
    text: "Hello Sir",
    html: `<body><a href="${url}">Click here to confirm email</a></body>`
  };
  await sendGrid.send(msg);
};
