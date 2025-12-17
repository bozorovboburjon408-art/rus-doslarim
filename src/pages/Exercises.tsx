import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { 
  CheckCircle2, XCircle, RefreshCw, ChevronRight, ArrowLeft, 
  Trophy, Target, Clock, Flame, BookOpen, Filter,
  TableProperties, Zap, GraduationCap, Languages, MessageSquare, LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { 
  exerciseCategories, 
  Exercise, 
  ExerciseCategory,
  getDifficultyLabel,
  getDifficultyColor 
} from "@/data/exercisesData";

const iconMap: Record<string, LucideIcon> = {
  TableProperties,
  Zap,
  GraduationCap,
  Languages,
  MessageSquare,
};

type DifficultyFilter = "all" | "beginner" | "intermediate" | "advanced";

const Exercises = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [startTime] = useState(Date.now());

  const currentCategory = exerciseCategories.find((c) => c.id === selectedCategory);
  
  const filteredExercises = useMemo(() => {
    if (!currentCategory) return [];
    if (difficultyFilter === "all") return currentCategory.exercises;
    return currentCategory.exercises.filter(e => e.difficulty === difficultyFilter);
  }, [currentCategory, difficultyFilter]);

  const currentExercise = filteredExercises[currentIndex];

  const checkAnswer = () => {
    if (!currentExercise) return;

    let correct = false;
    
    if (currentExercise.type === "fill") {
      correct = userAnswer.toLowerCase().trim() === currentExercise.answer.toLowerCase();
    } else if (currentExercise.type === "choice") {
      correct = selectedOption === currentExercise.correct;
    } else if (currentExercise.type === "translate") {
      const normalizedAnswer = userAnswer.toLowerCase().trim();
      correct = currentExercise.acceptedAnswers.some(
        ans => normalizedAnswer === ans.toLowerCase()
      );
    } else if (currentExercise.type === "case") {
      correct = userAnswer.toLowerCase().trim() === currentExercise.answer.toLowerCase();
    } else if (currentExercise.type === "conjugation") {
      correct = userAnswer.toLowerCase().trim() === currentExercise.answer.toLowerCase();
    }

    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(score + 1);
      setTotalPoints(totalPoints + currentExercise.points);
      setStreak(streak + 1);
      toast.success(`To'g'ri! +${currentExercise.points} ball 🎉`);
    } else {
      setStreak(0);
      toast.error("Noto'g'ri. Qaytadan urinib ko'ring!");
    }
  };

  const nextExercise = () => {
    if (currentIndex < filteredExercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer("");
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setCompleted(true);
    }
  };

  const resetExercises = () => {
    setCurrentIndex(0);
    setUserAnswer("");
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
    setTotalPoints(0);
    setCompleted(false);
    setStreak(0);
  };

  const goBack = () => {
    setSelectedCategory(null);
    setDifficultyFilter("all");
    resetExercises();
  };

  const getElapsedTime = () => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const getAccuracy = () => {
    if (score === 0 && currentIndex === 0) return 0;
    return Math.round((score / (currentIndex + (showResult ? 1 : 0))) * 100);
  };

  const renderExerciseContent = () => {
    if (!currentExercise) return null;

    switch (currentExercise.type) {
      case "fill":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Badge variant="outline" className="mb-2">Bo'sh joyni to'ldiring</Badge>
              <p className="text-2xl font-semibold text-foreground leading-relaxed">
                {currentExercise.sentence.replace("___", showResult ? `[${currentExercise.answer}]` : "______")}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
              <span className="text-lg">💡</span>
              <span>Maslahat: <strong>{currentExercise.hint}</strong></span>
            </div>
            
            {!showResult ? (
              <div className="flex gap-3">
                <Input
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Javobingizni kiriting..."
                  className="flex-1 h-12 text-lg"
                  onKeyDown={(e) => e.key === "Enter" && userAnswer.trim() && checkAnswer()}
                  autoFocus
                />
                <Button onClick={checkAnswer} disabled={!userAnswer.trim()} size="lg">
                  Tekshirish
                </Button>
              </div>
            ) : (
              <ResultFeedback 
                isCorrect={isCorrect} 
                correctAnswer={currentExercise.answer}
                explanation={currentExercise.uzbek}
                additionalInfo={currentExercise.explanation}
              />
            )}
          </div>
        );

      case "choice":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Badge variant="outline" className="mb-2">To'g'ri javobni tanlang</Badge>
              <p className="text-2xl font-semibold text-foreground">
                {currentExercise.question}
              </p>
            </div>
            
            <div className="grid gap-3">
              {currentExercise.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResult && setSelectedOption(index)}
                  disabled={showResult}
                  className={cn(
                    "w-full rounded-xl p-4 text-left transition-all duration-200 border-2",
                    showResult
                      ? index === currentExercise.correct
                        ? "bg-green-500/10 border-green-500 text-green-700"
                        : selectedOption === index
                        ? "bg-red-500/10 border-red-500 text-red-700"
                        : "bg-muted/30 border-transparent"
                      : selectedOption === index
                      ? "bg-primary/10 border-primary"
                      : "bg-muted/30 border-transparent hover:bg-muted hover:border-muted-foreground/20"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                      showResult && index === currentExercise.correct
                        ? "bg-green-500 text-white"
                        : showResult && selectedOption === index
                        ? "bg-red-500 text-white"
                        : selectedOption === index
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted-foreground/20"
                    )}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {!showResult ? (
              <Button
                onClick={checkAnswer}
                disabled={selectedOption === null}
                className="w-full"
                size="lg"
              >
                Tekshirish
              </Button>
            ) : (
              <ResultFeedback 
                isCorrect={isCorrect} 
                correctAnswer={currentExercise.options[currentExercise.correct]}
                explanation={currentExercise.uzbek}
                additionalInfo={currentExercise.explanation}
              />
            )}
          </div>
        );

      case "translate":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Badge variant="outline" className="mb-2">
                {currentExercise.direction === "ru-uz" ? "Ruscha → O'zbekcha" : "O'zbekcha → Ruscha"}
              </Badge>
              <p className="text-2xl font-semibold text-foreground">
                {currentExercise.direction === "ru-uz" ? currentExercise.russian : currentExercise.uzbek}
              </p>
            </div>
            
            {!showResult ? (
              <div className="flex gap-3">
                <Input
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder={currentExercise.direction === "ru-uz" ? "O'zbekcha tarjima..." : "Русский перевод..."}
                  className="flex-1 h-12 text-lg"
                  onKeyDown={(e) => e.key === "Enter" && userAnswer.trim() && checkAnswer()}
                  autoFocus
                />
                <Button onClick={checkAnswer} disabled={!userAnswer.trim()} size="lg">
                  Tekshirish
                </Button>
              </div>
            ) : (
              <ResultFeedback 
                isCorrect={isCorrect} 
                correctAnswer={currentExercise.direction === "ru-uz" ? currentExercise.uzbek : currentExercise.russian}
                explanation={`Qabul qilinadigan javoblar: ${currentExercise.acceptedAnswers.join(", ")}`}
              />
            )}
          </div>
        );

      case "case":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Badge variant="outline" className="mb-2">Kelishik shakli</Badge>
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6">
                <p className="text-lg text-muted-foreground mb-2">So'zni quyidagi kelishikka o'zgartiring:</p>
                <p className="text-3xl font-bold text-foreground mb-4">«{currentExercise.word}»</p>
                <div className="flex items-center gap-3">
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    {currentExercise.targetCase}
                  </Badge>
                  <span className="text-sm text-muted-foreground">({currentExercise.hint})</span>
                </div>
              </div>
            </div>
            
            {!showResult ? (
              <div className="flex gap-3">
                <Input
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Javobingiz..."
                  className="flex-1 h-12 text-lg"
                  onKeyDown={(e) => e.key === "Enter" && userAnswer.trim() && checkAnswer()}
                  autoFocus
                />
                <Button onClick={checkAnswer} disabled={!userAnswer.trim()} size="lg">
                  Tekshirish
                </Button>
              </div>
            ) : (
              <ResultFeedback 
                isCorrect={isCorrect} 
                correctAnswer={currentExercise.answer}
                explanation={`${currentExercise.originalForm} → ${currentExercise.answer} (${currentExercise.targetCase})`}
              />
            )}
          </div>
        );

      case "conjugation":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Badge variant="outline" className="mb-2">Fe'l tuslanishi</Badge>
              <div className="bg-gradient-to-r from-orange-500/5 to-amber-500/5 rounded-xl p-6">
                <p className="text-lg text-muted-foreground mb-2">Fe'lni to'g'ri shaklda yozing:</p>
                <p className="text-3xl font-bold text-foreground mb-4">«{currentExercise.infinitive}»</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="bg-orange-500/20 text-orange-600 border-orange-500/30">
                    {currentExercise.pronoun}
                  </Badge>
                  <Badge className="bg-amber-500/20 text-amber-600 border-amber-500/30">
                    {currentExercise.tense} время
                  </Badge>
                </div>
              </div>
            </div>
            
            {!showResult ? (
              <div className="flex gap-3">
                <Input
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Fe'l shakli..."
                  className="flex-1 h-12 text-lg"
                  onKeyDown={(e) => e.key === "Enter" && userAnswer.trim() && checkAnswer()}
                  autoFocus
                />
                <Button onClick={checkAnswer} disabled={!userAnswer.trim()} size="lg">
                  Tekshirish
                </Button>
              </div>
            ) : (
              <ResultFeedback 
                isCorrect={isCorrect} 
                correctAnswer={currentExercise.answer}
                explanation={`${currentExercise.pronoun} ${currentExercise.answer} (${currentExercise.tense})`}
              />
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl animate-pulse-glow" />
          <div className="absolute right-10 top-20 h-32 w-32 rounded-full bg-accent/15 blur-2xl animate-bounce-soft" />
          <div className="absolute left-1/3 bottom-0 h-48 w-48 rounded-full bg-secondary/10 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm border border-primary/20 animate-fade-in">
              <Target className="h-4 w-4" />
              {exerciseCategories.length} kategoriya • 70+ mashq
            </div>
            
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl animate-fade-in" style={{ animationDelay: "100ms" }}>
              <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                Mashqlar
              </span>
            </h1>
            
            <p className="mb-6 text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: "200ms" }}>
              NDKTU talabalari uchun professional rus tili mashqlari
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap animate-fade-in" style={{ animationDelay: "300ms" }}>
              <div className="flex items-center gap-2 rounded-xl bg-card/80 backdrop-blur-sm px-4 py-2 shadow-sm">
                <Trophy className="h-5 w-5 text-amber-500" />
                <div className="text-left">
                  <p className="text-lg font-bold text-foreground">3</p>
                  <p className="text-xs text-muted-foreground">Daraja</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-card/80 backdrop-blur-sm px-4 py-2 shadow-sm">
                <BookOpen className="h-5 w-5 text-blue-500" />
                <div className="text-left">
                  <p className="text-lg font-bold text-foreground">5</p>
                  <p className="text-xs text-muted-foreground">Tur</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-card/80 backdrop-blur-sm px-4 py-2 shadow-sm">
                <Flame className="h-5 w-5 text-orange-500" />
                <div className="text-left">
                  <p className="text-lg font-bold text-foreground">70+</p>
                  <p className="text-xs text-muted-foreground">Mashq</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8">
        {!selectedCategory ? (
          // Category Selection
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {exerciseCategories.map((category, index) => {
              const IconComponent = iconMap[category.icon] || BookOpen;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl bg-card p-6 text-left shadow-sm transition-all duration-300",
                    "hover:shadow-xl hover:-translate-y-1 animate-fade-in border border-border/50"
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-50" />
                  
                  <div className="relative z-10">
                    <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-muted/50", category.color)}>
                      <IconComponent className="h-7 w-7" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-1">{category.title}</h3>
                    <p className="text-sm text-primary font-medium mb-2">{category.titleUz}</p>
                    <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {category.exercises.length} mashq
                        </Badge>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : completed ? (
          // Completion Screen
          <div className="mx-auto max-w-lg text-center animate-fade-in">
            <div className="rounded-2xl bg-card p-8 shadow-lg border border-border/50">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-4">
                  <Trophy className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Tabriklaymiz! 🎉</h2>
                <p className="text-muted-foreground">
                  Siz barcha mashqlarni yakunladingiz
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="rounded-xl bg-green-500/10 p-4">
                  <p className="text-2xl font-bold text-green-600">{score}</p>
                  <p className="text-xs text-muted-foreground">To'g'ri</p>
                </div>
                <div className="rounded-xl bg-primary/10 p-4">
                  <p className="text-2xl font-bold text-primary">{totalPoints}</p>
                  <p className="text-xs text-muted-foreground">Ball</p>
                </div>
                <div className="rounded-xl bg-amber-500/10 p-4">
                  <p className="text-2xl font-bold text-amber-600">{getAccuracy()}%</p>
                  <p className="text-xs text-muted-foreground">Aniqlik</p>
                </div>
              </div>

              <div className="mb-6 rounded-xl bg-muted/50 p-4">
                <p className="text-3xl font-bold text-foreground">
                  {score} / {filteredExercises.length}
                </p>
                <p className="text-sm text-muted-foreground">to'g'ri javoblar</p>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={goBack} className="flex-1">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Ortga
                </Button>
                <Button onClick={resetExercises} className="flex-1">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Qaytadan
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // Exercise View
          <div className="mx-auto max-w-2xl">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <button onClick={goBack} className="flex items-center gap-2 text-primary hover:underline">
                <ArrowLeft className="h-4 w-4" />
                Ortga
              </button>
              <div className="flex items-center gap-4">
                {streak > 0 && (
                  <div className="flex items-center gap-1 text-orange-500">
                    <Flame className="h-4 w-4" />
                    <span className="text-sm font-medium">{streak}</span>
                  </div>
                )}
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{getElapsedTime()}</span>
                </div>
              </div>
            </div>

            {/* Difficulty Filter */}
            <div className="mb-6 flex items-center gap-2 flex-wrap">
              <Filter className="h-4 w-4 text-muted-foreground" />
              {(["all", "beginner", "intermediate", "advanced"] as DifficultyFilter[]).map((diff) => (
                <Button
                  key={diff}
                  variant={difficultyFilter === diff ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setDifficultyFilter(diff);
                    resetExercises();
                  }}
                  className="text-xs"
                >
                  {diff === "all" ? "Barchasi" : getDifficultyLabel(diff)}
                </Button>
              ))}
            </div>

            {/* Progress */}
            <div className="mb-6 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Mashq {currentIndex + 1} / {filteredExercises.length}
                </span>
                <div className="flex items-center gap-4">
                  <span className="text-green-600 font-medium">{score} to'g'ri</span>
                  <span className="text-primary font-medium">{totalPoints} ball</span>
                </div>
              </div>
              <Progress 
                value={((currentIndex + 1) / filteredExercises.length) * 100} 
                className="h-2"
              />
            </div>

            {/* Exercise Card */}
            {filteredExercises.length > 0 ? (
              <div className="rounded-2xl bg-card p-6 shadow-lg border border-border/50 animate-fade-in">
                {/* Exercise Header */}
                <div className="flex items-center justify-between mb-6">
                  <Badge className={cn("border", getDifficultyColor(currentExercise?.difficulty || "beginner"))}>
                    {getDifficultyLabel(currentExercise?.difficulty || "beginner")}
                  </Badge>
                  <Badge variant="outline">
                    +{currentExercise?.points} ball
                  </Badge>
                </div>

                {renderExerciseContent()}

                {showResult && (
                  <Button onClick={nextExercise} className="w-full mt-6" size="lg">
                    {currentIndex < filteredExercises.length - 1
                      ? "Keyingi mashq"
                      : "Natijani ko'rish"}
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Bu darajada mashqlar mavjud emas</p>
                <Button variant="outline" onClick={() => setDifficultyFilter("all")} className="mt-4">
                  Barcha mashqlarni ko'rish
                </Button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

// Result Feedback Component
interface ResultFeedbackProps {
  isCorrect: boolean;
  correctAnswer: string;
  explanation: string;
  additionalInfo?: string;
}

const ResultFeedback = ({ isCorrect, correctAnswer, explanation, additionalInfo }: ResultFeedbackProps) => (
  <div
    className={cn(
      "rounded-xl p-4 border-2",
      isCorrect 
        ? "bg-green-500/10 border-green-500/30" 
        : "bg-red-500/10 border-red-500/30"
    )}
  >
    <div className="flex items-start gap-3">
      {isCorrect ? (
        <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
      ) : (
        <XCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
      )}
      <div className="space-y-1">
        <p className={cn("font-semibold", isCorrect ? "text-green-700" : "text-red-700")}>
          {isCorrect ? "To'g'ri!" : `Noto'g'ri. To'g'ri javob: ${correctAnswer}`}
        </p>
        <p className="text-sm text-muted-foreground">{explanation}</p>
        {additionalInfo && (
          <p className="text-sm text-muted-foreground/80 italic">{additionalInfo}</p>
        )}
      </div>
    </div>
  </div>
);

export default Exercises;
