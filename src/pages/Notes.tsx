import { Header } from "@/components/Header";
import { FileText } from "lucide-react";

const Notes = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Конспекты</h1>
          <p className="text-muted-foreground">Краткие справочные материалы по русскому языку</p>
        </div>

        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="rounded-full bg-muted p-6 mb-4">
            <FileText className="h-12 w-12 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">Конспекты скоро будут добавлены</p>
        </div>
      </main>
    </div>
  );
};

export default Notes;
