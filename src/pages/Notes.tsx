import { Header } from "@/components/Header";
import { notesData } from "@/data/notesData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Languages } from "lucide-react";

const Notes = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Конспекты</h1>
          <p className="text-muted-foreground">24 ta amaliy mashg'ulot – grammatika va leksika</p>
        </div>

        <div className="grid gap-4">
          {notesData.map((note) => (
            <Card key={note.id} className="hover:bg-muted/50 transition-colors">
              <CardContent className="py-4">
                <div className="flex flex-col gap-2">
                  <span className="font-semibold text-lg">{note.title}</span>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">
                      <BookOpen className="w-3 h-3 mr-1" />
                      {note.grammarTopic}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <Languages className="w-3 h-3 mr-1" />
                      {note.lexicalTopic}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Notes;
