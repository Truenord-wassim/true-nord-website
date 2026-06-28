// File-level "use server" lets SellInGccForm.tsx (a Client Component) call
// submitSupplierRequest. That directive restricts this file to async-function
// exports only, so shared types live in ./types instead.
"use server";

import { Resend } from "resend";
import { z } from "zod";
import { type FormState } from "./types";

const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
const INTERNAL_RECIPIENTS = ["fouad@true-nord.ca", "mireille@true-nord.ca"];
const GENERAL_ERROR_MESSAGE =
  "Something went wrong sending your request. Please try again or email us directly at fouad@true-nord.ca.";

const supplierRequestSchema = z.object({
  fullName: z.string().min(1, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  companyName: z.string().min(1, "Please enter your brand or company name."),
  website: z.string().refine(
    (val) => val === "" || z.string().url().safeParse(val).success,
    { message: "Please enter a valid URL (e.g. https://yourbrand.com)." }
  ),
  phone: z.string().optional(),
  productDetails: z
    .string()
    .min(
      10,
      "Please tell us a bit more about your products (at least 10 characters)."
    ),
  productMaterials: z
    .instanceof(File)
    .refine(
      (file) => file.size === 0 || ALLOWED_FILE_TYPES.includes(file.type),
      { message: "Please upload a JPG, PNG, WEBP, or PDF file." }
    )
    .refine((file) => file.size <= MAX_FILE_SIZE_BYTES, {
      message: "File must be smaller than 5 MB.",
    }),
  consent: z.string().refine((value) => value === "on", {
    message: "Please agree to the Privacy Policy to submit this form.",
  }),
});

export async function submitSupplierRequest(
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

  const result = supplierRequestSchema.safeParse({
    fullName: formData.get("fullName") ?? "",
    email: formData.get("email") ?? "",
    companyName: formData.get("companyName") ?? "",
    website: formData.get("website") ?? "",
    phone: formData.get("phone") ?? "",
    productDetails: formData.get("productDetails") ?? "",
    productMaterials: formData.get("productMaterials") ?? new File([], ""),
    consent: formData.get("consent") ?? "",
  });

  if (!result.success) {
    return {
      status: "error",
      errors: result.error.flatten().fieldErrors,
    };
  }

  const {
    fullName,
    email,
    companyName,
    website,
    phone,
    productDetails,
    productMaterials,
  } = result.data;

  const fromAddress = `True Nord <${process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev"}>`;

  try {
    const attachments =
      productMaterials.size > 0
        ? [
            {
              filename: productMaterials.name,
              content: Buffer.from(await productMaterials.arrayBuffer()),
            },
          ]
        : undefined;

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Notify our team first — this is the critical email. If it fails, we
    // return an error so the visitor can retry and no lead is lost.
    const notify = await resend.emails.send({
      from: fromAddress,
      to: INTERNAL_RECIPIENTS,
      replyTo: email,
      subject: `New supplier inquiry — ${companyName}`,
      text: `New supplier inquiry via the website:\n\n- Name: ${fullName}\n- Email: ${email}\n- Brand / Company: ${companyName}\n- Website: ${website || "Not provided"}\n- Phone: ${phone || "Not provided"}\n- Products: ${productDetails}\n- Materials: ${attachments ? "Attached below" : "None provided"}`,
      attachments,
    });

    if (notify.error) {
      return { status: "error", message: GENERAL_ERROR_MESSAGE };
    }

    // Then send the visitor their confirmation. Our team already has the lead,
    // so if this courtesy email fails we still report success — we don't want
    // the visitor resubmitting and creating a duplicate.
    await resend.emails.send({
      from: fromAddress,
      to: email,
      replyTo: "fouad@true-nord.ca",
      subject: "We've received your inquiry — True Nord",
      text: `Hi ${fullName},\n\nThanks for reaching out to True Nord. We've received your inquiry about selling in the GCC and a member of our team will be in touch within 1–2 business days.\n\nHere's a summary of what you submitted:\n\n- Brand / Company: ${companyName}\n- Website: ${website || "Not provided"}\n- Products: ${productDetails}\n\nIf you have any questions in the meantime, just reply to this email.\n\nThe True Nord Team`,
    });

    return { status: "success" };
  } catch {
    return { status: "error", message: GENERAL_ERROR_MESSAGE };
  }
}
