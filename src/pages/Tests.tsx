import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import TestManager from "@/components/TestManager";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  XCircle,
  Trophy,
  Clock,
  ChevronRight,
  RotateCcw,
  Plus,
  Edit,
  Trash2,
  ShieldCheck,
  LogOut,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface TestQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface Test {
  id: string;
  title: string;
  description: string | null;
  questions: TestQuestion[];
  is_published: boolean;
  created_at: string;
}

const Tests = () => {
  const { user, isAdmin, signOut, isLoading: authLoading } = useAuth();
  const [tests, setTests] = useState<Test[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [editingTest, setEditingTest] = useState<Test | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const currentTest = tests.find((t) => t.id === selectedTest);

  const fetchTests = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("tests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const formattedTests = (data || []).map((t) => ({
        ...t,
        questions: Array.isArray(t.questions)
          ? (t.questions as unknown as TestQuestion[])
          : [],
      }));

      setTests(formattedTests);
    } catch (error: any) {
      console.error("Error fetching tests:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTests();
  }, [isAdmin]);

  const startTest = (testId: string) => {
    setSelectedTest(testId);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  const selectAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentTest && currentQuestion < currentTest.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    if (!currentTest) return 0;
    let correct = 0;
    currentTest.questions.forEach((q, i) => {
      if (answers[i] === q.correct) correct++;
    });
    return correct;
  };

  const getPercentage = () => {
    if (!currentTest) return 0;
    return Math.round((calculateScore() / currentTest.questions.length) * 100);
  };

  const resetTest = () => {
    setSelectedTest(null);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  const handleDeleteTest = async (testId: string) => {
    try {
      const { error } = await supabase.from("tests").delete().eq("id", testId);
      if (error) throw error;
      toast.success("Test o'chirildi");
      fetchTests();
    } catch (error: any) {
      toast.error(error.message || "Xatolik yuz berdi");
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success("Tizimdan chiqdingiz");
  };

  // Filter tests: admins see all, others see only published
  const visibleTests = isAdmin
    ? tests
    : tests.filter((t) => t.is_published);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isCreating || editingTest) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="rounded-2xl bg-card p-6 shadow-card">
              <TestManager
                test={editingTest || undefined}
                onSave={() => {
                  setIsCreating(false);
                  setEditingTest(null);
                  fetchTests();
                }}
                onCancel={() => {
                  setIsCreating(false);
                  setEditingTest(null);
                }}
              />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Testlar</h1>
            <p className="text-muted-foreground">
              Bilimlaringizni sinab ko'ring
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin ? (
              <>
                <Button onClick={() => setIsCreating(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Yangi test
                </Button>
                <Button variant="outline" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Chiqish
                </Button>
              </>
            ) : (
              <Link to="/admin">
                <Button variant="outline" size="sm">
                  <ShieldCheck className="h-4 w-4 mr-2" />
                  Admin
                </Button>
              </Link>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : !selectedTest ? (
          <>
            {visibleTests.length === 0 ? (
              <div className="rounded-2xl bg-card p-12 shadow-card text-center">
                <p className="text-muted-foreground mb-4">
                  Hozircha testlar yo'q
                </p>
                {isAdmin && (
                  <Button onClick={() => setIsCreating(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Birinchi testni yaratish
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {visibleTests.map((test, index) => (
                  <div
                    key={test.id}
                    className={cn(
                      "group rounded-2xl bg-card p-6 shadow-card transition-all duration-300 animate-fade-in",
                      "hover:shadow-xl hover:-translate-y-1",
                      !test.is_published && "border-2 border-dashed border-amber-500/50"
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-4xl">📝</span>
                      {!test.is_published && (
                        <span className="text-xs px-2 py-1 rounded-full bg-amber-500/10 text-amber-600">
                          Qoralama
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {test.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {test.description || "Tavsif yo'q"}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {test.questions.length} ta savol
                      </span>
                      <div className="flex items-center gap-1">
                        {isAdmin && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setEditingTest(test)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Testni o'chirish
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Haqiqatan ham "{test.title}" testini
                                    o'chirmoqchimisiz? Bu amalni qaytarib
                                    bo'lmaydi.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteTest(test.id)}
                                    className="bg-destructive hover:bg-destructive/90"
                                  >
                                    O'chirish
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </>
                        )}
                        <Button
                          onClick={() => startTest(test.id)}
                          size="sm"
                          disabled={test.questions.length === 0}
                        >
                          Boshlash
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : showResults ? (
          <div className="mx-auto max-w-2xl animate-fade-in">
            <div className="rounded-2xl bg-card p-8 shadow-card text-center">
              <div className="mb-6">
                <Trophy
                  className={cn(
                    "h-16 w-16 mx-auto mb-4",
                    getPercentage() >= 80
                      ? "text-yellow-500"
                      : getPercentage() >= 60
                      ? "text-gray-400"
                      : "text-orange-400"
                  )}
                />
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Test yakunlandi!
                </h2>
                <p className="text-muted-foreground">{currentTest?.title}</p>
              </div>

              <div className="mb-8 rounded-xl bg-muted/30 p-6">
                <div className="text-5xl font-bold text-primary mb-2">
                  {getPercentage()}%
                </div>
                <p className="text-lg text-foreground">
                  {calculateScore()} / {currentTest?.questions.length} to'g'ri
                  javob
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {getPercentage() >= 80
                    ? "🎉 Ajoyib natija!"
                    : getPercentage() >= 60
                    ? "👍 Yaxshi, davom eting!"
                    : "📚 Ko'proq mashq qiling"}
                </p>
              </div>

              <div className="space-y-3 mb-8 text-left">
                {currentTest?.questions.map((q, index) => (
                  <div
                    key={index}
                    className={cn(
                      "rounded-xl p-4",
                      answers[index] === q.correct
                        ? "bg-accent/10"
                        : "bg-destructive/10"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      {answers[index] === q.correct ? (
                        <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="font-medium text-foreground text-sm">
                          {q.question}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {answers[index] !== q.correct && (
                            <span className="text-destructive">
                              Sizning javobingiz: {q.options[answers[index]]} •{" "}
                            </span>
                          )}
                          To'g'ri javob: {q.options[q.correct]}
                        </p>
                        {q.explanation && (
                          <p className="text-xs text-muted-foreground mt-1 italic">
                            {q.explanation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={resetTest} className="flex-1">
                  Testlarga qaytish
                </Button>
                <Button
                  onClick={() => startTest(selectedTest)}
                  className="flex-1"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Qaytadan boshlash
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-2xl">
            <div className="mb-6 flex items-center justify-between">
              <button
                onClick={resetTest}
                className="text-primary hover:underline"
              >
                ← Testlarga qaytish
              </button>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-foreground">
                  {currentQuestion + 1} / {currentTest?.questions.length}
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-6 h-2 rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{
                  width: `${
                    ((currentQuestion + 1) /
                      (currentTest?.questions.length || 1)) *
                    100
                  }%`,
                }}
              />
            </div>

            <div className="rounded-2xl bg-card p-6 shadow-card animate-fade-in">
              <h3 className="text-xl font-semibold text-foreground mb-6">
                {currentTest?.questions[currentQuestion].question}
              </h3>

              <div className="space-y-3 mb-6">
                {currentTest?.questions[currentQuestion].options.map(
                  (option, index) => (
                    <button
                      key={index}
                      onClick={() => selectAnswer(index)}
                      className={cn(
                        "w-full rounded-xl p-4 text-left transition-all duration-200 border-2",
                        answers[currentQuestion] === index
                          ? "bg-primary/10 border-primary"
                          : "bg-muted/30 border-transparent hover:bg-muted"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "h-6 w-6 rounded-full border-2 flex items-center justify-center",
                            answers[currentQuestion] === index
                              ? "border-primary bg-primary"
                              : "border-muted-foreground"
                          )}
                        >
                          {answers[currentQuestion] === index && (
                            <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                          )}
                        </div>
                        <span className="font-medium">{option}</span>
                      </div>
                    </button>
                  )
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  className="flex-1"
                >
                  Oldingi
                </Button>
                <Button
                  onClick={nextQuestion}
                  disabled={answers[currentQuestion] === undefined}
                  className="flex-1"
                >
                  {currentQuestion === (currentTest?.questions.length || 0) - 1
                    ? "Yakunlash"
                    : "Keyingi"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Tests;
