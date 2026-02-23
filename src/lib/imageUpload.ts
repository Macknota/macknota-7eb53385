import { supabase } from "@/integrations/supabase/client";

export const uploadImage = async (
  base64Data: string,
  folder: string = "profile"
): Promise<string> => {
  // Convert base64 to blob
  const base64Response = await fetch(base64Data);
  const blob = await base64Response.blob();

  const fileExt = blob.type.split("/")[1] || "png";
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

  const { error } = await supabase.storage
    .from("portfolio-images")
    .upload(fileName, blob, {
      contentType: blob.type,
      upsert: true,
    });

  if (error) {
    console.error("Upload error:", error);
    throw error;
  }

  const { data: urlData } = supabase.storage
    .from("portfolio-images")
    .getPublicUrl(fileName);

  return urlData.publicUrl;
};

export const isBase64Image = (str: string): boolean => {
  return str?.startsWith("data:image/") || false;
};
