import { useState } from "react";
import { Header } from "@/components/Header";
import { CheckCircle2, XCircle, Trophy, Clock, ChevronRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TestQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface Test {
  id: string;
  title: string;
  icon: string;
  description: string;
  timeLimit: number;
  questions: TestQuestion[];
}

const tests: Test[] = [
  // Тесты будут добавлены позже
];

const Tests = () => {
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const currentTest = tests.find((t) => t.id === selectedTest);

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Тесты</h1>
          <p className="text-muted-foreground">Проверьте свои знания и оцените результаты</p>
        </div>

        {!selectedTest ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tests.map((test, index) => (
              <div
                key={test.id}
                className={cn(
                  "group rounded-2xl bg-card p-6 shadow-card transition-all duration-300 animate-fade-in",
                  "hover:shadow-xl hover:-translate-y-1"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-4xl">{test.icon}</span>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {test.timeLimit} мин
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{test.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{test.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {test.questions.length} вопросов
                  </span>
                  <Button onClick={() => startTest(test.id)} size="sm">
                    Начать
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : showResults ? (
          <div className="mx-auto max-w-2xl animate-fade-in">
            <div className="rounded-2xl bg-card p-8 shadow-card text-center">
              <div className="mb-6">
                <Trophy className={cn(
                  "h-16 w-16 mx-auto mb-4",
                  getPercentage() >= 80 ? "text-yellow-500" : getPercentage() >= 60 ? "text-gray-400" : "text-orange-400"
                )} />
                <h2 className="text-2xl font-bold text-foreground mb-2">Тест завершён!</h2>
                <p className="text-muted-foreground">{currentTest?.title}</p>
              </div>

              <div className="mb-8 rounded-xl bg-muted/30 p-6">
                <div className="text-5xl font-bold text-primary mb-2">{getPercentage()}%</div>
                <p className="text-lg text-foreground">
                  {calculateScore()} / {currentTest?.questions.length} правильных ответов
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {getPercentage() >= 80
                    ? "🎉 Отличный результат!"
                    : getPercentage() >= 60
                    ? "👍 Хорошо, продолжайте!"
                    : "📚 Нужно больше практики"}
                </p>
              </div>

              <div className="space-y-3 mb-8 text-left">
                {currentTest?.questions.map((q, index) => (
                  <div
                    key={index}
                    className={cn(
                      "rounded-xl p-4",
                      answers[index] === q.correct ? "bg-accent/10" : "bg-destructive/10"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      {answers[index] === q.correct ? (
                        <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="font-medium text-foreground text-sm">{q.question}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {answers[index] !== q.correct && (
                            <span className="text-destructive">Ваш ответ: {q.options[answers[index]]} • </span>
                          )}
                          Правильный ответ: {q.options[q.correct]}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 italic">{q.explanation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={resetTest} className="flex-1">
                  Вернуться к тестам
                </Button>
                <Button onClick={() => startTest(selectedTest)} className="flex-1">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Пройти заново
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-2xl">
            <div className="mb-6 flex items-center justify-between">
              <button onClick={resetTest} className="text-primary hover:underline">
                ← Вернуться к тестам
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
                  width: `${((currentQuestion + 1) / (currentTest?.questions.length || 1)) * 100}%`,
                }}
              />
            </div>

            <div className="rounded-2xl bg-card p-6 shadow-card animate-fade-in">
              <h3 className="text-xl font-semibold text-foreground mb-6">
                {currentTest?.questions[currentQuestion].question}
              </h3>

              <div className="space-y-3 mb-6">
                {currentTest?.questions[currentQuestion].options.map((option, index) => (
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
                ))}
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  className="flex-1"
                >
                  Предыдущий
                </Button>
                <Button
                  onClick={nextQuestion}
                  disabled={answers[currentQuestion] === undefined}
                  className="flex-1"
                >
                  {currentQuestion === (currentTest?.questions.length || 0) - 1
                    ? "Завершить"
                    : "Следующий"}
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