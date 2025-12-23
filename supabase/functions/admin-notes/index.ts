import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface VocabularyItem {
  russian: string;
  uzbek: string;
}

interface GrammarRule {
  rule: string;
  example: string;
}

interface NoteData {
  lesson_number: number;
  title: string;
  lexical_topic: string;
  grammar_topic: string;
  vocabulary: VocabularyItem[];
  grammar_rules: GrammarRule[];
  exercises: string[];
  is_published: boolean;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const adminPassword = Deno.env.get('ADMIN_PASSWORD');

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { password, action, noteData, noteId } = await req.json();

    console.log(`Admin notes action: ${action}`);

    // Verify admin password
    if (password !== adminPassword) {
      console.log('Invalid admin password attempt');
      return new Response(
        JSON.stringify({ success: false, error: 'Unauthorized' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      );
    }

    switch (action) {
      case 'list': {
        console.log('Fetching all notes');
        const { data, error } = await supabase
          .from('notes')
          .select('*')
          .order('lesson_number', { ascending: true });

        if (error) {
          console.error('Error fetching notes:', error);
          return new Response(
            JSON.stringify({ success: false, error: error.message }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
          );
        }

        console.log(`Found ${data?.length || 0} notes`);
        return new Response(
          JSON.stringify({ success: true, data }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'create': {
        console.log('Creating new note:', noteData?.title);
        const { data, error } = await supabase
          .from('notes')
          .insert([noteData as NoteData])
          .select()
          .single();

        if (error) {
          console.error('Error creating note:', error);
          return new Response(
            JSON.stringify({ success: false, error: error.message }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
          );
        }

        console.log('Note created successfully:', data.id);
        return new Response(
          JSON.stringify({ success: true, data }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'update': {
        console.log('Updating note:', noteId);
        const { data, error } = await supabase
          .from('notes')
          .update(noteData as Partial<NoteData>)
          .eq('id', noteId)
          .select()
          .single();

        if (error) {
          console.error('Error updating note:', error);
          return new Response(
            JSON.stringify({ success: false, error: error.message }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
          );
        }

        console.log('Note updated successfully');
        return new Response(
          JSON.stringify({ success: true, data }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'delete': {
        console.log('Deleting note:', noteId);
        const { error } = await supabase
          .from('notes')
          .delete()
          .eq('id', noteId);

        if (error) {
          console.error('Error deleting note:', error);
          return new Response(
            JSON.stringify({ success: false, error: error.message }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
          );
        }

        console.log('Note deleted successfully');
        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'seed': {
        console.log('Seeding notes from static data');
        const { notesData } = noteData;
        
        for (const note of notesData) {
          const { error } = await supabase
            .from('notes')
            .insert([{
              lesson_number: note.id,
              title: note.title,
              lexical_topic: note.lexicalTopic,
              grammar_topic: note.grammarTopic,
              vocabulary: note.vocabulary,
              grammar_rules: note.grammarRules,
              exercises: note.exercises || [],
              is_published: true
            }]);

          if (error) {
            console.error('Error seeding note:', error);
          }
        }

        console.log('Seeding completed');
        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      default:
        return new Response(
          JSON.stringify({ success: false, error: 'Invalid action' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        );
    }
  } catch (error) {
    console.error('Error in admin-notes function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
