export interface VocabularyItem {
  russian: string;
  uzbek: string;
}

export interface GrammarRule {
  rule: string;
  example: string;
}

export interface Note {
  id: number;
  title: string;
  lexicalTopic: string;
  grammarTopic: string;
  vocabulary: VocabularyItem[];
  grammarRules: GrammarRule[];
  exercises?: string[];
}

export const notesData: Note[] = [
  {
    id: 1,
    title: "Практическое занятие № 1",
    lexicalTopic: "Знакомство. Рассказ о себе",
    grammarTopic: "Фонетика. Алфавит. Гласные и согласные звуки",
    vocabulary: [
      { russian: "Здравствуйте!", uzbek: "Assalomu alaykum!" },
      { russian: "Меня зовут...", uzbek: "Mening ismim..." },
      { russian: "Я студент", uzbek: "Men talabaman" },
      { russian: "Я изучаю русский язык", uzbek: "Men rus tilini o'rganaman" },
      { russian: "Очень приятно", uzbek: "Tanishganimdan xursandman" },
      { russian: "До свидания", uzbek: "Xayr" },
      { russian: "Спасибо", uzbek: "Rahmat" },
      { russian: "Пожалуйста", uzbek: "Iltimos / Marhamat" },
      { russian: "Как вас зовут?", uzbek: "Ismingiz nima?" },
      { russian: "Откуда вы?", uzbek: "Siz qayerdansiz?" }
    ],
    grammarRules: [
      { rule: "В русском алфавите 33 буквы", example: "А, Б, В, Г, Д, Е, Ё, Ж, З, И, Й, К, Л, М, Н, О, П, Р, С, Т, У, Ф, Х, Ц, Ч, Ш, Щ, Ъ, Ы, Ь, Э, Ю, Я" },
      { rule: "Гласные звуки: 10 букв", example: "А, О, У, Э, Ы, Я, Ё, Ю, Е, И" },
      { rule: "Согласные звуки: 21 буква", example: "Б, В, Г, Д, Ж, З, Й, К, Л, М, Н, П, Р, С, Т, Ф, Х, Ц, Ч, Ш, Щ" },
      { rule: "Ъ и Ь - не обозначают звуков", example: "объект, мальчик" }
    ],
    exercises: [
      "Представьтесь по-русски",
      "Расскажите о себе (имя, возраст, профессия)",
      "Прочитайте алфавит вслух"
    ]
  },
  {
    id: 2,
    title: "Практическое занятие № 2",
    lexicalTopic: "Моя семья",
    grammarTopic: "Именительный падеж. Предложный падеж",
    vocabulary: [
      { russian: "семья", uzbek: "oila" },
      { russian: "мать (мама)", uzbek: "ona" },
      { russian: "отец (папа)", uzbek: "ota" },
      { russian: "брат", uzbek: "aka / uka" },
      { russian: "сестра", uzbek: "opa / singil" },
      { russian: "дедушка", uzbek: "bobo" },
      { russian: "бабушка", uzbek: "buvi" },
      { russian: "муж", uzbek: "er" },
      { russian: "жена", uzbek: "xotin" },
      { russian: "дети", uzbek: "bolalar" },
      { russian: "сын", uzbek: "o'g'il" },
      { russian: "дочь", uzbek: "qiz" }
    ],
    grammarRules: [
      { rule: "Именительный падеж отвечает на вопросы: Кто? Что?", example: "Это мама. Это книга." },
      { rule: "Предложный падеж отвечает на вопросы: О ком? О чём? Где?", example: "Я думаю о маме. Книга на столе." },
      { rule: "Предложный падеж с предлогами: в, на, о (об)", example: "в университете, на работе, о семье" },
      { rule: "Окончания в предложном падеже: -е, -и", example: "в школе, в семье, о брате" }
    ],
    exercises: [
      "Расскажите о своей семье",
      "Составьте предложения с предложным падежом",
      "Ответьте на вопрос: Где вы живёте?"
    ]
  },
  {
    id: 3,
    title: "Практическое занятие № 3",
    lexicalTopic: "Город Ташкент – столица Узбекистана",
    grammarTopic: "Родительный падеж",
    vocabulary: [
      { russian: "столица", uzbek: "poytaxt" },
      { russian: "город", uzbek: "shahar" },
      { russian: "улица", uzbek: "ko'cha" },
      { russian: "площадь", uzbek: "maydon" },
      { russian: "памятник", uzbek: "yodgorlik" },
      { russian: "музей", uzbek: "muzey" },
      { russian: "театр", uzbek: "teatr" },
      { russian: "парк", uzbek: "bog'" },
      { russian: "метро", uzbek: "metro" },
      { russian: "население", uzbek: "aholi" }
    ],
    grammarRules: [
      { rule: "Родительный падеж отвечает на вопросы: Кого? Чего?", example: "У меня нет брата. Центр города." },
      { rule: "Родительный падеж употребляется после слов: нет, много, мало, несколько", example: "много студентов, мало времени" },
      { rule: "Окончания мужского рода: -а, -я", example: "брата, учителя" },
      { rule: "Окончания женского рода: -ы, -и", example: "сестры, книги" },
      { rule: "Окончания среднего рода: -а, -я", example: "окна, моря" }
    ],
    exercises: [
      "Расскажите о столице Узбекистана",
      "Образуйте родительный падеж от данных слов",
      "Составьте предложения со словом 'нет'"
    ]
  },
  {
    id: 4,
    title: "Практическое занятие № 4",
    lexicalTopic: "Город Навои",
    grammarTopic: "Винительный падеж",
    vocabulary: [
      { russian: "завод", uzbek: "zavod" },
      { russian: "фабрика", uzbek: "fabrika" },
      { russian: "предприятие", uzbek: "korxona" },
      { russian: "промышленность", uzbek: "sanoat" },
      { russian: "горнодобывающий", uzbek: "kon-qazib olish" },
      { russian: "золото", uzbek: "oltin" },
      { russian: "уран", uzbek: "uran" },
      { russian: "комбинат", uzbek: "kombinat" },
      { russian: "рабочий", uzbek: "ishchi" },
      { russian: "инженер", uzbek: "muhandis" }
    ],
    grammarRules: [
      { rule: "Винительный падеж отвечает на вопросы: Кого? Что?", example: "Я вижу брата. Я читаю книгу." },
      { rule: "Одушевлённые существительные м.р.: окончание как в Р.п.", example: "вижу брата, студента" },
      { rule: "Неодушевлённые существительные м.р.: окончание как в И.п.", example: "читаю журнал, текст" },
      { rule: "Женский род: -у, -ю", example: "книгу, историю" },
      { rule: "Средний род: окончание как в И.п.", example: "читаю письмо" }
    ],
    exercises: [
      "Расскажите о городе Навои",
      "Составьте предложения с винительным падежом",
      "Ответьте на вопрос: Что вы изучаете?"
    ]
  },
  {
    id: 5,
    title: "Практическое занятие № 5",
    lexicalTopic: "Мой рабочий день",
    grammarTopic: "Дательный падеж",
    vocabulary: [
      { russian: "утро", uzbek: "ertalab" },
      { russian: "день", uzbek: "kun" },
      { russian: "вечер", uzbek: "kechqurun" },
      { russian: "ночь", uzbek: "tun" },
      { russian: "завтракать", uzbek: "nonushta qilmoq" },
      { russian: "обедать", uzbek: "tushlik qilmoq" },
      { russian: "ужинать", uzbek: "kechki ovqat yemoq" },
      { russian: "просыпаться", uzbek: "uyg'onmoq" },
      { russian: "одеваться", uzbek: "kiyinmoq" },
      { russian: "умываться", uzbek: "yuvinmoq" }
    ],
    grammarRules: [
      { rule: "Дательный падеж отвечает на вопросы: Кому? Чему?", example: "Я звоню маме. Он помогает брату." },
      { rule: "Окончания мужского рода: -у, -ю", example: "брату, учителю" },
      { rule: "Окончания женского рода: -е, -и", example: "сестре, маме" },
      { rule: "Дательный падеж употребляется с глаголами: давать, помогать, звонить", example: "дать другу, помочь маме" },
      { rule: "С предлогом 'к': движение к кому-либо", example: "Я иду к врачу" }
    ],
    exercises: [
      "Расскажите о своём рабочем дне",
      "Составьте предложения с дательным падежом",
      "Ответьте на вопрос: Кому вы звоните?"
    ]
  },
  {
    id: 6,
    title: "Практическое занятие № 6",
    lexicalTopic: "Мой выходной день",
    grammarTopic: "Творительный падеж",
    vocabulary: [
      { russian: "отдыхать", uzbek: "dam olmoq" },
      { russian: "гулять", uzbek: "sayr qilmoq" },
      { russian: "встречаться", uzbek: "uchrashmoq" },
      { russian: "друг", uzbek: "do'st" },
      { russian: "подруга", uzbek: "dugona" },
      { russian: "кино", uzbek: "kino" },
      { russian: "концерт", uzbek: "konsert" },
      { russian: "выставка", uzbek: "ko'rgazma" },
      { russian: "хобби", uzbek: "sevimli mashg'ulot" },
      { russian: "спорт", uzbek: "sport" }
    ],
    grammarRules: [
      { rule: "Творительный падеж отвечает на вопросы: Кем? Чем? С кем?", example: "Я горжусь братом. Пишу ручкой." },
      { rule: "Окончания мужского рода: -ом, -ем", example: "братом, учителем" },
      { rule: "Окончания женского рода: -ой, -ей", example: "сестрой, книгой" },
      { rule: "С предлогом 'с': совместное действие", example: "с другом, с семьёй" },
      { rule: "После глаголов: быть, стать, работать", example: "быть врачом, стать инженером" }
    ],
    exercises: [
      "Расскажите о своём выходном дне",
      "Составьте предложения с творительным падежом",
      "Ответьте: Кем вы хотите стать?"
    ]
  },
  {
    id: 7,
    title: "Практическое занятие № 7",
    lexicalTopic: "Времена года. Погода",
    grammarTopic: "Глаголы движения без приставок",
    vocabulary: [
      { russian: "весна", uzbek: "bahor" },
      { russian: "лето", uzbek: "yoz" },
      { russian: "осень", uzbek: "kuz" },
      { russian: "зима", uzbek: "qish" },
      { russian: "погода", uzbek: "ob-havo" },
      { russian: "тепло", uzbek: "iliq" },
      { russian: "холодно", uzbek: "sovuq" },
      { russian: "жарко", uzbek: "issiq" },
      { russian: "дождь", uzbek: "yomg'ir" },
      { russian: "снег", uzbek: "qor" }
    ],
    grammarRules: [
      { rule: "Глаголы движения делятся на однонаправленные и разнонаправленные", example: "идти - ходить, ехать - ездить" },
      { rule: "Однонаправленные: движение в одном направлении", example: "Я иду в университет (сейчас)" },
      { rule: "Разнонаправленные: регулярное или туда-обратно", example: "Я хожу в университет (каждый день)" },
      { rule: "Идти/ходить - пешком", example: "Я иду домой" },
      { rule: "Ехать/ездить - на транспорте", example: "Я еду на автобусе" }
    ],
    exercises: [
      "Расскажите о временах года в Узбекистане",
      "Используйте глаголы идти/ходить в предложениях",
      "Опишите сегодняшнюю погоду"
    ]
  },
  {
    id: 8,
    title: "Практическое занятие № 8",
    lexicalTopic: "Транспорт",
    grammarTopic: "Глаголы движения с приставками",
    vocabulary: [
      { russian: "автобус", uzbek: "avtobus" },
      { russian: "троллейбус", uzbek: "trolleybus" },
      { russian: "трамвай", uzbek: "tramvay" },
      { russian: "такси", uzbek: "taksi" },
      { russian: "самолёт", uzbek: "samolyot" },
      { russian: "поезд", uzbek: "poyezd" },
      { russian: "остановка", uzbek: "bekat" },
      { russian: "вокзал", uzbek: "vokzal" },
      { russian: "аэропорт", uzbek: "aeroport" },
      { russian: "билет", uzbek: "chipta" }
    ],
    grammarRules: [
      { rule: "Приставка вы- : движение изнутри наружу", example: "выходить из дома" },
      { rule: "Приставка в- : движение внутрь", example: "входить в комнату" },
      { rule: "Приставка при- : прибытие", example: "приходить домой" },
      { rule: "Приставка у- : удаление", example: "уходить из дома" },
      { rule: "Приставка пере- : через что-либо", example: "переходить улицу" }
    ],
    exercises: [
      "Расскажите о транспорте в вашем городе",
      "Составьте предложения с приставочными глаголами",
      "Как вы добираетесь до университета?"
    ]
  },
  {
    id: 9,
    title: "Практическое занятие № 9",
    lexicalTopic: "В магазине",
    grammarTopic: "Числительные. Количественные и порядковые",
    vocabulary: [
      { russian: "магазин", uzbek: "do'kon" },
      { russian: "рынок", uzbek: "bozor" },
      { russian: "покупать", uzbek: "sotib olmoq" },
      { russian: "продавать", uzbek: "sotmoq" },
      { russian: "цена", uzbek: "narx" },
      { russian: "дёшево", uzbek: "arzon" },
      { russian: "дорого", uzbek: "qimmat" },
      { russian: "касса", uzbek: "kassa" },
      { russian: "чек", uzbek: "chek" },
      { russian: "сдача", uzbek: "qaytim" }
    ],
    grammarRules: [
      { rule: "Количественные числительные: один, два, три...", example: "один студент, два брата" },
      { rule: "Порядковые числительные: первый, второй, третий...", example: "первый урок, второй этаж" },
      { rule: "После 1: именительный падеж ед.ч.", example: "один рубль, одна книга" },
      { rule: "После 2, 3, 4: родительный падеж ед.ч.", example: "два рубля, три книги" },
      { rule: "После 5-20: родительный падеж мн.ч.", example: "пять рублей, десять книг" }
    ],
    exercises: [
      "Разыграйте диалог в магазине",
      "Назовите цены на продукты",
      "Посчитайте от 1 до 100"
    ]
  },
  {
    id: 10,
    title: "Практическое занятие № 10",
    lexicalTopic: "Еда. В столовой",
    grammarTopic: "Степени сравнения прилагательных",
    vocabulary: [
      { russian: "завтрак", uzbek: "nonushta" },
      { russian: "обед", uzbek: "tushlik" },
      { russian: "ужин", uzbek: "kechki ovqat" },
      { russian: "хлеб", uzbek: "non" },
      { russian: "мясо", uzbek: "go'sht" },
      { russian: "рыба", uzbek: "baliq" },
      { russian: "овощи", uzbek: "sabzavotlar" },
      { russian: "фрукты", uzbek: "mevalar" },
      { russian: "вкусный", uzbek: "mazali" },
      { russian: "свежий", uzbek: "yangi" }
    ],
    grammarRules: [
      { rule: "Сравнительная степень: -ее, -ей, более", example: "красивее, более интересный" },
      { rule: "Превосходная степень: самый, -ейший, -айший", example: "самый красивый, красивейший" },
      { rule: "Исключения: хороший - лучше - лучший", example: "Эта книга лучше" },
      { rule: "Исключения: плохой - хуже - худший", example: "Погода хуже" },
      { rule: "Исключения: большой - больше - самый большой", example: "Этот город больше" }
    ],
    exercises: [
      "Расскажите о вашей любимой еде",
      "Сравните два ресторана",
      "Составьте меню на день"
    ]
  },
  {
    id: 11,
    title: "Практическое занятие № 11",
    lexicalTopic: "Здоровье. У врача",
    grammarTopic: "Виды глагола. Несовершенный и совершенный вид",
    vocabulary: [
      { russian: "больница", uzbek: "kasalxona" },
      { russian: "поликлиника", uzbek: "poliklinika" },
      { russian: "врач", uzbek: "shifokor" },
      { russian: "медсестра", uzbek: "hamshira" },
      { russian: "лекарство", uzbek: "dori" },
      { russian: "рецепт", uzbek: "retsept" },
      { russian: "болеть", uzbek: "kasal bo'lmoq" },
      { russian: "температура", uzbek: "harorat" },
      { russian: "кашель", uzbek: "yo'tal" },
      { russian: "насморк", uzbek: "shamollash" }
    ],
    grammarRules: [
      { rule: "Несовершенный вид: процесс, повторяемость", example: "Я читал книгу (долго, много раз)" },
      { rule: "Совершенный вид: результат, однократность", example: "Я прочитал книгу (закончил)" },
      { rule: "НСВ отвечает на вопрос: Что делать?", example: "читать, писать, говорить" },
      { rule: "СВ отвечает на вопрос: Что сделать?", example: "прочитать, написать, сказать" },
      { rule: "Способы образования: приставки, суффиксы", example: "писать - написать, решать - решить" }
    ],
    exercises: [
      "Разыграйте диалог у врача",
      "Образуйте видовые пары глаголов",
      "Расскажите, что вы делаете, когда болеете"
    ]
  },
  {
    id: 12,
    title: "Практическое занятие № 12",
    lexicalTopic: "Спорт в нашей жизни",
    grammarTopic: "Возвратные глаголы",
    vocabulary: [
      { russian: "спортсмен", uzbek: "sportchi" },
      { russian: "тренер", uzbek: "murabbiy" },
      { russian: "соревнование", uzbek: "musobaqa" },
      { russian: "чемпион", uzbek: "chempion" },
      { russian: "победа", uzbek: "g'alaba" },
      { russian: "футбол", uzbek: "futbol" },
      { russian: "баскетбол", uzbek: "basketbol" },
      { russian: "плавание", uzbek: "suzish" },
      { russian: "бег", uzbek: "yugurish" },
      { russian: "тренировка", uzbek: "mashq" }
    ],
    grammarRules: [
      { rule: "Возвратные глаголы оканчиваются на -ся, -сь", example: "умываться, одеваться" },
      { rule: "-ся после согласных", example: "умывается, одевается" },
      { rule: "-сь после гласных", example: "умываюсь, одеваюсь" },
      { rule: "Значения: действие на себя", example: "Я умываюсь (сам себя)" },
      { rule: "Значения: взаимное действие", example: "Мы встречаемся (друг с другом)" }
    ],
    exercises: [
      "Расскажите о своём любимом виде спорта",
      "Проспрягайте возвратные глаголы",
      "Какими видами спорта вы занимаетесь?"
    ]
  },
  {
    id: 13,
    title: "Практическое занятие № 13",
    lexicalTopic: "Образование в Узбекистане",
    grammarTopic: "Причастия. Действительные и страдательные",
    vocabulary: [
      { russian: "образование", uzbek: "ta'lim" },
      { russian: "школа", uzbek: "maktab" },
      { russian: "колледж", uzbek: "kollej" },
      { russian: "университет", uzbek: "universitet" },
      { russian: "факультет", uzbek: "fakultet" },
      { russian: "специальность", uzbek: "mutaxassislik" },
      { russian: "студент", uzbek: "talaba" },
      { russian: "преподаватель", uzbek: "o'qituvchi" },
      { russian: "экзамен", uzbek: "imtihon" },
      { russian: "диплом", uzbek: "diplom" }
    ],
    grammarRules: [
      { rule: "Действительные причастия: -ущ-, -ющ-, -ащ-, -ящ-", example: "читающий, говорящий" },
      { rule: "Страдательные причастия: -ем-, -им-, -нн-, -т-", example: "читаемый, написанный" },
      { rule: "Действительные: кто делает действие", example: "студент, читающий книгу" },
      { rule: "Страдательные: над кем/чем действие", example: "книга, прочитанная студентом" },
      { rule: "Причастия изменяются как прилагательные", example: "читающий студент, читающая девушка" }
    ],
    exercises: [
      "Расскажите о системе образования в Узбекистане",
      "Образуйте причастия от данных глаголов",
      "Опишите свой университет"
    ]
  },
  {
    id: 14,
    title: "Практическое занятие № 14",
    lexicalTopic: "Моя будущая профессия",
    grammarTopic: "Деепричастия",
    vocabulary: [
      { russian: "профессия", uzbek: "kasb" },
      { russian: "работа", uzbek: "ish" },
      { russian: "карьера", uzbek: "karyera" },
      { russian: "зарплата", uzbek: "maosh" },
      { russian: "опыт", uzbek: "tajriba" },
      { russian: "навык", uzbek: "ko'nikma" },
      { russian: "горняк", uzbek: "konchi" },
      { russian: "геолог", uzbek: "geolog" },
      { russian: "металлург", uzbek: "metallurg" },
      { russian: "программист", uzbek: "dasturchi" }
    ],
    grammarRules: [
      { rule: "Деепричастия НСВ: -а, -я", example: "читая, говоря" },
      { rule: "Деепричастия СВ: -в, -вши, -ши", example: "прочитав, сказав" },
      { rule: "Деепричастие = дополнительное действие", example: "Читая книгу, я слушал музыку" },
      { rule: "Субъект деепричастия = субъект глагола", example: "Придя домой, я отдохнул (я пришёл, я отдохнул)" },
      { rule: "Деепричастие не изменяется", example: "читая, читая, читая (одна форма)" }
    ],
    exercises: [
      "Расскажите о своей будущей профессии",
      "Образуйте деепричастия от глаголов",
      "Почему вы выбрали эту специальность?"
    ]
  },
  {
    id: 15,
    title: "Практическое занятие № 15",
    lexicalTopic: "Навоийский горно-металлургический комбинат",
    grammarTopic: "Сложные предложения. Сложносочинённые",
    vocabulary: [
      { russian: "комбинат", uzbek: "kombinat" },
      { russian: "добыча", uzbek: "qazib olish" },
      { russian: "переработка", uzbek: "qayta ishlash" },
      { russian: "месторождение", uzbek: "konlar" },
      { russian: "руда", uzbek: "ruda" },
      { russian: "металл", uzbek: "metall" },
      { russian: "производство", uzbek: "ishlab chiqarish" },
      { russian: "технология", uzbek: "texnologiya" },
      { russian: "оборудование", uzbek: "jihozlar" },
      { russian: "продукция", uzbek: "mahsulot" }
    ],
    grammarRules: [
      { rule: "Сложносочинённые: с союзами и, а, но, или", example: "Я читаю, а он пишет" },
      { rule: "Союз И: соединительный", example: "Солнце светит, и птицы поют" },
      { rule: "Союз А: противительный (сопоставление)", example: "Брат работает, а сестра учится" },
      { rule: "Союз НО: противительный (противопоставление)", example: "Я хотел пойти, но не смог" },
      { rule: "Союз ИЛИ: разделительный", example: "Мы поедем на автобусе или на такси" }
    ],
    exercises: [
      "Расскажите о НГМК",
      "Составьте сложносочинённые предложения",
      "Соедините простые предложения союзами"
    ]
  },
  {
    id: 16,
    title: "Практическое занятие № 16",
    lexicalTopic: "Экология и охрана природы",
    grammarTopic: "Сложноподчинённые предложения",
    vocabulary: [
      { russian: "экология", uzbek: "ekologiya" },
      { russian: "природа", uzbek: "tabiat" },
      { russian: "окружающая среда", uzbek: "atrof-muhit" },
      { russian: "загрязнение", uzbek: "ifloslanish" },
      { russian: "защита", uzbek: "himoya" },
      { russian: "отходы", uzbek: "chiqindilar" },
      { russian: "переработка", uzbek: "qayta ishlash" },
      { russian: "ресурсы", uzbek: "resurslar" },
      { russian: "климат", uzbek: "iqlim" },
      { russian: "заповедник", uzbek: "qo'riqxona" }
    ],
    grammarRules: [
      { rule: "Придаточные изъяснительные: что, чтобы", example: "Я знаю, что он придёт" },
      { rule: "Придаточные определительные: который", example: "Книга, которую я читаю, интересная" },
      { rule: "Придаточные времени: когда, пока", example: "Когда я пришёл, он уже ушёл" },
      { rule: "Придаточные причины: потому что, так как", example: "Я остался дома, потому что был болен" },
      { rule: "Придаточные условия: если", example: "Если будет время, я приду" }
    ],
    exercises: [
      "Расскажите об экологических проблемах",
      "Составьте сложноподчинённые предложения",
      "Как можно защитить природу?"
    ]
  },
  {
    id: 17,
    title: "Практическое занятие № 17",
    lexicalTopic: "Культура и искусство Узбекистана",
    grammarTopic: "Прямая и косвенная речь",
    vocabulary: [
      { russian: "культура", uzbek: "madaniyat" },
      { russian: "искусство", uzbek: "san'at" },
      { russian: "традиция", uzbek: "an'ana" },
      { russian: "обычай", uzbek: "urf-odat" },
      { russian: "музыка", uzbek: "musiqa" },
      { russian: "танец", uzbek: "raqs" },
      { russian: "литература", uzbek: "adabiyot" },
      { russian: "поэзия", uzbek: "she'riyat" },
      { russian: "художник", uzbek: "rassom" },
      { russian: "писатель", uzbek: "yozuvchi" }
    ],
    grammarRules: [
      { rule: "Прямая речь: точные слова говорящего", example: "Он сказал: «Я приду завтра»" },
      { rule: "Косвенная речь: пересказ слов", example: "Он сказал, что придёт завтра" },
      { rule: "При переводе: я → он, сегодня → в тот день", example: "«Я занят сегодня» → что он занят в тот день" },
      { rule: "Вопрос → придаточное с союзом ли", example: "«Ты придёшь?» → спросил, приду ли я" },
      { rule: "Побуждение → чтобы + прош. время", example: "«Приходи!» → попросил, чтобы я пришёл" }
    ],
    exercises: [
      "Расскажите о культуре Узбекистана",
      "Переведите прямую речь в косвенную",
      "Кто ваш любимый узбекский писатель?"
    ]
  },
  {
    id: 18,
    title: "Практическое занятие № 18",
    lexicalTopic: "Великие учёные Востока",
    grammarTopic: "Активные и пассивные конструкции",
    vocabulary: [
      { russian: "учёный", uzbek: "olim" },
      { russian: "открытие", uzbek: "kashfiyot" },
      { russian: "изобретение", uzbek: "ixtiro" },
      { russian: "наука", uzbek: "fan" },
      { russian: "математика", uzbek: "matematika" },
      { russian: "астрономия", uzbek: "astronomiya" },
      { russian: "медицина", uzbek: "tibbiyot" },
      { russian: "философия", uzbek: "falsafa" },
      { russian: "вклад", uzbek: "hissa" },
      { russian: "труд", uzbek: "asar" }
    ],
    grammarRules: [
      { rule: "Активная конструкция: субъект + глагол + объект", example: "Студент читает книгу" },
      { rule: "Пассивная конструкция: объект + глагол + субъект (Тв.п.)", example: "Книга читается студентом" },
      { rule: "Пассив НСВ: читается, пишется", example: "Статья пишется автором" },
      { rule: "Пассив СВ: был прочитан, будет написан", example: "Книга была написана в 10 веке" },
      { rule: "Краткие страдательные причастия: написан, открыт", example: "Закон открыт Ньютоном" }
    ],
    exercises: [
      "Расскажите об Ибн Сине или Аль-Хорезми",
      "Преобразуйте активные конструкции в пассивные",
      "Какие открытия сделали учёные Востока?"
    ]
  },
  {
    id: 19,
    title: "Практическое занятие № 19",
    lexicalTopic: "Компьютерные технологии",
    grammarTopic: "Выражение времени",
    vocabulary: [
      { russian: "компьютер", uzbek: "kompyuter" },
      { russian: "программа", uzbek: "dastur" },
      { russian: "интернет", uzbek: "internet" },
      { russian: "сеть", uzbek: "tarmoq" },
      { russian: "сайт", uzbek: "sayt" },
      { russian: "информация", uzbek: "ma'lumot" },
      { russian: "данные", uzbek: "ma'lumotlar" },
      { russian: "файл", uzbek: "fayl" },
      { russian: "загружать", uzbek: "yuklamoq" },
      { russian: "скачивать", uzbek: "yuklab olmoq" }
    ],
    grammarRules: [
      { rule: "Когда? - В.п. без предлога (дни недели)", example: "в понедельник, в среду" },
      { rule: "Когда? - П.п. с предлогом В (месяц, год)", example: "в январе, в 2024 году" },
      { rule: "Как долго? - В.п. без предлога", example: "час, неделю, год" },
      { rule: "За какое время? - за + В.п.", example: "за час, за неделю" },
      { rule: "Через какое время? - через + В.п.", example: "через час, через неделю" }
    ],
    exercises: [
      "Расскажите о роли компьютеров в жизни",
      "Составьте предложения с выражениями времени",
      "Как часто вы пользуетесь интернетом?"
    ]
  },
  {
    id: 20,
    title: "Практическое занятие № 20",
    lexicalTopic: "Путешествия",
    grammarTopic: "Выражение цели",
    vocabulary: [
      { russian: "путешествие", uzbek: "sayohat" },
      { russian: "турист", uzbek: "turist" },
      { russian: "гостиница", uzbek: "mehmonxona" },
      { russian: "бронировать", uzbek: "band qilmoq" },
      { russian: "виза", uzbek: "viza" },
      { russian: "паспорт", uzbek: "pasport" },
      { russian: "достопримечательность", uzbek: "diqqatga sazovor joy" },
      { russian: "экскурсия", uzbek: "ekskursiya" },
      { russian: "гид", uzbek: "gid" },
      { russian: "сувенир", uzbek: "esdalik" }
    ],
    grammarRules: [
      { rule: "Зачем? - инфинитив", example: "Я пришёл поговорить" },
      { rule: "Для чего? - для + Р.п.", example: "для работы, для учёбы" },
      { rule: "Чтобы + инфинитив (один субъект)", example: "Я учусь, чтобы знать" },
      { rule: "Чтобы + прошедшее время (разные субъекты)", example: "Я хочу, чтобы ты пришёл" },
      { rule: "За + Т.п. (получить что-либо)", example: "Пойти за хлебом" }
    ],
    exercises: [
      "Расскажите о своём путешествии",
      "Составьте предложения с выражениями цели",
      "Куда бы вы хотели поехать?"
    ]
  },
  {
    id: 21,
    title: "Практическое занятие № 21",
    lexicalTopic: "Наука и техника",
    grammarTopic: "Выражение причины и следствия",
    vocabulary: [
      { russian: "исследование", uzbek: "tadqiqot" },
      { russian: "эксперимент", uzbek: "tajriba" },
      { russian: "результат", uzbek: "natija" },
      { russian: "метод", uzbek: "usul" },
      { russian: "теория", uzbek: "nazariya" },
      { russian: "практика", uzbek: "amaliyot" },
      { russian: "развитие", uzbek: "rivojlanish" },
      { russian: "прогресс", uzbek: "taraqqiyot" },
      { russian: "инновация", uzbek: "innovatsiya" },
      { russian: "внедрение", uzbek: "joriy etish" }
    ],
    grammarRules: [
      { rule: "Почему? Потому что + предложение", example: "Я не пришёл, потому что был болен" },
      { rule: "Из-за + Р.п. (негативная причина)", example: "из-за болезни, из-за дождя" },
      { rule: "Благодаря + Д.п. (позитивная причина)", example: "благодаря помощи, благодаря другу" },
      { rule: "Поэтому (следствие)", example: "Я был болен, поэтому не пришёл" },
      { rule: "В результате + Р.п.", example: "в результате работы" }
    ],
    exercises: [
      "Расскажите о научных достижениях",
      "Составьте предложения с причинными союзами",
      "Какие технологии важны для вашей профессии?"
    ]
  },
  {
    id: 22,
    title: "Практическое занятие № 22",
    lexicalTopic: "Средства массовой информации",
    grammarTopic: "Выражение условия",
    vocabulary: [
      { russian: "газета", uzbek: "gazeta" },
      { russian: "журнал", uzbek: "jurnal" },
      { russian: "телевидение", uzbek: "televideniye" },
      { russian: "радио", uzbek: "radio" },
      { russian: "новости", uzbek: "yangiliklar" },
      { russian: "репортаж", uzbek: "reportaj" },
      { russian: "журналист", uzbek: "jurnalist" },
      { russian: "интервью", uzbek: "intervyu" },
      { russian: "статья", uzbek: "maqola" },
      { russian: "реклама", uzbek: "reklama" }
    ],
    grammarRules: [
      { rule: "Реальное условие: Если + буд./наст. время", example: "Если будет время, я приду" },
      { rule: "Нереальное условие: Если бы + прош. время", example: "Если бы я знал, я бы сказал" },
      { rule: "При условии + Р.п.", example: "при условии согласия" },
      { rule: "В случае + Р.п.", example: "в случае необходимости" },
      { rule: "При + П.п.", example: "при хорошей погоде" }
    ],
    exercises: [
      "Расскажите о СМИ в Узбекистане",
      "Составьте условные предложения",
      "Какие новости вы смотрите?"
    ]
  },
  {
    id: 23,
    title: "Практическое занятие № 23",
    lexicalTopic: "Праздники в Узбекистане",
    grammarTopic: "Выражение уступки",
    vocabulary: [
      { russian: "праздник", uzbek: "bayram" },
      { russian: "Навруз", uzbek: "Navro'z" },
      { russian: "День независимости", uzbek: "Mustaqillik kuni" },
      { russian: "поздравлять", uzbek: "tabriklamoq" },
      { russian: "традиция", uzbek: "an'ana" },
      { russian: "обычай", uzbek: "urf-odat" },
      { russian: "подарок", uzbek: "sovg'a" },
      { russian: "гость", uzbek: "mehmon" },
      { russian: "угощение", uzbek: "taom" },
      { russian: "веселье", uzbek: "shodlik" }
    ],
    grammarRules: [
      { rule: "Хотя + предложение", example: "Хотя было холодно, мы гуляли" },
      { rule: "Несмотря на + В.п.", example: "несмотря на дождь" },
      { rule: "Несмотря на то что + предложение", example: "Несмотря на то что шёл дождь" },
      { rule: "Всё равно, всё-таки", example: "Было трудно, но я всё равно сделал" },
      { rule: "Как ни..., но/а", example: "Как ни старался, не смог" }
    ],
    exercises: [
      "Расскажите о праздниках Узбекистана",
      "Составьте уступительные предложения",
      "Какой ваш любимый праздник?"
    ]
  },
  {
    id: 24,
    title: "Практическое занятие № 24",
    lexicalTopic: "Узбекистан в современном мире",
    grammarTopic: "Повторение. Итоговое занятие",
    vocabulary: [
      { russian: "государство", uzbek: "davlat" },
      { russian: "независимость", uzbek: "mustaqillik" },
      { russian: "развитие", uzbek: "rivojlanish" },
      { russian: "экономика", uzbek: "iqtisodiyot" },
      { russian: "политика", uzbek: "siyosat" },
      { russian: "сотрудничество", uzbek: "hamkorlik" },
      { russian: "международный", uzbek: "xalqaro" },
      { russian: "дипломатия", uzbek: "diplomatiya" },
      { russian: "партнёрство", uzbek: "sheriklik" },
      { russian: "будущее", uzbek: "kelajak" }
    ],
    grammarRules: [
      { rule: "Повторение падежей: И, Р, Д, В, Т, П", example: "Кто? Кого? Кому? Кого? Кем? О ком?" },
      { rule: "Повторение глаголов: виды, времена", example: "НСВ/СВ, настоящее/прошедшее/будущее" },
      { rule: "Повторение причастий и деепричастий", example: "читающий, прочитав" },
      { rule: "Повторение сложных предложений", example: "сложносочинённые и сложноподчинённые" },
      { rule: "Выражение различных отношений", example: "время, причина, цель, условие, уступка" }
    ],
    exercises: [
      "Расскажите об Узбекистане",
      "Выполните итоговый тест",
      "Подготовьте презентацию о своей специальности"
    ]
  }
];
