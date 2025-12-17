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

export const exerciseCategories: ExerciseCategory[] = [
  {
    id: "cases",
    title: "Падежи",
    titleUz: "Kelishiklar",
    description: "Русские падежи и склонения",
    icon: "TableProperties",
    color: "text-blue-500",
    exercises: [
      // Beginner
      { id: "c1", type: "case", difficulty: "beginner", points: 10, word: "книга", originalForm: "книга", targetCase: "Родительный", answer: "книги", hint: "Кого? Чего?" },
      { id: "c2", type: "case", difficulty: "beginner", points: 10, word: "стол", originalForm: "стол", targetCase: "Предложный", answer: "столе", hint: "О ком? О чём? (на...)" },
      { id: "c3", type: "case", difficulty: "beginner", points: 10, word: "мама", originalForm: "мама", targetCase: "Дательный", answer: "маме", hint: "Кому? Чему?" },
      { id: "c4", type: "case", difficulty: "beginner", points: 10, word: "брат", originalForm: "брат", targetCase: "Винительный", answer: "брата", hint: "Кого? Что? (одуш.)" },
      { id: "c5", type: "case", difficulty: "beginner", points: 10, word: "ручка", originalForm: "ручка", targetCase: "Творительный", answer: "ручкой", hint: "Кем? Чем?" },
      // Intermediate
      { id: "c6", type: "case", difficulty: "intermediate", points: 15, word: "университет", originalForm: "университет", targetCase: "Предложный", answer: "университете", hint: "О ком? О чём? (в...)" },
      { id: "c7", type: "case", difficulty: "intermediate", points: 15, word: "преподаватель", originalForm: "преподаватель", targetCase: "Дательный", answer: "преподавателю", hint: "Кому? Чему?" },
      { id: "c8", type: "case", difficulty: "intermediate", points: 15, word: "лекция", originalForm: "лекция", targetCase: "Родительный", answer: "лекции", hint: "Кого? Чего?" },
      { id: "c9", type: "case", difficulty: "intermediate", points: 15, word: "студент", originalForm: "студент", targetCase: "Творительный", answer: "студентом", hint: "Кем? Чем?" },
      { id: "c10", type: "case", difficulty: "intermediate", points: 15, word: "экзамен", originalForm: "экзамен", targetCase: "Винительный", answer: "экзамен", hint: "Кого? Что? (неодуш.)" },
      // Advanced
      { id: "c11", type: "case", difficulty: "advanced", points: 20, word: "здание", originalForm: "здание", targetCase: "Родительный", answer: "здания", hint: "Кого? Чего?" },
      { id: "c12", type: "case", difficulty: "advanced", points: 20, word: "общежитие", originalForm: "общежитие", targetCase: "Предложный", answer: "общежитии", hint: "О ком? О чём?" },
      { id: "c13", type: "case", difficulty: "advanced", points: 20, word: "расписание", originalForm: "расписание", targetCase: "Дательный", answer: "расписанию", hint: "Кому? Чему?" },
      { id: "c14", type: "case", difficulty: "advanced", points: 20, word: "аудитория", originalForm: "аудитория", targetCase: "Творительный", answer: "аудиторией", hint: "Кем? Чем?" },
      { id: "c15", type: "case", difficulty: "advanced", points: 20, word: "специальность", originalForm: "специальность", targetCase: "Родительный", answer: "специальности", hint: "Кого? Чего?" },
    ],
  },
  {
    id: "verbs",
    title: "Глаголы",
    titleUz: "Fe'llar",
    description: "Спряжение глаголов",
    icon: "Zap",
    color: "text-orange-500",
    exercises: [
      // Beginner - Present tense
      { id: "v1", type: "conjugation", difficulty: "beginner", points: 10, verb: "читать", infinitive: "читать", pronoun: "я", tense: "настоящее", answer: "читаю" },
      { id: "v2", type: "conjugation", difficulty: "beginner", points: 10, verb: "писать", infinitive: "писать", pronoun: "ты", tense: "настоящее", answer: "пишешь" },
      { id: "v3", type: "conjugation", difficulty: "beginner", points: 10, verb: "говорить", infinitive: "говорить", pronoun: "он", tense: "настоящее", answer: "говорит" },
      { id: "v4", type: "conjugation", difficulty: "beginner", points: 10, verb: "работать", infinitive: "работать", pronoun: "мы", tense: "настоящее", answer: "работаем" },
      { id: "v5", type: "conjugation", difficulty: "beginner", points: 10, verb: "учиться", infinitive: "учиться", pronoun: "они", tense: "настоящее", answer: "учатся" },
      // Intermediate - Past tense
      { id: "v6", type: "conjugation", difficulty: "intermediate", points: 15, verb: "изучать", infinitive: "изучать", pronoun: "я (м)", tense: "прошедшее", answer: "изучал" },
      { id: "v7", type: "conjugation", difficulty: "intermediate", points: 15, verb: "понимать", infinitive: "понимать", pronoun: "она", tense: "прошедшее", answer: "понимала" },
      { id: "v8", type: "conjugation", difficulty: "intermediate", points: 15, verb: "объяснять", infinitive: "объяснять", pronoun: "он", tense: "прошедшее", answer: "объяснял" },
      { id: "v9", type: "conjugation", difficulty: "intermediate", points: 15, verb: "готовиться", infinitive: "готовиться", pronoun: "мы", tense: "прошедшее", answer: "готовились" },
      { id: "v10", type: "conjugation", difficulty: "intermediate", points: 15, verb: "сдавать", infinitive: "сдавать", pronoun: "вы", tense: "настоящее", answer: "сдаёте" },
      // Advanced - Future & Perfective
      { id: "v11", type: "conjugation", difficulty: "advanced", points: 20, verb: "прочитать", infinitive: "прочитать", pronoun: "я", tense: "будущее", answer: "прочитаю" },
      { id: "v12", type: "conjugation", difficulty: "advanced", points: 20, verb: "написать", infinitive: "написать", pronoun: "мы", tense: "будущее", answer: "напишем" },
      { id: "v13", type: "conjugation", difficulty: "advanced", points: 20, verb: "выучить", infinitive: "выучить", pronoun: "они", tense: "будущее", answer: "выучат" },
      { id: "v14", type: "conjugation", difficulty: "advanced", points: 20, verb: "защитить", infinitive: "защитить", pronoun: "он", tense: "будущее", answer: "защитит" },
      { id: "v15", type: "conjugation", difficulty: "advanced", points: 20, verb: "закончить", infinitive: "закончить", pronoun: "вы", tense: "будущее", answer: "закончите" },
    ],
  },
  {
    id: "academic",
    title: "Академический русский",
    titleUz: "Akademik rus tili",
    description: "Университетская лексика",
    icon: "GraduationCap",
    color: "text-purple-500",
    exercises: [
      // Fill exercises
      { id: "a1", type: "fill", difficulty: "beginner", points: 10, sentence: "Студенты ___ в университете.", answer: "учатся", hint: "o'qiydilar", uzbek: "Talabalar universitetda o'qiydilar.", explanation: "Глагол «учиться» - o'qimoq" },
      { id: "a2", type: "fill", difficulty: "beginner", points: 10, sentence: "Завтра у нас ___.", answer: "экзамен", hint: "imtihon", uzbek: "Ertaga bizda imtihon bor.", explanation: "Экзамен - imtihon" },
      { id: "a3", type: "fill", difficulty: "beginner", points: 10, sentence: "Я получил ___ по математике.", answer: "пятёрку", hint: "a'lo baho", uzbek: "Men matematikadan a'lo baho oldim.", explanation: "Пятёрка = 5 (a'lo baho)" },
      { id: "a4", type: "fill", difficulty: "intermediate", points: 15, sentence: "Профессор читает ___ по физике.", answer: "лекцию", hint: "ma'ruza", uzbek: "Professor fizikadan ma'ruza o'qiyapti.", explanation: "Лекция - ma'ruza" },
      { id: "a5", type: "fill", difficulty: "intermediate", points: 15, sentence: "Я пишу курсовую ___.", answer: "работу", hint: "ish", uzbek: "Men kurs ishini yozyapman.", explanation: "Курсовая работа - kurs ishi" },
      { id: "a6", type: "fill", difficulty: "intermediate", points: 15, sentence: "На факультете много ___ кафедр.", answer: "разных", hint: "turli", uzbek: "Fakultetda ko'p turli kafedralar bor.", explanation: "Разный - turli, xilma-xil" },
      { id: "a7", type: "fill", difficulty: "advanced", points: 20, sentence: "Диссертация была успешно ___.", answer: "защищена", hint: "himoya qilindi", uzbek: "Dissertatsiya muvaffaqiyatli himoya qilindi.", explanation: "Защитить диссертацию - dissertatsiyani himoya qilmoq" },
      { id: "a8", type: "fill", difficulty: "advanced", points: 20, sentence: "Научный ___ занимается исследованиями.", answer: "руководитель", hint: "rahbar", uzbek: "Ilmiy rahbar tadqiqotlar bilan shug'ullanadi.", explanation: "Научный руководитель - ilmiy rahbar" },
      // Choice exercises
      { id: "a9", type: "choice", difficulty: "beginner", points: 10, question: "Как называется место, где живут студенты?", options: ["Библиотека", "Общежитие", "Столовая", "Аудитория"], correct: 1, uzbek: "Yotoqxona", explanation: "Общежитие - talabalar yashash joyi" },
      { id: "a10", type: "choice", difficulty: "beginner", points: 10, question: "Что означает слово «зачёт»?", options: ["Imtihon", "Sinov", "Baho", "Stipendiya"], correct: 1, uzbek: "Sinov (zachyot)", explanation: "Зачёт - oraliq nazorat" },
      { id: "a11", type: "choice", difficulty: "intermediate", points: 15, question: "Что такое «диплом»?", options: ["Bakalavr ishi", "Magistrlik dissertatsiyasi", "Bitiruv malakaviy ishi", "Kurs ishi"], correct: 2, uzbek: "Diplom ishi", explanation: "Дипломная работа - BMI" },
      { id: "a12", type: "choice", difficulty: "intermediate", points: 15, question: "Кто такой «декан»?", options: ["Talaba", "Fakultet boshlig'i", "Rektor", "Laborant"], correct: 1, uzbek: "Dekan - fakultet boshlig'i", explanation: "Декан руководит факультетом" },
      { id: "a13", type: "choice", difficulty: "advanced", points: 20, question: "Что означает «аспирантура»?", options: ["Bakalavriatura", "Magistratura", "Doktorantura", "Kollej"], correct: 2, uzbek: "Aspirantura - doktorantura", explanation: "Аспирантура - oliy ta'limdan keyingi bosqich" },
      { id: "a14", type: "choice", difficulty: "advanced", points: 20, question: "Что такое «рецензия»?", options: ["Referat", "Taqriz", "Maqola", "Konspekt"], correct: 1, uzbek: "Retsenziya - taqriz", explanation: "Рецензия - ilmiy ishga taqriz" },
    ],
  },
  {
    id: "translation",
    title: "Перевод",
    titleUz: "Tarjima",
    description: "Русско-узбекский перевод",
    icon: "Languages",
    color: "text-green-500",
    exercises: [
      // Russian to Uzbek
      { id: "t1", type: "translate", difficulty: "beginner", points: 10, russian: "Здравствуйте!", uzbek: "Assalomu alaykum!", direction: "ru-uz", acceptedAnswers: ["assalomu alaykum", "salom", "assalomu aleykum"] },
      { id: "t2", type: "translate", difficulty: "beginner", points: 10, russian: "Спасибо большое", uzbek: "Katta rahmat", direction: "ru-uz", acceptedAnswers: ["katta rahmat", "rahmat", "katta raxmat"] },
      { id: "t3", type: "translate", difficulty: "beginner", points: 10, russian: "Как дела?", uzbek: "Ishlar qanday?", direction: "ru-uz", acceptedAnswers: ["ishlar qanday", "qanday ishlar", "yaxshimisiz", "qalaysiz"] },
      { id: "t4", type: "translate", difficulty: "intermediate", points: 15, russian: "Я студент университета", uzbek: "Men universitet talabisiman", direction: "ru-uz", acceptedAnswers: ["men universitet talabisiman", "men universitetda o'qiyman", "men talabaman"] },
      { id: "t5", type: "translate", difficulty: "intermediate", points: 15, russian: "Когда начинается лекция?", uzbek: "Ma'ruza qachon boshlanadi?", direction: "ru-uz", acceptedAnswers: ["ma'ruza qachon boshlanadi", "dars qachon boshlanadi", "maruza qachon boshlanadi"] },
      { id: "t6", type: "translate", difficulty: "intermediate", points: 15, russian: "Где находится библиотека?", uzbek: "Kutubxona qayerda joylashgan?", direction: "ru-uz", acceptedAnswers: ["kutubxona qayerda joylashgan", "kutubxona qayerda", "kutubxona qaerda"] },
      { id: "t7", type: "translate", difficulty: "advanced", points: 20, russian: "Я хочу написать научную статью", uzbek: "Men ilmiy maqola yozmoqchiman", direction: "ru-uz", acceptedAnswers: ["men ilmiy maqola yozmoqchiman", "ilmiy maqola yozmoqchiman", "men maqola yozmoqchiman"] },
      { id: "t8", type: "translate", difficulty: "advanced", points: 20, russian: "Защита диссертации состоится завтра", uzbek: "Dissertatsiya himoyasi ertaga bo'ladi", direction: "ru-uz", acceptedAnswers: ["dissertatsiya himoyasi ertaga bo'ladi", "ertaga dissertatsiya himoyasi", "dissertatsiya himoyasi ertaga"] },
      // Uzbek to Russian
      { id: "t9", type: "translate", difficulty: "beginner", points: 10, russian: "Доброе утро", uzbek: "Xayrli tong", direction: "uz-ru", acceptedAnswers: ["доброе утро", "добрoе утро"] },
      { id: "t10", type: "translate", difficulty: "beginner", points: 10, russian: "Пожалуйста", uzbek: "Iltimos / Marhamat", direction: "uz-ru", acceptedAnswers: ["пожалуйста", "пожалуста"] },
      { id: "t11", type: "translate", difficulty: "intermediate", points: 15, russian: "Я изучаю русский язык", uzbek: "Men rus tilini o'rganyapman", direction: "uz-ru", acceptedAnswers: ["я изучаю русский язык", "я учу русский язык", "я изучаю русский"] },
      { id: "t12", type: "translate", difficulty: "intermediate", points: 15, russian: "Расписание занятий", uzbek: "Dars jadvali", direction: "uz-ru", acceptedAnswers: ["расписание занятий", "расписание", "расписание уроков"] },
      { id: "t13", type: "translate", difficulty: "advanced", points: 20, russian: "Научно-исследовательская работа", uzbek: "Ilmiy-tadqiqot ishi", direction: "uz-ru", acceptedAnswers: ["научно-исследовательская работа", "научная работа", "исследовательская работа"] },
      { id: "t14", type: "translate", difficulty: "advanced", points: 20, russian: "Высшее образование", uzbek: "Oliy ta'lim", direction: "uz-ru", acceptedAnswers: ["высшее образование", "высшее обучение"] },
    ],
  },
  {
    id: "sentences",
    title: "Предложения",
    titleUz: "Gaplar",
    description: "Построение предложений",
    icon: "MessageSquare",
    color: "text-pink-500",
    exercises: [
      { id: "s1", type: "fill", difficulty: "beginner", points: 10, sentence: "Меня ___ Алишер.", answer: "зовут", hint: "ismim", uzbek: "Mening ismim Alisher.", explanation: "«Меня зовут» = Mening ismim" },
      { id: "s2", type: "fill", difficulty: "beginner", points: 10, sentence: "Я ___ из Узбекистана.", answer: "приехал", hint: "keldim", uzbek: "Men O'zbekistondan keldim.", explanation: "Приехать - kelmoq" },
      { id: "s3", type: "fill", difficulty: "beginner", points: 10, sentence: "Сегодня ___ погода.", answer: "хорошая", hint: "yaxshi", uzbek: "Bugun ob-havo yaxshi.", explanation: "Хороший - yaxshi" },
      { id: "s4", type: "fill", difficulty: "intermediate", points: 15, sentence: "Мне нужно ___ домашнее задание.", answer: "сделать", hint: "bajarish", uzbek: "Men uy vazifasini bajarishim kerak.", explanation: "Сделать домашнее задание - uy vazifasini bajarmoq" },
      { id: "s5", type: "fill", difficulty: "intermediate", points: 15, sentence: "Вы ___ по-русски?", answer: "говорите", hint: "gaplashasizmi", uzbek: "Siz ruscha gaplashasizmi?", explanation: "Говорить - gapirmoq" },
      { id: "s6", type: "fill", difficulty: "intermediate", points: 15, sentence: "Он хорошо ___ математику.", answer: "знает", hint: "biladi", uzbek: "U matematikani yaxshi biladi.", explanation: "Знать - bilmoq" },
      { id: "s7", type: "fill", difficulty: "advanced", points: 20, sentence: "Если бы я ___ больше времени, я бы прочитал эту книгу.", answer: "имел", hint: "bo'lganida", uzbek: "Agar ko'proq vaqtim bo'lganida, bu kitobni o'qigan bo'lardim.", explanation: "Условное наклонение - shart mayli" },
      { id: "s8", type: "fill", difficulty: "advanced", points: 20, sentence: "Несмотря на трудности, студенты ___ сдали экзамен.", answer: "успешно", hint: "muvaffaqiyatli", uzbek: "Qiyinchiliklarga qaramay, talabalar imtihonni muvaffaqiyatli topshirdilar.", explanation: "Успешно - muvaffaqiyatli" },
      { id: "s9", type: "choice", difficulty: "beginner", points: 10, question: "Правильный порядок слов:", options: ["Читаю я книгу", "Я книгу читаю", "Я читаю книгу", "Книгу я читаю"], correct: 2, uzbek: "Men kitob o'qiyman", explanation: "Стандартный порядок: Подлежащее + Сказуемое + Дополнение" },
      { id: "s10", type: "choice", difficulty: "intermediate", points: 15, question: "Какой вариант правильный?", options: ["Мне нравится музыка", "Я нравлюсь музыка", "Музыка нравится мне", "Я нравится музыке"], correct: 0, uzbek: "Menga musiqa yoqadi", explanation: "Конструкция: Кому + нравится + что" },
      { id: "s11", type: "choice", difficulty: "advanced", points: 20, question: "Выберите правильное продолжение: «Чем больше я учусь, ...»", options: ["тем больше я знаю", "тогда больше я знаю", "потому что больше я знаю", "если больше я знаю"], correct: 0, uzbek: "Qanchalik ko'p o'qisam, shunchalik ko'p bilaman", explanation: "Конструкция: Чем..., тем..." },
    ],
  },
];

export const getDifficultyLabel = (difficulty: string): string => {
  switch (difficulty) {
    case "beginner": return "Boshlang'ich";
    case "intermediate": return "O'rta";
    case "advanced": return "Yuqori";
    default: return difficulty;
  }
};

export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty) {
    case "beginner": return "bg-green-500/10 text-green-600 border-green-500/30";
    case "intermediate": return "bg-amber-500/10 text-amber-600 border-amber-500/30";
    case "advanced": return "bg-red-500/10 text-red-600 border-red-500/30";
    default: return "bg-muted text-muted-foreground";
  }
};
