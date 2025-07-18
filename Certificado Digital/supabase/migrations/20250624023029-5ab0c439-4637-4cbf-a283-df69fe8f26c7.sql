
-- Enable RLS on certificado_digital table
ALTER TABLE public.certificado_digital ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to certificates
CREATE POLICY "Allow public read access to certificates" 
  ON public.certificado_digital 
  FOR SELECT 
  TO public 
  USING (true);
