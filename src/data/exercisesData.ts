export type ExerciseType = "fill" | "choice" | "translate" | "case" | "conjugation";

export interface BaseExercise {
  id: string;
  type: ExerciseType;
  difficulty: "beginner" | "intermediate" | "advanced";
  points: number;
}

export interface FillExercise extends BaseExercise {
  type: "fill";
  sentence: string;
  answer: string;
  hint: string;
  uzbek: string;
  explanation?: string;
}

export interface ChoiceExercise extends BaseExercise {
  type: "choice";
  question: string;
  options: string[];
  correct: number;
  uzbek: string;
  explanation?: string;
}

export interface TranslateExercise extends BaseExercise {
  type: "translate";
  russian: string;
  uzbek: string;
  direction: "ru-uz" | "uz-ru";
  acceptedAnswers: string[];
}

export interface CaseExercise extends BaseExercise {
  type: "case";
  word: string;
  originalForm: string;
  targetCase: string;
  answer: string;
  hint: string;
}

export interface ConjugationExercise extends BaseExercise {
  type: "conjugation";
  verb: string;
  infinitive: string;
  pronoun: string;
  tense: string;
  answer: string;
}

export type Exercise = FillExercise | ChoiceExercise | TranslateExercise | CaseExercise | ConjugationExercise;

export interface ExerciseCategory {
  id: string;
  title: string;
  titleUz: string;
  description: string;
  icon: string;
  color: string;
  exercises: Exercise[];
}

export const exerciseCategories: ExerciseCategory[] = [];

export const getDifficultyLabel = (difficulty: string): string => {
  switch (difficulty) {
    case "beginner":
      return "Boshlang'ich";
    case "intermediate":
      return "O'rta";
    case "advanced":
      return "Yuqori";
    default:
      return difficulty;
  }
};

export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty) {
    case "beginner":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "intermediate":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "advanced":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
