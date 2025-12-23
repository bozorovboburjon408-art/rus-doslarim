import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { notesData as staticNotesData } from "@/data/notesData";
import { useAdmin } from "@/contexts/AdminContext";
import { supabase } from "@/integrations/supabase/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Languages, GraduationCap, PenLine, Settings, Loader2, FileText } from "lucide-react";

interface VocabularyItem {
  russian: string;
  uzbek: string;
}

interface GrammarRule {
  rule: string;
  example: string;
}

interface Note {
  id: string;
  lesson_number: number;
  title: string;
  lexical_topic: string;
  grammar_topic: string;
  vocabulary: VocabularyItem[];
  grammar_rules: GrammarRule[];
  exercises: string[];
  is_published: boolean;
}

const Notes = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAdmin();
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [useStatic, setUseStatic] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("is_published", true)
        .order("lesson_number", { ascending: true });

      if (error) {
        console.error("Error fetching notes:", error);
        setUseStatic(true);
      } else if (data && data.length > 0) {
        const transformedNotes: Note[] = data.map((note: any) => ({
          id: note.id,
          lesson_number: note.lesson_number,
          title: note.title,
          lexical_topic: note.lexical_topic,
          grammar_topic: note.grammar_topic,
          vocabulary: note.vocabulary as VocabularyItem[],
          grammar_rules: note.grammar_rules as GrammarRule[],
          exercises: note.exercises as string[],
          is_published: note.is_published,
        }));
        setNotes(transformedNotes);
        setUseStatic(false);
      } else {
        setUseStatic(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setUseStatic(true);
    } finally {
      setIsLoading(false);
    }
  };

  const displayNotes = useStatic
    ? staticNotesData.map((note) => ({
        id: String(note.id),
        lesson_number: note.id,
        title: note.title,
        lexical_topic: note.lexicalTopic,
        grammar_topic: note.grammarTopic,
        vocabulary: note.vocabulary,
        grammar_rules: note.grammarRules,
        exercises: note.exercises || [],
        is_published: true,
      }))
    : notes;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Конспекты</h1>
            <p className="text-muted-foreground">24 ta amaliy mashg'ulot – grammatika va leksika</p>
          </div>
          {isAdmin && (
            <Button onClick={() => navigate("/admin/notes")}>
              <Settings className="h-4 w-4 mr-2" />
              Boshqarish
            </Button>
          )}
        </div>

        {displayNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-muted p-6 mb-4">
              <FileText className="h-12 w-12 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">Konspektlar topilmadi</p>
          </div>
        ) : (
          <Accordion type="single" collapsible className="space-y-4">
            {displayNotes.map((note) => (
              <AccordionItem 
                key={note.id} 
                value={`note-${note.id}`}
                className="border rounded-lg px-4 bg-card"
              >
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex flex-col items-start gap-2 text-left">
                    <span className="font-semibold text-lg">{note.title}</span>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="text-xs">
                        <BookOpen className="w-3 h-3 mr-1" />
                        {note.grammar_topic}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <Languages className="w-3 h-3 mr-1" />
                        {note.lexical_topic}
                      </Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="grid gap-6">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Languages className="w-4 h-4" />
                          Lug'at / Глоссарий
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-1/2">Русский</TableHead>
                              <TableHead className="w-1/2">O'zbekcha</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {note.vocabulary.map((item, idx) => (
                              <TableRow key={idx}>
                                <TableCell className="font-medium">{item.russian}</TableCell>
                                <TableCell>{item.uzbek}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <GraduationCap className="w-4 h-4" />
                          Grammatik qoidalar / Грамматические правила
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-1/2">Qoida / Правило</TableHead>
                              <TableHead className="w-1/2">Misol / Пример</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {note.grammar_rules.map((rule, idx) => (
                              <TableRow key={idx}>
                                <TableCell className="font-medium">{rule.rule}</TableCell>
                                <TableCell className="italic text-muted-foreground">{rule.example}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>

                    {note.exercises && note.exercises.length > 0 && (
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center gap-2">
                            <PenLine className="w-4 h-4" />
                            Mashqlar / Упражнения
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="list-disc list-inside space-y-2">
                            {note.exercises.map((exercise, idx) => (
                              <li key={idx} className="text-muted-foreground">{exercise}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </main>
    </div>
  );
};

export default Notes;
