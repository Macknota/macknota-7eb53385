-- Create portfolio_data table to store all portfolio content as JSONB
CREATE TABLE public.portfolio_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.portfolio_data ENABLE ROW LEVEL SECURITY;

-- Anyone can read portfolio data (public portfolio)
CREATE POLICY "Portfolio data is publicly readable"
  ON public.portfolio_data FOR SELECT USING (true);

-- Only authenticated owner can update
CREATE POLICY "Owner can update portfolio data"
  ON public.portfolio_data FOR UPDATE USING (auth.uid() = user_id);

-- Only authenticated owner can insert
CREATE POLICY "Owner can insert portfolio data"
  ON public.portfolio_data FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_portfolio_data_updated_at
  BEFORE UPDATE ON public.portfolio_data
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for portfolio images
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio-images', 'portfolio-images', true);

-- Storage policies
CREATE POLICY "Portfolio images are publicly accessible"
  ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-images');

CREATE POLICY "Authenticated users can upload portfolio images"
  ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolio-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update portfolio images"
  ON storage.objects FOR UPDATE USING (bucket_id = 'portfolio-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete portfolio images"
  ON storage.objects FOR DELETE USING (bucket_id = 'portfolio-images' AND auth.role() = 'authenticated');