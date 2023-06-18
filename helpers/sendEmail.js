const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SG_API_KEY } = process.env;

sgMail.setApiKey(SG_API_KEY);

// const email = {
//   to: "fijived657@bodeem.com",
//   from: "titovtelexfree@gmail.com",
//   subject: "Test email",
//   html: "<p><strong>Test email</strong> from Eugene Titov</p>",
// };

// sgMail
//   .send(email)
//   .then(() => console.log("Send email succes"))
//   .catch((error) => console.log(error.message));

const sendEmail = async (data) => {
  const email = { ...data, from: "titovtelexfree@gmail.com" };
  await sgMail.send(email);

  return true;
};

module.exports = sendEmail;
