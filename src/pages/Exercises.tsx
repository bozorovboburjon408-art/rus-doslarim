import { useState } from "react";
import { Header } from "@/components/Header";
import { CheckCircle2, XCircle, RefreshCw, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type ExerciseType = "fill" | "choice";

interface FillExercise {
  type: "fill";
  sentence: string;
  answer: string;
  hint: string;
  uzbek: string;
}

interface ChoiceExercise {
  type: "choice";
  question: string;
  options: string[];
  correct: number;
  uzbek: string;
}

type Exercise = FillExercise | ChoiceExercise;

const exerciseCategories = [
  {
    id: "basic",
    title: "Основные слова",
    icon: "📝",
    exercises: [
      { type: "fill" as const, sentence: "Меня ___ Алишер.", answer: "зовут", hint: "ismim", uzbek: "Mening ismim Alisher." },
      { type: "fill" as const, sentence: "Я ___ из Узбекистана.", answer: "приехал", hint: "keldim", uzbek: "Men O'zbekistondan keldim." },
      { type: "choice" as const, question: "Как переводится \"Спасибо\"?", options: ["Salom", "Rahmat", "Xayr", "Iltimos"], correct: 1, uzbek: "Rahmat" },
      { type: "choice" as const, question: "Что означает \"До свидания\"?", options: ["Xayrli tong", "Xayr", "Salom", "Kechirasiz"], correct: 1, uzbek: "Xayr" },
      { type: "fill" as const, sentence: "Доброе ___!", answer: "утро", hint: "tong", uzbek: "Xayrli tong!" },
    ],
  },
  {
    id: "numbers",
    title: "Числа",
    icon: "🔢",
    exercises: [
      { type: "choice" as const, question: "Какое число \"Три\"?", options: ["2", "3", "4", "5"], correct: 1, uzbek: "3 - uch" },
      { type: "fill" as const, sentence: "У меня ___ брата.", answer: "два", hint: "ikki", uzbek: "Mening ikkita akam bor." },
      { type: "choice" as const, question: "Перевод слова \"Пять\":", options: ["To'rt", "Besh", "Olti", "Uch"], correct: 1, uzbek: "Besh" },
      { type: "fill" as const, sentence: "___ часа дня.", answer: "Три", hint: "uch", uzbek: "Kunduzi soat uch." },
      { type: "choice" as const, question: "Сколько это \"Десять\"?", options: ["8", "9", "10", "11"], correct: 2, uzbek: "10 - o'n" },
    ],
  },
  {
    id: "verbs",
    title: "Глаголы",
    icon: "🏃",
    exercises: [
      { type: "fill" as const, sentence: "Я ___ книгу.", answer: "читаю", hint: "o'qiyman", uzbek: "Men kitob o'qiyman." },
      { type: "choice" as const, question: "Что означает \"Я пишу\"?", options: ["Men o'qiyman", "Men yozaman", "Men gaplashaman", "Men yuraman"], correct: 1, uzbek: "Men yozaman" },
      { type: "fill" as const, sentence: "Он ___ в школе.", answer: "учится", hint: "o'qiydi", uzbek: "U maktabda o'qiydi." },
      { type: "choice" as const, question: "Значение глагола \"Работать\":", options: ["O'ynamoq", "Ishlamoq", "Uxlamoq", "Yemoq"], correct: 1, uzbek: "Ishlamoq" },
      { type: "fill" as const, sentence: "Мы ___ в ресторане.", answer: "едим", hint: "ovqatlanamiz", uzbek: "Biz restoranda ovqatlanamiz." },
    ],
  },
  {
    id: "phrases",
    title: "Выражения",
    icon: "💬",
    exercises: [
      { type: "fill" as const, sentence: "Как вас ___?", answer: "зовут", hint: "ismingiz", uzbek: "Ismingiz nima?" },
      { type: "choice" as const, question: "Перевод \"Сколько это стоит?\":", options: ["Bu nima?", "Bu qancha?", "Bu qayerda?", "Bu kim?"], correct: 1, uzbek: "Bu qancha turadi?" },
      { type: "fill" as const, sentence: "Очень ___!", answer: "приятно", hint: "xursand", uzbek: "Tanishganimdan xursandman!" },
      { type: "choice" as const, question: "Когда используется \"Извините\"?", options: ["При приветствии", "При извинении", "При прощании", "При благодарности"], correct: 1, uzbek: "Kechirasiz" },
      { type: "fill" as const, sentence: "Где находится ___?", answer: "метро", hint: "metro", uzbek: "Metro qayerda joylashgan?" },
    ],
  },
];

const Exercises = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentCategory = exerciseCategories.find((c) => c.id === selectedCategory);
  const currentExercise = currentCategory?.exercises[currentIndex];

  const checkAnswer = () => {
    if (!currentExercise) return;

    let correct = false;
    if (currentExercise.type === "fill") {
      correct = userAnswer.toLowerCase().trim() === currentExercise.answer.toLowerCase();
    } else {
      correct = selectedOption === currentExercise.correct;
    }

    setIsCorrect(correct);
    setShowResult(true);
    if (correct) {
      setScore(score + 1);
      toast.success("Правильный ответ! 🎉");
    } else {
      toast.error("Неправильно. Попробуйте ещё!");
    }
  };

  const nextExercise = () => {
    if (currentCategory && currentIndex < currentCategory.exercises.length - 1) {
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
    setCompleted(false);
  };

  const goBack = () => {
    setSelectedCategory(null);
    resetExercises();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Упражнения</h1>
          <p className="text-muted-foreground">Проверьте свои знания на практике</p>
        </div>

        {!selectedCategory ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {exerciseCategories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "group flex items-center gap-4 rounded-2xl bg-card p-6 text-left shadow-card transition-all duration-300",
                  "hover:shadow-xl hover:-translate-y-1 animate-fade-in"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-4xl">{category.icon}</span>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">{category.exercises.length} упражнений</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </button>
            ))}
          </div>
        ) : completed ? (
          <div className="mx-auto max-w-md text-center animate-fade-in">
            <div className="rounded-2xl bg-card p-8 shadow-card">
              <div className="mb-4 text-6xl">🎉</div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Поздравляем!</h2>
              <p className="text-muted-foreground mb-4">
                Вы завершили все упражнения
              </p>
              <div className="mb-6 rounded-xl bg-primary/10 p-4">
                <p className="text-3xl font-bold text-primary">
                  {score} / {currentCategory?.exercises.length}
                </p>
                <p className="text-sm text-muted-foreground">правильных ответов</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={goBack} className="flex-1">
                  Назад
                </Button>
                <Button onClick={resetExercises} className="flex-1">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Начать заново
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-2xl">
            <div className="mb-6 flex items-center justify-between">
              <button onClick={goBack} className="text-primary hover:underline">
                ← Назад
              </button>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  {currentIndex + 1} / {currentCategory?.exercises.length}
                </span>
                <div className="h-2 w-32 rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-300"
                    style={{
                      width: `${((currentIndex + 1) / (currentCategory?.exercises.length || 1)) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-card p-6 shadow-card animate-fade-in">
              {currentExercise?.type === "fill" ? (
                <div>
                  <h3 className="text-lg font-medium text-muted-foreground mb-4">
                    Заполните пропуск:
                  </h3>
                  <p className="text-2xl font-semibold text-foreground mb-2">
                    {currentExercise.sentence.replace("___", showResult ? `[${currentExercise.answer}]` : "___")}
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    💡 Подсказка: {currentExercise.hint}
                  </p>
                  
                  {!showResult ? (
                    <div className="flex gap-3">
                      <Input
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        placeholder="Введите ответ..."
                        className="flex-1 h-12"
                        onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
                      />
                      <Button onClick={checkAnswer} disabled={!userAnswer.trim()}>
                        Проверить
                      </Button>
                    </div>
                  ) : (
                    <div
                      className={cn(
                        "flex items-center gap-3 rounded-xl p-4",
                        isCorrect ? "bg-accent/20" : "bg-destructive/20"
                      )}
                    >
                      {isCorrect ? (
                        <CheckCircle2 className="h-6 w-6 text-accent" />
                      ) : (
                        <XCircle className="h-6 w-6 text-destructive" />
                      )}
                      <div>
                        <p className="font-medium text-foreground">
                          {isCorrect ? "Правильно!" : `Неправильно. Правильный ответ: ${currentExercise.answer}`}
                        </p>
                        <p className="text-sm text-muted-foreground">{currentExercise.uzbek}</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-medium text-muted-foreground mb-4">
                    Выберите правильный ответ:
                  </h3>
                  <p className="text-2xl font-semibold text-foreground mb-6">
                    {currentExercise?.question}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {currentExercise?.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => !showResult && setSelectedOption(index)}
                        disabled={showResult}
                        className={cn(
                          "w-full rounded-xl p-4 text-left transition-all duration-200",
                          showResult
                            ? index === currentExercise.correct
                              ? "bg-accent/20 border-2 border-accent"
                              : selectedOption === index
                              ? "bg-destructive/20 border-2 border-destructive"
                              : "bg-muted/50"
                            : selectedOption === index
                            ? "bg-primary/10 border-2 border-primary"
                            : "bg-muted/50 hover:bg-muted border-2 border-transparent"
                        )}
                      >
                        <span className="font-medium">{option}</span>
                      </button>
                    ))}
                  </div>

                  {!showResult ? (
                    <Button
                      onClick={checkAnswer}
                      disabled={selectedOption === null}
                      className="w-full"
                    >
                      Проверить
                    </Button>
                  ) : (
                    <div
                      className={cn(
                        "flex items-center gap-3 rounded-xl p-4",
                        isCorrect ? "bg-accent/20" : "bg-destructive/20"
                      )}
                    >
                      {isCorrect ? (
                        <CheckCircle2 className="h-6 w-6 text-accent" />
                      ) : (
                        <XCircle className="h-6 w-6 text-destructive" />
                      )}
                      <div>
                        <p className="font-medium text-foreground">
                          {isCorrect ? "Правильно!" : "Неправильно"}
                        </p>
                        <p className="text-sm text-muted-foreground">{currentExercise?.uzbek}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {showResult && (
                <Button onClick={nextExercise} className="w-full mt-4">
                  {currentIndex < (currentCategory?.exercises.length || 0) - 1
                    ? "Следующее упражнение"
                    : "Посмотреть результат"}
                </Button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Exercises;