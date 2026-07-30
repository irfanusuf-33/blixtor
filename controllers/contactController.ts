import {
  ContactFormData,
  ContactApiResponse,
} from "@/types/contact";

import {
  sendContactEmail,
} from "@/services/emailService";

export async function handleContactForm(
  data: ContactFormData
): Promise<ContactApiResponse> {
  const {
    firstName,
    email,
    phone,
    message,
    termsAccepted,
  } = data;

  if (
    typeof firstName !== "string" ||
    firstName.trim() === "" ||
    typeof email !== "string" ||
    email.trim() === "" ||
    typeof phone !== "string" ||
    phone.trim() === "" ||
    typeof message !== "string" ||
    message.trim() === ""
  ) {
    return {
      success: false,
      message: "Please fill in all required fields.",
    };
  }

  const trimmedFirstName = firstName.trim();
  const trimmedEmail = email.trim();
  const trimmedPhone = phone.trim();
  const trimmedMessage = message.trim();

  if (!termsAccepted) {
    return {
      success: false,
      message:
        "You must accept the Terms & Conditions.",
    };
  }

  try {
    await sendContactEmail({
      firstName: trimmedFirstName,
      email: trimmedEmail,
      phone: trimmedPhone,
      message: trimmedMessage,
    });

    return {
      success: true,
      message:
        "Your message has been sent successfully.",
    };
  } catch (error) {
    console.error(
      "Error sending contact form:",
      error
    );

    return {
      success: false,
      message:
        "Something went wrong. Please try again later.",
    };
  }
}
