export const whatsappLink = (number: string) => `https://wa.me/${(number || "").replace(/[^0-9]/g, "")}`;

export const toSlug = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
