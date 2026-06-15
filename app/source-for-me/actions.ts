// File-level "use server" lets SourceForMeForm.tsx (a Client Component) call
// submitSourcingRequest. That directive restricts this file to async-function
// exports only, so shared constants/types live in ./types instead.
"use server";

import { Resend } from "resend";
import { z } from "zod";
import { COUNTRY_OPTIONS, type FormState } from "./types";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const INTERNAL_RECIPIENTS = ["fouad@true-nord.ca", "mireille@true-nord.ca"];
const GENERAL_ERROR_MESSAGE =
  "Something went wrong sending your request. Please try again or email us directly at fouad@true-nord.ca.";

const sourcingRequestSchema = z.object({
  fullName: z.string().min(1, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  companyName: z.string().min(1, "Please enter your company name."),
  country: z.string().refine(
    (value): value is (typeof COUNTRY_OPTIONS)[number] =>
      (COUNTRY_OPTIONS as readonly string[]).includes(value),
    { message: "Please select a country." }
  ),
  phone: z.string().optional(),
  sourcingDetails: z
    .string()
    .min(
      10,
      "Please tell us a bit more about what you're looking for (at least 10 characters)."
    ),
  productPhoto: z
    .instanceof(File)
    .refine(
      (file) => file.size === 0 || ALLOWED_IMAGE_TYPES.includes(file.type),
      { message: "Please upload a JPG, PNG, or WEBP image." }
    )
    .refine((file) => file.size <= MAX_IMAGE_SIZE_BYTES, {
      message: "Image must be smaller than 5MB.",
    }),
  consent: z.string().refine((value) => value === "on", {
    message: "Please agree to the Privacy Policy to submit this form.",
  }),
});

export async function submitSourcingRequest(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const result = sourcingRequestSchema.safeParse({
    fullName: formData.get("fullName") ?? "",
    email: formData.get("email") ?? "",
    companyName: formData.get("companyName") ?? "",
    country: formData.get("country") ?? "",
    phone: formData.get("phone") ?? "",
    sourcingDetails: formData.get("sourcingDetails") ?? "",
    productPhoto: formData.get("productPhoto") ?? new File([], ""),
    consent: formData.get("consent") ?? "",
  });

  if (!result.success) {
    return {
      status: "idle",
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { fullName, email, companyName, country, phone, sourcingDetails, productPhoto } =
    result.data;

  const fromAddress = `True Nord <${process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev"}>`;

  const attachments =
    productPhoto.size > 0
      ? [
          {
            filename: productPhoto.name,
            content: Buffer.from(await productPhoto.arrayBuffer()),
          },
        ]
      : undefined;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const ack = await resend.emails.send({
      from: fromAddress,
      to: email,
      replyTo: "fouad@true-nord.ca",
      subject: "We've received your sourcing request — True Nord",
      text: `Hi ${fullName},\n\nThanks for reaching out to True Nord. We've received your sourcing request and a member of our team will review it and get back to you within 1–2 business days.\n\nHere's a summary of what you submitted:\n\n- Company: ${companyName}\n- Country: ${country}\n- Looking for: ${sourcingDetails}\n\nIf you have any questions in the meantime, just reply to this email.\n\nThe True Nord Team`,
    });

    if (ack.error) {
      return { status: "error", message: GENERAL_ERROR_MESSAGE };
    }

    const notify = await resend.emails.send({
      from: fromAddress,
      to: INTERNAL_RECIPIENTS,
      replyTo: email,
      subject: `New sourcing request — ${companyName} (${country})`,
      text: `New sourcing request via the website:\n\n- Name: ${fullName}\n- Email: ${email}\n- Company: ${companyName}\n- Country: ${country}\n- Phone: ${phone || "Not provided"}\n- Looking for: ${sourcingDetails}\n- Product photo: ${attachments ? "Attached below" : "None provided"}`,
      attachments,
    });

    if (notify.error) {
      return { status: "error", message: GENERAL_ERROR_MESSAGE };
    }

    return { status: "success" };
  } catch {
    return { status: "error", message: GENERAL_ERROR_MESSAGE };
  }
}
