import { useState } from "react";
import { Header } from "@/components/Header";
import { Volume2, Search, ChevronRight, BookOpen, Gamepad2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { vocabularyCategories } from "@/data/vocabularyData";
import { VocabularyQuiz } from "@/components/VocabularyQuiz";
import { Button } from "@/components/ui/button";

type ViewMode = "list" | "quiz";

const Vocabulary = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedWord, setExpandedWord] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ru-RU";
    speechSynthesis.speak(utterance);
  };

  const currentCategory = vocabularyCategories.find((c) => c.id === selectedCategory);
  
  const filteredWords = currentCategory?.words.filter(
    (word) =>
      word.russian.toLowerCase().includes(searchQuery.toLowerCase()) ||
      word.uzbek.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBack = () => {
    setSelectedCategory(null);
    setSearchQuery("");
    setViewMode("list");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Словарь</h1>
          <p className="text-muted-foreground">Термины для горного дела и технологий</p>
        </div>

        {!selectedCategory ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {vocabularyCategories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "group flex items-center gap-4 rounded-2xl glass-section p-6 text-left transition-all duration-300",
                  "hover:shadow-xl hover:-translate-y-1 animate-fade-in"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-3xl">
                  {category.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.words.length} слов</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </button>
            ))}
          </div>
        ) : viewMode === "quiz" && currentCategory ? (
          <VocabularyQuiz category={currentCategory} onBack={handleBack} />
        ) : (
          <div>
            <button
              onClick={handleBack}
              className="mb-6 flex items-center gap-2 text-primary hover:underline"
            >
              ← Вернуться к категориям
            </button>

            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-2xl">
                  {currentCategory?.icon}
                </div>
                <h2 className="text-2xl font-bold text-foreground">{currentCategory?.name}</h2>
              </div>
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={viewMode === "list" ? "default" : "outline"}
                  onClick={() => setViewMode("list")}
                  className="gap-2"
                >
                  <BookOpen className="h-4 w-4" />
                  Список
                </Button>
                <Button
                  size="sm"
                  variant={viewMode === "quiz" ? "default" : "outline"}
                  onClick={() => setViewMode("quiz")}
                  className="gap-2"
                >
                  <Gamepad2 className="h-4 w-4" />
                  Викторина
                </Button>
              </div>
            </div>

            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск слова..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 rounded-xl"
              />
            </div>

            <div className="space-y-3">
              {filteredWords?.map((word, index) => (
                <div
                  key={word.russian}
                  className={cn(
                    "rounded-2xl glass-section p-4 transition-all duration-300 animate-fade-in",
                    expandedWord === word.russian && "shadow-card"
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setExpandedWord(expandedWord === word.russian ? null : word.russian)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-xl font-bold text-foreground">{word.russian}</span>
                        <span className="text-sm text-muted-foreground">({word.pronunciation})</span>
                      </div>
                      <span className="text-lg text-primary font-medium">{word.uzbek}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speak(word.russian);
                      }}
                      className="rounded-full bg-primary/10 p-3 text-primary transition-colors hover:bg-primary/20"
                    >
                      <Volume2 className="h-5 w-5" />
                    </button>
                  </div>
                  
                  {expandedWord === word.russian && (
                    <div className="mt-4 pt-4 border-t border-border animate-fade-in">
                      <p className="text-sm font-medium text-muted-foreground mb-2">Пример:</p>
                      <p className="text-foreground bg-muted/50 rounded-lg p-3">{word.example}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Vocabulary;
