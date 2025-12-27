import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_6bswnv8";
// const TEMPLATE_ID = "template_xdahdd8";
const PUBLIC_KEY = "9tsvXvMFPmJw8Mkks";

// Sign In : template_gf3glrq
// Sign Out : template_6ku5nrk
// Divice Collected : template_i9xd3ef
// Divice Retrned : template_c2gxyik

export function sendPaymentEmail(
  name: string,
  to_email: string,
  tempId: string
) {
  emailjs.init(PUBLIC_KEY);
  try {
    return emailjs.send(
      SERVICE_ID,
      tempId,
      { to_email, name, time: new Date().toString() },
      PUBLIC_KEY
    );
  } catch (error) {}
}
