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
    id: "lesson1-phonetics",
    title: "Фонетика и орфоэпия",
    titleUz: "Fonetika va orfoepiya",
    description: "Урок 1: Фонетические и орфоэпические нормы",
    icon: "Volume2",
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
    exercises: [
      { id: "l1-1", type: "choice", difficulty: "beginner", points: 10, question: "Какой вариант ударения правильный?", options: ["кОмпас", "компАс", "кОмПас", "компаС"], correct: 0, uzbek: "Qaysi urg'u to'g'ri?", explanation: "Литературный вариант - кОмпас" },
      { id: "l1-2", type: "choice", difficulty: "beginner", points: 10, question: "Как правильно произносить слово 'договор'?", options: ["дОговор", "договОр", "догОвор", "договоР"], correct: 1, uzbek: "Договор so'zini qanday talaffuz qilish kerak?", explanation: "Правильное ударение - договОр" },
      { id: "l1-3", type: "choice", difficulty: "beginner", points: 10, question: "Какое правильное ударение в слове 'квартал'?", options: ["квАртал", "квартАл", "квАрТал", "кварТал"], correct: 1, uzbek: "Kvartал so'zida urg'u qayerda?", explanation: "Правильное ударение - квартАл" },
      { id: "l1-4", type: "choice", difficulty: "intermediate", points: 15, question: "Выберите слово с мягким произношением согласного перед Е:", options: ["бутерброд", "компетентный", "бизнес", "рейтинг"], correct: 1, uzbek: "E oldida yumshoq undosh bilan talaffuz qilinadigan so'zni tanlang", explanation: "Компетентный - мягкий согласный перед Е" },
      { id: "l1-5", type: "choice", difficulty: "intermediate", points: 15, question: "В каком слове произносится [шн]?", options: ["булочная", "конечно", "точный", "срочный"], correct: 1, uzbek: "Qaysi so'zda [шн] talaffuz qilinadi?", explanation: "Конечно произносится как [канешна]" },
      { id: "l1-6", type: "fill", difficulty: "beginner", points: 10, sentence: "Меня зовут ___. Я родился в Узбекистане.", answer: "Анвар", hint: "ism", uzbek: "Mening ismim ___. Men O'zbekistonda tug'ilganman.", explanation: "Заполните имя" },
      { id: "l1-7", type: "fill", difficulty: "beginner", points: 10, sentence: "Я живу с родителями в небольшой ___ на берегу озера.", answer: "деревне", hint: "qishloq", uzbek: "Men ota-onam bilan ko'l qirg'og'idagi kichik ___da yashayman.", explanation: "Деревня - qishloq" },
      { id: "l1-8", type: "fill", difficulty: "intermediate", points: 15, sentence: "Я хочу стать ___, так как экономика влияет на развитие государства.", answer: "экономистом", hint: "iqtisodchi", uzbek: "Men ___ bo'lmoqchiman, chunki iqtisodiyot davlat rivojlanishiga ta'sir qiladi.", explanation: "Творительный падеж: экономист → экономистом" },
    ],
  },
  {
    id: "lesson2-cases",
    title: "Именительный и Предложный падежи",
    titleUz: "Bosh va Jo'nalish kelishiklari",
    description: "Урок 2: Формы Им.п. и П.п.",
    icon: "TableProperties",
    color: "bg-gradient-to-br from-green-500 to-emerald-600",
    exercises: [
      { id: "l2-1", type: "case", difficulty: "beginner", points: 10, word: "шприц", originalForm: "шприц", targetCase: "Предложный", answer: "шприце", hint: "О ком? О чём?" },
      { id: "l2-2", type: "case", difficulty: "beginner", points: 10, word: "врач", originalForm: "врач", targetCase: "Предложный", answer: "враче", hint: "О ком? О чём?" },
      { id: "l2-3", type: "case", difficulty: "beginner", points: 10, word: "инъекция", originalForm: "инъекция", targetCase: "Предложный", answer: "инъекции", hint: "О ком? О чём?" },
      { id: "l2-4", type: "case", difficulty: "beginner", points: 10, word: "палата", originalForm: "палата", targetCase: "Предложный", answer: "палате", hint: "О ком? О чём?" },
      { id: "l2-5", type: "case", difficulty: "intermediate", points: 15, word: "санаторий", originalForm: "санаторий", targetCase: "Предложный", answer: "санатории", hint: "О ком? О чём?" },
      { id: "l2-6", type: "choice", difficulty: "beginner", points: 10, question: "Сколько падежей в русском языке?", options: ["4", "5", "6", "7"], correct: 2, uzbek: "Rus tilida nechta kelishik bor?", explanation: "В русском языке 6 падежей" },
      { id: "l2-7", type: "choice", difficulty: "beginner", points: 10, question: "Какой падеж отвечает на вопрос 'О ком? О чём?'", options: ["Родительный", "Дательный", "Творительный", "Предложный"], correct: 3, uzbek: "Qaysi kelishik 'Kim haqida? Nima haqida?' savollariga javob beradi?", explanation: "Предложный падеж отвечает на вопросы: О ком? О чём?" },
      { id: "l2-8", type: "fill", difficulty: "beginner", points: 10, sentence: "Я живу в (дом) ___.", answer: "доме", hint: "uyda", uzbek: "Men (uy) ___da yashayman.", explanation: "Предложный падеж: дом → в доме" },
      { id: "l2-9", type: "fill", difficulty: "intermediate", points: 15, sentence: "Мы учимся в (университет) ___.", answer: "университете", hint: "universitetda", uzbek: "Biz (universitet) ___da o'qiymiz.", explanation: "Предложный падеж: университет → в университете" },
      { id: "l2-10", type: "fill", difficulty: "intermediate", points: 15, sentence: "Книга лежит на (стол) ___.", answer: "столе", hint: "stolda", uzbek: "Kitob (stol) ___da yotibdi.", explanation: "Предложный падеж: стол → на столе" },
    ],
  },
  {
    id: "lesson3-genitive-accusative",
    title: "Родительный и Винительный падежи",
    titleUz: "Qaratqich va Tushum kelishiklari",
    description: "Урок 3: Формы Р.п. и В.п.",
    icon: "Shuffle",
    color: "bg-gradient-to-br from-purple-500 to-violet-600",
    exercises: [
      { id: "l3-1", type: "fill", difficulty: "beginner", points: 10, sentence: "Добраться ___ города.", answer: "до", hint: "gacha", uzbek: "Shahargacha yetib borish.", explanation: "Предлог ДО + Родительный падеж" },
      { id: "l3-2", type: "fill", difficulty: "beginner", points: 10, sentence: "Получить письмо ___ брата.", answer: "от", hint: "-dan", uzbek: "Akadan xat olish.", explanation: "Предлог ОТ + Родительный падеж" },
      { id: "l3-3", type: "fill", difficulty: "beginner", points: 10, sentence: "Выйти ___ автобуса.", answer: "из", hint: "-dan", uzbek: "Avtobusdan tushish.", explanation: "Предлог ИЗ + Родительный падеж" },
      { id: "l3-4", type: "fill", difficulty: "intermediate", points: 15, sentence: "Цветы ___ девушки.", answer: "для", hint: "uchun", uzbek: "Qiz uchun gullar.", explanation: "Предлог ДЛЯ + Родительный падеж" },
      { id: "l3-5", type: "fill", difficulty: "intermediate", points: 15, sentence: "Кофе ___ молока.", answer: "без", hint: "-siz", uzbek: "Sutsiz kofe.", explanation: "Предлог БЕЗ + Родительный падеж" },
      { id: "l3-6", type: "choice", difficulty: "beginner", points: 10, question: "Какой предлог используется для обозначения места?", options: ["для", "у", "без", "от"], correct: 1, uzbek: "Joy bildirish uchun qaysi predlog ishlatiladi?", explanation: "Предлог У обозначает место: у дома, у озера" },
      { id: "l3-7", type: "choice", difficulty: "intermediate", points: 15, question: "На какой вопрос отвечает родительный падеж?", options: ["Кого? Что?", "Кому? Чему?", "Кого? Чего?", "Кем? Чем?"], correct: 2, uzbek: "Qaratqich kelishik qanday savolga javob beradi?", explanation: "Родительный падеж: Кого? Чего?" },
      { id: "l3-8", type: "fill", difficulty: "beginner", points: 10, sentence: "Недалеко ___ дома есть магазин.", answer: "от", hint: "-dan", uzbek: "Uydan uzoq bo'lmagan joyda do'kon bor.", explanation: "Недалеко от + Р.п." },
      { id: "l3-9", type: "fill", difficulty: "intermediate", points: 15, sentence: "После (концерт) ___ мы пошли домой.", answer: "концерта", hint: "kontsertdan keyin", uzbek: "Kontsertdan keyin biz uyga ketdik.", explanation: "После + Родительный падеж" },
      { id: "l3-10", type: "case", difficulty: "beginner", points: 10, word: "книга", originalForm: "книга", targetCase: "Родительный", answer: "книги", hint: "Кого? Чего?" },
      { id: "l3-11", type: "case", difficulty: "beginner", points: 10, word: "стол", originalForm: "стол", targetCase: "Родительный", answer: "стола", hint: "Кого? Чего?" },
      { id: "l3-12", type: "case", difficulty: "intermediate", points: 15, word: "университет", originalForm: "университет", targetCase: "Родительный", answer: "университета", hint: "Кого? Чего?" },
    ],
  },
  {
    id: "lesson4-dative-instrumental",
    title: "Дательный и Творительный падежи",
    titleUz: "Jo'nalish va Vosita kelishiklari",
    description: "Урок 4: Формы Д.п. и Тв.п.",
    icon: "ArrowRightLeft",
    color: "bg-gradient-to-br from-orange-500 to-amber-500",
    exercises: [
      { id: "l4-1", type: "case", difficulty: "beginner", points: 10, word: "автомобиль", originalForm: "автомобиль", targetCase: "Дательный", answer: "автомобилю", hint: "Кому? Чему?" },
      { id: "l4-2", type: "case", difficulty: "beginner", points: 10, word: "жизнь", originalForm: "жизнь", targetCase: "Дательный", answer: "жизни", hint: "Кому? Чему?" },
      { id: "l4-3", type: "case", difficulty: "beginner", points: 10, word: "врач", originalForm: "врач", targetCase: "Дательный", answer: "врачу", hint: "Кому? Чему?" },
      { id: "l4-4", type: "case", difficulty: "intermediate", points: 15, word: "болезнь", originalForm: "болезнь", targetCase: "Дательный", answer: "болезни", hint: "Кому? Чему?" },
      { id: "l4-5", type: "fill", difficulty: "beginner", points: 10, sentence: "Я помог (пожилая женщина) ___ перейти через дорогу.", answer: "пожилой женщине", hint: "keksa ayolga", uzbek: "Men (keksa ayol) ___ga yo'lni kesib o'tishda yordam berdim.", explanation: "Дательный падеж" },
      { id: "l4-6", type: "fill", difficulty: "beginner", points: 10, sentence: "Декан разрешил (студент) ___ сдавать экзамен.", answer: "студенту", hint: "talabaga", uzbek: "Dekan (talaba) ___ga imtihon topshirishga ruxsat berdi.", explanation: "Дательный падеж: студент → студенту" },
      { id: "l4-7", type: "fill", difficulty: "intermediate", points: 15, sentence: "Я обещал (моя мама) ___ приехать через месяц.", answer: "моей маме", hint: "onamga", uzbek: "Men (onam) ___ga bir oydan keyin kelishga va'da berdim.", explanation: "Дательный падеж" },
      { id: "l4-8", type: "choice", difficulty: "beginner", points: 10, question: "На какой вопрос отвечает дательный падеж?", options: ["Кого? Чего?", "Кому? Чему?", "Кем? Чем?", "О ком? О чём?"], correct: 1, uzbek: "Jo'nalish kelishik qaysi savolga javob beradi?", explanation: "Дательный падеж: Кому? Чему?" },
      { id: "l4-9", type: "choice", difficulty: "intermediate", points: 15, question: "Какой предлог употребляется с дательным падежом?", options: ["от", "к", "из", "о"], correct: 1, uzbek: "Jo'nalish kelishik bilan qaysi predlog ishlatiladi?", explanation: "Предлог К употребляется с дательным падежом" },
      { id: "l4-10", type: "fill", difficulty: "intermediate", points: 15, sentence: "Мы ехали ___ (вокзал) очень медленно.", answer: "к вокзалу", hint: "vokzalga", uzbek: "Biz ___ga juda sekin bordik.", explanation: "Предлог К + Дательный падеж" },
    ],
  },
  {
    id: "lesson5-verbs",
    title: "Глаголы движения",
    titleUz: "Harakat fe'llari",
    description: "Урок 5: Глаголы, их формы и управление",
    icon: "Zap",
    color: "bg-gradient-to-br from-red-500 to-rose-600",
    exercises: [
      { id: "l5-1", type: "choice", difficulty: "beginner", points: 10, question: "Какой глагол обозначает движение в одном направлении?", options: ["ходить", "идти", "бегать", "летать"], correct: 1, uzbek: "Qaysi fe'l bir tomonga harakatni bildiradi?", explanation: "Идти - однонаправленное движение" },
      { id: "l5-2", type: "choice", difficulty: "beginner", points: 10, question: "Какой глагол обозначает разнонаправленное движение?", options: ["ехать", "бежать", "ездить", "плыть"], correct: 2, uzbek: "Qaysi fe'l turli tomonga harakatni bildiradi?", explanation: "Ездить - разнонаправленное движение" },
      { id: "l5-3", type: "fill", difficulty: "beginner", points: 10, sentence: "Он ___ на работу каждый день.", answer: "ходит", hint: "boradi", uzbek: "U har kuni ishga ___.", explanation: "Ходить - регулярное действие" },
      { id: "l5-4", type: "fill", difficulty: "beginner", points: 10, sentence: "Сейчас я ___ домой.", answer: "иду", hint: "ketyapman", uzbek: "Hozir men uyga ___.", explanation: "Идти - движение в момент речи" },
      { id: "l5-5", type: "fill", difficulty: "intermediate", points: 15, sentence: "Каждое лето мы ___ на море.", answer: "ездим", hint: "boramiz", uzbek: "Har yoz biz dengizga ___.", explanation: "Ездить - регулярные поездки" },
      { id: "l5-6", type: "conjugation", difficulty: "beginner", points: 10, verb: "идти", infinitive: "идти", pronoun: "я", tense: "настоящее", answer: "иду" },
      { id: "l5-7", type: "conjugation", difficulty: "beginner", points: 10, verb: "ходить", infinitive: "ходить", pronoun: "мы", tense: "настоящее", answer: "ходим" },
      { id: "l5-8", type: "conjugation", difficulty: "intermediate", points: 15, verb: "ехать", infinitive: "ехать", pronoun: "они", tense: "настоящее", answer: "едут" },
      { id: "l5-9", type: "conjugation", difficulty: "intermediate", points: 15, verb: "бежать", infinitive: "бежать", pronoun: "он", tense: "настоящее", answer: "бежит" },
      { id: "l5-10", type: "choice", difficulty: "intermediate", points: 15, question: "Сколько пар глаголов движения в русском языке?", options: ["10", "15", "17", "20"], correct: 2, uzbek: "Rus tilida necha juft harakat fe'li bor?", explanation: "В русском языке 17 пар глаголов движения" },
    ],
  },
  {
    id: "lesson6-subject-predicate",
    title: "Подлежащее и сказуемое",
    titleUz: "Ega va kesim",
    description: "Урок 6: Субъектно-предикатные отношения",
    icon: "FileText",
    color: "bg-gradient-to-br from-indigo-500 to-indigo-600",
    exercises: [
      { id: "l6-1", type: "choice", difficulty: "beginner", points: 10, question: "Что такое подлежащее?", options: ["Второстепенный член", "Главный член предложения", "Часть сказуемого", "Дополнение"], correct: 1, uzbek: "Ega nima?", explanation: "Подлежащее - главный член предложения" },
      { id: "l6-2", type: "choice", difficulty: "beginner", points: 10, question: "На какие вопросы отвечает подлежащее?", options: ["Что делать?", "Какой?", "Кто? Что?", "Где?"], correct: 2, uzbek: "Ega qanday savollarga javob beradi?", explanation: "Подлежащее отвечает на вопросы Кто? Что?" },
      { id: "l6-3", type: "fill", difficulty: "beginner", points: 10, sentence: "___ - столица Каракалпакстана.", answer: "Нукус", hint: "shahar nomi", uzbek: "___ - Qoraqalpog'iston poytaxti.", explanation: "Нукус является подлежащим" },
      { id: "l6-4", type: "fill", difficulty: "intermediate", points: 15, sentence: "Память о великих предках для нас ___.", answer: "священна", hint: "muqaddas", uzbek: "Buyuk ajdodlar haqidagi xotira biz uchun ___.", explanation: "Священна - краткое прилагательное" },
      { id: "l6-5", type: "choice", difficulty: "intermediate", points: 15, question: "Чем может быть выражено подлежащее?", options: ["Только существительным", "Только местоимением", "Существительным или местоимением", "Глаголом"], correct: 2, uzbek: "Ega nima bilan ifodalanishi mumkin?", explanation: "Подлежащее чаще всего выражается существительным или местоимением" },
      { id: "l6-6", type: "fill", difficulty: "beginner", points: 10, sentence: "Семеро одного не ___.", answer: "ждут", hint: "kutmaydi", uzbek: "Yettita bitta kishi ___.", explanation: "Пословица: Семеро одного не ждут" },
    ],
  },
  {
    id: "lesson7-complex-sentences",
    title: "Сложные предложения",
    titleUz: "Qo'shma gaplar",
    description: "Урок 7: Объектно-изъяснительные отношения",
    icon: "GitBranch",
    color: "bg-gradient-to-br from-teal-500 to-cyan-600",
    exercises: [
      { id: "l7-1", type: "fill", difficulty: "beginner", points: 10, sentence: "Учитель попросил учеников, ___ они подготовили доклады.", answer: "чтобы", hint: "uchun", uzbek: "O'qituvchi o'quvchilardan ___ ma'ruzalar tayyorlashni so'radi.", explanation: "Союз ЧТОБЫ выражает цель" },
      { id: "l7-2", type: "fill", difficulty: "beginner", points: 10, sentence: "Я не знал, ___ сегодня будет собрание.", answer: "что", hint: "qaerda", uzbek: "Men ___ bugun yig'ilish bo'lishini bilmasdim.", explanation: "Союз ЧТО для изъяснения" },
      { id: "l7-3", type: "choice", difficulty: "intermediate", points: 15, question: "Какой союз выражает желание или приказ?", options: ["что", "чтобы", "когда", "если"], correct: 1, uzbek: "Qaysi bog'lovchi xohish yoki buyruqni ifodalaydi?", explanation: "Союз ЧТОБЫ выражает желание или приказ" },
      { id: "l7-4", type: "fill", difficulty: "intermediate", points: 15, sentence: "Преподаватель сказал, ___ завтра будет экзамен.", answer: "что", hint: "nima", uzbek: "O'qituvchi ___ ertaga imtihon bo'lishini aytdi.", explanation: "Союз ЧТО для передачи информации" },
      { id: "l7-5", type: "fill", difficulty: "intermediate", points: 15, sentence: "Мама попросила, ___ я купил хлеб.", answer: "чтобы", hint: "uchun", uzbek: "Onam ___ non sotib olishimni so'radi.", explanation: "Союз ЧТОБЫ после глаголов просьбы" },
      { id: "l7-6", type: "choice", difficulty: "beginner", points: 10, question: "На какие вопросы отвечают придаточные изъяснительные?", options: ["Где? Куда?", "Когда?", "Косвенных падежей", "Почему?"], correct: 2, uzbek: "Izohlovchi ergash gaplar qanday savollarga javob beradi?", explanation: "Придаточные изъяснительные отвечают на вопросы косвенных падежей" },
    ],
  },
  {
    id: "lesson8-time-expressions",
    title: "Выражение времени",
    titleUz: "Vaqt ifodalash",
    description: "Урок 8: Временные значения",
    icon: "Clock",
    color: "bg-gradient-to-br from-pink-500 to-rose-500",
    exercises: [
      { id: "l8-1", type: "fill", difficulty: "beginner", points: 10, sentence: "___ появления законодательных актов...", answer: "До", hint: "gacha", uzbek: "___ qonunchilik hujjatlari paydo bo'lguniga qadar...", explanation: "Предлог ДО обозначает время" },
      { id: "l8-2", type: "fill", difficulty: "beginner", points: 10, sentence: "___ конца XIX века...", answer: "С", hint: "-dan", uzbek: "___ XIX asr oxiridan...", explanation: "Предлог С обозначает начало времени" },
      { id: "l8-3", type: "fill", difficulty: "intermediate", points: 15, sentence: "___ судебного заседания все были внимательны.", answer: "Во время", hint: "davomida", uzbek: "___ sud majlisi davomida hamma diqqatli edi.", explanation: "Во время + Р.п. обозначает одновременность" },
      { id: "l8-4", type: "choice", difficulty: "beginner", points: 10, question: "Какой предлог обозначает время до события?", options: ["после", "до", "во время", "при"], correct: 1, uzbek: "Qaysi predlog voqeadan oldingi vaqtni bildiradi?", explanation: "Предлог ДО обозначает время до события" },
      { id: "l8-5", type: "choice", difficulty: "intermediate", points: 15, question: "Какой предлог используется с родительным падежом для времени?", options: ["в", "на", "до", "к"], correct: 2, uzbek: "Qaratqich kelishik bilan vaqt uchun qaysi predlog ishlatiladi?", explanation: "ДО + Родительный падеж" },
      { id: "l8-6", type: "fill", difficulty: "intermediate", points: 15, sentence: "___ того, как криминалистика открыла новые методы, она стала развиваться.", answer: "После", hint: "keyin", uzbek: "___ kriminalistika yangi usullarni kashf qilgandan keyin, u rivojlana boshladi.", explanation: "После того, как... - временной союз" },
    ],
  },
  {
    id: "translation-practice",
    title: "Перевод",
    titleUz: "Tarjima mashqlari",
    description: "Русско-узбекский перевод",
    icon: "Languages",
    color: "bg-gradient-to-br from-emerald-500 to-green-600",
    exercises: [
      { id: "t1", type: "translate", difficulty: "beginner", points: 10, russian: "Здравствуйте!", uzbek: "Assalomu alaykum!", direction: "ru-uz", acceptedAnswers: ["assalomu alaykum", "salom", "assalomu aleykum"] },
      { id: "t2", type: "translate", difficulty: "beginner", points: 10, russian: "Спасибо большое", uzbek: "Katta rahmat", direction: "ru-uz", acceptedAnswers: ["katta rahmat", "rahmat", "katta raxmat"] },
      { id: "t3", type: "translate", difficulty: "beginner", points: 10, russian: "Как дела?", uzbek: "Ishlar qanday?", direction: "ru-uz", acceptedAnswers: ["ishlar qanday", "qanday ishlar", "yaxshimisiz", "qalaysiz"] },
      { id: "t4", type: "translate", difficulty: "intermediate", points: 15, russian: "Я студент университета", uzbek: "Men universitet talabisiman", direction: "ru-uz", acceptedAnswers: ["men universitet talabisiman", "men universitetda o'qiyman", "men talabaman"] },
      { id: "t5", type: "translate", difficulty: "intermediate", points: 15, russian: "Когда начинается лекция?", uzbek: "Ma'ruza qachon boshlanadi?", direction: "ru-uz", acceptedAnswers: ["ma'ruza qachon boshlanadi", "dars qachon boshlanadi", "maruza qachon boshlanadi"] },
      { id: "t6", type: "translate", difficulty: "intermediate", points: 15, russian: "Где находится библиотека?", uzbek: "Kutubxona qayerda joylashgan?", direction: "ru-uz", acceptedAnswers: ["kutubxona qayerda joylashgan", "kutubxona qayerda", "kutubxona qaerda"] },
      { id: "t7", type: "translate", difficulty: "advanced", points: 20, russian: "Я хочу написать научную статью", uzbek: "Men ilmiy maqola yozmoqchiman", direction: "ru-uz", acceptedAnswers: ["men ilmiy maqola yozmoqchiman", "ilmiy maqola yozmoqchiman", "men maqola yozmoqchiman"] },
      { id: "t8", type: "translate", difficulty: "beginner", points: 10, russian: "Доброе утро", uzbek: "Xayrli tong", direction: "uz-ru", acceptedAnswers: ["доброе утро", "добрoе утро"] },
      { id: "t9", type: "translate", difficulty: "beginner", points: 10, russian: "Пожалуйста", uzbek: "Iltimos", direction: "uz-ru", acceptedAnswers: ["пожалуйста", "пожалуста"] },
      { id: "t10", type: "translate", difficulty: "intermediate", points: 15, russian: "Я изучаю русский язык", uzbek: "Men rus tilini o'rganyapman", direction: "uz-ru", acceptedAnswers: ["я изучаю русский язык", "я учу русский язык", "я изучаю русский"] },
    ],
  },
  {
    id: "academic-vocabulary",
    title: "Академический русский",
    titleUz: "Akademik rus tili",
    description: "Университетская лексика",
    icon: "GraduationCap",
    color: "bg-gradient-to-br from-yellow-500 to-orange-500",
    exercises: [
      { id: "av1", type: "fill", difficulty: "beginner", points: 10, sentence: "Студенты ___ в университете.", answer: "учатся", hint: "o'qiydilar", uzbek: "Talabalar universitetda o'qiydilar.", explanation: "Глагол «учиться» - o'qimoq" },
      { id: "av2", type: "fill", difficulty: "beginner", points: 10, sentence: "Завтра у нас ___.", answer: "экзамен", hint: "imtihon", uzbek: "Ertaga bizda imtihon bor.", explanation: "Экзамен - imtihon" },
      { id: "av3", type: "fill", difficulty: "beginner", points: 10, sentence: "Я получил ___ по математике.", answer: "пятёрку", hint: "a'lo baho", uzbek: "Men matematikadan a'lo baho oldim.", explanation: "Пятёрка = 5 (a'lo baho)" },
      { id: "av4", type: "fill", difficulty: "intermediate", points: 15, sentence: "Профессор читает ___ по физике.", answer: "лекцию", hint: "ma'ruza", uzbek: "Professor fizikadan ma'ruza o'qiyapti.", explanation: "Лекция - ma'ruza" },
      { id: "av5", type: "fill", difficulty: "intermediate", points: 15, sentence: "Я пишу курсовую ___.", answer: "работу", hint: "ish", uzbek: "Men kurs ishini yozyapman.", explanation: "Курсовая работа - kurs ishi" },
      { id: "av6", type: "choice", difficulty: "beginner", points: 10, question: "Как называется место, где живут студенты?", options: ["Библиотека", "Общежитие", "Столовая", "Аудитория"], correct: 1, uzbek: "Yotoqxona", explanation: "Общежитие - talabalar yashash joyi" },
      { id: "av7", type: "choice", difficulty: "beginner", points: 10, question: "Что означает слово «зачёт»?", options: ["Imtihon", "Sinov", "Baho", "Stipendiya"], correct: 1, uzbek: "Sinov (zachyot)", explanation: "Зачёт - oraliq nazorat" },
      { id: "av8", type: "choice", difficulty: "intermediate", points: 15, question: "Что такое «диплом»?", options: ["Bakalavr ishi", "Magistrlik dissertatsiyasi", "Bitiruv malakaviy ishi", "Kurs ishi"], correct: 2, uzbek: "Diplom ishi", explanation: "Дипломная работа - BMI" },
      { id: "av9", type: "choice", difficulty: "intermediate", points: 15, question: "Кто такой «декан»?", options: ["Talaba", "Fakultet boshlig'i", "Rektor", "Laborant"], correct: 1, uzbek: "Dekan - fakultet boshlig'i", explanation: "Декан руководит факультетом" },
      { id: "av10", type: "choice", difficulty: "advanced", points: 20, question: "Что означает «аспирантура»?", options: ["Bakalavriatura", "Magistratura", "Doktorantura", "Kollej"], correct: 2, uzbek: "Aspirantura - doktorantura", explanation: "Аспирантура - oliy ta'limdan keyingi bosqich" },
    ],
  },
];

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
