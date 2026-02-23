import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { 
  PortfolioData, 
  defaultPortfolioData 
} from "@/lib/portfolioData";
import { uploadImage, isBase64Image } from "@/lib/imageUpload";

// Process images in portfolio data - upload base64 to storage
const processImages = async (data: PortfolioData): Promise<PortfolioData> => {
  const processed = { ...data };

  // Upload profile image if base64
  if (isBase64Image(processed.hero.profileImage)) {
    try {
      processed.hero = {
        ...processed.hero,
        profileImage: await uploadImage(processed.hero.profileImage, "profile"),
      };
    } catch (e) {
      console.error("Failed to upload profile image:", e);
    }
  }

  // Upload project images if base64
  if (processed.projects) {
    processed.projects = await Promise.all(
      processed.projects.map(async (project) => {
        if (project.images?.length) {
          const uploadedImages = await Promise.all(
            project.images.map(async (img) => {
              if (isBase64Image(img)) {
                try {
                  return await uploadImage(img, "projects");
                } catch {
                  return img;
                }
              }
              return img;
            })
          );
          return { ...project, images: uploadedImages };
        }
        return project;
      })
    );
  }

  return processed;
};

export const usePortfolio = () => {
  const [data, setData] = useState<PortfolioData>(defaultPortfolioData);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch data from database
  useEffect(() => {
    const fetchData = async () => {
      const { data: rows, error } = await supabase
        .from("portfolio_data")
        .select("*")
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Error fetching portfolio data:", error);
        setIsLoaded(true);
        return;
      }

      if (rows?.data) {
        // Merge with defaults to ensure all fields exist
        const merged = { ...defaultPortfolioData, ...(rows.data as unknown as PortfolioData) };
        setData(merged);
      }
      setIsLoaded(true);
    };

    fetchData();
  }, []);

  const updateData = useCallback(async (newData: PortfolioData) => {
    setData(newData);
    setIsSaving(true);

    try {
      // Process images (upload base64 to storage)
      const processed = await processImages(newData);
      
      // If processed data differs (images were uploaded), update local state
      if (processed !== newData) {
        setData(processed);
      }

      // Get current user
      const { data: session } = await supabase.auth.getSession();
      const userId = session?.session?.user?.id;

      if (!userId) {
        console.error("No authenticated user");
        setIsSaving(false);
        return;
      }

      // Check if row exists
      const { data: existing } = await supabase
        .from("portfolio_data")
        .select("id")
        .eq("user_id", userId)
        .maybeSingle();

      if (existing) {
        await supabase
          .from("portfolio_data")
          .update({ data: JSON.parse(JSON.stringify(processed)) })
          .eq("user_id", userId);
      } else {
        await supabase
          .from("portfolio_data")
          .insert([{ user_id: userId, data: JSON.parse(JSON.stringify(processed)) }]);
      }
    } catch (error) {
      console.error("Error saving portfolio data:", error);
    }

    setIsSaving(false);
  }, []);

  const updateField = <K extends keyof PortfolioData>(
    section: K,
    value: PortfolioData[K]
  ) => {
    const newData = { ...data, [section]: value };
    updateData(newData);
  };

  const resetData = async () => {
    setData(defaultPortfolioData);
    
    const { data: session } = await supabase.auth.getSession();
    const userId = session?.session?.user?.id;
    if (userId) {
      await supabase
        .from("portfolio_data")
        .update({ data: JSON.parse(JSON.stringify(defaultPortfolioData)) })
        .eq("user_id", userId);
    }
  };

  return { data, updateData, updateField, resetData, isLoaded, isSaving };
};
