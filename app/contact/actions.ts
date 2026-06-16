// File-level "use server" lets ContactForm.tsx (a Client Component) call
// submitContactMessage. That directive restricts this file to async-function
// exports only, so shared types live in ./types instead.
"use server";

import { Resend } from "resend";
import { z } from "zod";
import { type FormState } from "./types";

const INTERNAL_RECIPIENTS = ["fouad@true-nord.ca", "mireille@true-nord.ca"];
const GENERAL_ERROR_MESSAGE =
  "Something went wrong. Please try again or email us directly at info@true-nord.ca.";

const contactSchema = z.object({
  fullName: z.string().min(1, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  message: z
    .string()
    .min(10, "Please tell us a bit more (at least 10 characters)."),
  consent: z.string().refine((value) => value === "on", {
    message: "Please agree to the Privacy Policy to submit.",
  }),
});

export async function submitContactMessage(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // Honeypot: real visitors never see or fill the hidden "fax" field. If it
  // has a value, the submission is from a spam bot — return success so the bot
  // learns nothing, but send no email.
  const honeypot = formData.get("fax");
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return { status: "success" };
  }

  const result = contactSchema.safeParse({
    fullName: formData.get("fullName") ?? "",
    email: formData.get("email") ?? "",
    message: formData.get("message") ?? "",
    consent: formData.get("consent") ?? "",
  });

  if (!result.success) {
    return {
      status: "error",
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { fullName, email, message } = result.data;

  const fromAddress = `True Nord <${process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev"}>`;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const ack = await resend.emails.send({
      from: fromAddress,
      to: email,
      replyTo: "fouad@true-nord.ca",
      subject: "Thanks for reaching out — True Nord",
      text: `Hi ${fullName},\n\nThanks for reaching out to True Nord. We've received your message and a member of our team will be in touch within 1–2 business days.\n\nIf you have any questions in the meantime, feel free to reply to this email.\n\nThe True Nord Team`,
    });

    if (ack.error) {
      return { status: "error", message: GENERAL_ERROR_MESSAGE };
    }

    const notify = await resend.emails.send({
      from: fromAddress,
      to: INTERNAL_RECIPIENTS,
      replyTo: email,
      subject: `New contact message — ${fullName}`,
      text: `New contact message via the website:\n\n- Name: ${fullName}\n- Email: ${email}\n\nMessage:\n${message}`,
    });

    if (notify.error) {
      return { status: "error", message: GENERAL_ERROR_MESSAGE };
    }

    return { status: "success" };
  } catch {
    return { status: "error", message: GENERAL_ERROR_MESSAGE };
  }
}
