import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, RotateCcw, Trophy, Volume2 } from "lucide-react";
import { VocabularyCategory, Word } from "@/data/vocabularyData";

interface VocabularyQuizProps {
  category: VocabularyCategory;
  onBack: () => void;
}

type QuizMode = "ru-uz" | "uz-ru";

interface Question {
  word: Word;
  options: string[];
  correctAnswer: string;
}

export const VocabularyQuiz = ({ category, onBack }: VocabularyQuizProps) => {
  const [mode, setMode] = useState<QuizMode>("ru-uz");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ru-RU";
    speechSynthesis.speak(utterance);
  };

  const generateQuestions = () => {
    const words = [...category.words];
    const shuffled = words.sort(() => Math.random() - 0.5).slice(0, Math.min(10, words.length));
    
    const newQuestions: Question[] = shuffled.map((word) => {
      const correctAnswer = mode === "ru-uz" ? word.uzbek : word.russian;
      const otherWords = category.words
        .filter((w) => w.russian !== word.russian)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((w) => (mode === "ru-uz" ? w.uzbek : w.russian));
      
      const options = [...otherWords, correctAnswer].sort(() => Math.random() - 0.5);
      
      return { word, options, correctAnswer };
    });
    
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setIsAnswered(false);
  };

  useEffect(() => {
    generateQuestions();
  }, [category, mode]);

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);
    
    if (answer === questions[currentIndex].correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const currentQuestion = questions[currentIndex];

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="animate-fade-in">
        <button onClick={onBack} className="mb-6 flex items-center gap-2 text-primary hover:underline">
          ← Вернуться к категориям
        </button>
        
        <div className="glass-section rounded-2xl p-8 text-center max-w-md mx-auto">
          <Trophy className={cn(
            "h-20 w-20 mx-auto mb-4",
            percentage >= 80 ? "text-yellow-500" : percentage >= 50 ? "text-primary" : "text-muted-foreground"
          )} />
          
          <h2 className="text-2xl font-bold text-foreground mb-2">Результат</h2>
          <p className="text-4xl font-bold text-primary mb-2">{score} / {questions.length}</p>
          <p className="text-muted-foreground mb-6">{percentage}% правильных ответов</p>
          
          {percentage >= 80 && <p className="text-green-500 font-medium mb-4">Отлично! 🎉</p>}
          {percentage >= 50 && percentage < 80 && <p className="text-yellow-500 font-medium mb-4">Хороший результат! 👍</p>}
          {percentage < 50 && <p className="text-orange-500 font-medium mb-4">Попробуйте ещё раз! 💪</p>}
          
          <Button onClick={generateQuestions} className="w-full gap-2">
            <RotateCcw className="h-4 w-4" />
            Начать заново
          </Button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return <div className="text-center text-muted-foreground">Загрузка...</div>;
  }

  return (
    <div className="animate-fade-in">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-primary hover:underline">
        ← Вернуться к категориям
      </button>

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-2xl">
            {category.icon}
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">{category.name}</h2>
            <p className="text-sm text-muted-foreground">Викторина</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={mode === "ru-uz" ? "default" : "outline"}
            onClick={() => setMode("ru-uz")}
          >
            RU → UZ
          </Button>
          <Button
            size="sm"
            variant={mode === "uz-ru" ? "default" : "outline"}
            onClick={() => setMode("uz-ru")}
          >
            UZ → RU
          </Button>
        </div>
      </div>

      <div className="glass-section rounded-2xl p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-muted-foreground">
            Вопрос {currentIndex + 1} из {questions.length}
          </span>
          <span className="text-sm font-medium text-primary">
            Счёт: {score}
          </span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2 mb-6">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <p className="text-2xl font-bold text-foreground">
              {mode === "ru-uz" ? currentQuestion.word.russian : currentQuestion.word.uzbek}
            </p>
            {mode === "ru-uz" && (
              <button
                onClick={() => speak(currentQuestion.word.russian)}
                className="rounded-full bg-primary/10 p-2 text-primary transition-colors hover:bg-primary/20"
              >
                <Volume2 className="h-4 w-4" />
              </button>
            )}
          </div>
          {mode === "ru-uz" && (
            <p className="text-sm text-muted-foreground">({currentQuestion.word.pronunciation})</p>
          )}
        </div>

        <div className="grid gap-3">
          {currentQuestion.options.map((option, index) => {
            const isCorrect = option === currentQuestion.correctAnswer;
            const isSelected = selectedAnswer === option;
            
            return (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={isAnswered}
                className={cn(
                  "w-full p-4 rounded-xl text-left font-medium transition-all duration-200",
                  "border-2",
                  !isAnswered && "hover:border-primary hover:bg-primary/5",
                  !isAnswered && "border-border bg-background",
                  isAnswered && isCorrect && "border-green-500 bg-green-500/10",
                  isAnswered && isSelected && !isCorrect && "border-red-500 bg-red-500/10",
                  isAnswered && !isSelected && !isCorrect && "border-border bg-background opacity-50"
                )}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {isAnswered && isCorrect && <CheckCircle className="h-5 w-5 text-green-500" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-500" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {isAnswered && (
        <Button onClick={handleNext} className="w-full">
          {currentIndex < questions.length - 1 ? "Следующий вопрос" : "Показать результат"}
        </Button>
      )}
    </div>
  );
};
