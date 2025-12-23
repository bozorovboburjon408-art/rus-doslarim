-- Create notes table for storing lesson content
CREATE TABLE public.notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  lexical_topic TEXT NOT NULL,
  grammar_topic TEXT NOT NULL,
  vocabulary JSONB NOT NULL DEFAULT '[]'::jsonb,
  grammar_rules JSONB NOT NULL DEFAULT '[]'::jsonb,
  exercises JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view published notes"
ON public.notes
FOR SELECT
USING (is_published = true);

CREATE POLICY "Admins can view all notes"
ON public.notes
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can create notes"
ON public.notes
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update notes"
ON public.notes
FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete notes"
ON public.notes
FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_notes_updated_at
BEFORE UPDATE ON public.notes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();