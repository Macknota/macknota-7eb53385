import { useState, useEffect } from "react";
import { 
  PortfolioData, 
  getPortfolioData, 
  savePortfolioData, 
  defaultPortfolioData 
} from "@/lib/portfolioData";

export const usePortfolio = () => {
  const [data, setData] = useState<PortfolioData>(defaultPortfolioData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setData(getPortfolioData());
    setIsLoaded(true);
  }, []);

  const updateData = (newData: PortfolioData) => {
    setData(newData);
    savePortfolioData(newData);
  };

  const updateField = <K extends keyof PortfolioData>(
    section: K,
    value: PortfolioData[K]
  ) => {
    const newData = { ...data, [section]: value };
    updateData(newData);
  };

  const resetData = () => {
    setData(defaultPortfolioData);
    savePortfolioData(defaultPortfolioData);
  };

  return { data, updateData, updateField, resetData, isLoaded };
};
