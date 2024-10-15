const nodemailer = require("nodemailer");

const backendURL = process.env.BACKEND_URL;
const frontendURL = process.env.FRONTEND_URL

exports.emailSend = async (userMail, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nuaim.emanager@gmail.com",
      pass: "jdhu ocil dkar agzg",
    },
  });

  const info = await transporter.sendMail({
    from: "Top Study Zone", // sender address
    to: userMail, // list of receivers
    subject: "Password Recover", // Subject line
    html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
    <h1 style="color: #333;">Reset Your Password</h1>
    <p style="color: #555; line-height: 1.5;">
      Thank you for being with us! To recover your password, please click the button below.
    </p>
    <p style="text-align: center;">
      <a href="${frontendURL}/forgotPassword/setNewPassword?token=${token}" style="display: inline-block; padding: 10px 20px; margin: 20px 0; font-size: 16px; color: #fff; background-color: #007BFF; border-radius: 5px; text-decoration: none;">
        Reset Password
      </a>
    </p>
    <p style="color: #555; line-height: 1.5;">
      If you did not requested for password reset, please ignore this email.
    </p>
    <p style="color: #555; line-height: 1.5;">
      Best regards,<br>
      Top Study Zone
    </p>
  </div>`, // html body
  });
};

exports.verifyEmailSend = async (userMail, token,userName) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nuaim.emanager@gmail.com",
      pass: "jdhu ocil dkar agzg",
    },
  });

  const info = await transporter.sendMail({
    from: "Top Study Zone", // sender address
    to: userMail, // list of receivers
    subject: "Verify Your Email", // Subject line
    html: `

    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
    <h1 style="color: #333;">Hello ${userName}</h1>
    <p style="color: #555; line-height: 1.5;">
      Thank you for signing up on Top Study Zone! To complete your registration and verify your email address, please click the button below.
    </p>
    <p style="text-align: center;">
      <a href="${backendURL}/api/user/verify/${token}" style="display: inline-block; padding: 10px 20px; margin: 20px 0; font-size: 16px; color: #fff; background-color: #007BFF; border-radius: 5px; text-decoration: none;">
        Verify Email
      </a>
    </p>
    <p style="color: #555; line-height: 1.5;">
      If you did not create an account, please ignore this email.
    </p>
    <p style="color: #555; line-height: 1.5;">
      Best regards,<br>
      Top Study Zone
    </p>
  </div>`,
  });
};
