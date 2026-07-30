import nodemailer from "nodemailer";

interface ContactEmailData {
  firstName: string;
  email: string;
  phone: string;
  message: string;
}

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendContactEmail(data: ContactEmailData) {
  const {
    firstName,
    email,
    phone,
    message,
  } = data;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.CONTACT_EMAIL,
    // replyTo: email,
    subject: `New Contact Form Message from ${firstName}`,

    html: `
      <h2>New Contact Form Submission</h2>

      <p>
        <strong>First Name:</strong> ${firstName}
      </p>

      <p>
        <strong>Email:</strong> ${email}
      </p>

      <p>
        <strong>Phone Number:</strong> ${phone}
      </p>

      <p>
        <strong>Message:</strong>
      </p>

      <p>${message}</p>
    `,
  });
}