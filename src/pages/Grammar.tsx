import { useState } from "react";
import { Header } from "@/components/Header";
import { Volume2, BookOpen, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const cyrillicAlphabet = [
  { letter: "А а", pronunciation: "a", example: "Арбуз (tarvuz)" },
  { letter: "Б б", pronunciation: "b", example: "Банан (banan)" },
  { letter: "В в", pronunciation: "v", example: "Вода (suv)" },
  { letter: "Г г", pronunciation: "g", example: "Город (shahar)" },
  { letter: "Д д", pronunciation: "d", example: "Дом (uy)" },
  { letter: "Е е", pronunciation: "ye", example: "Ель (archa)" },
  { letter: "Ё ё", pronunciation: "yo", example: "Ёж (kirpi)" },
  { letter: "Ж ж", pronunciation: "j", example: "Жук (qo'ng'iz)" },
  { letter: "З з", pronunciation: "z", example: "Зонт (soyabon)" },
  { letter: "И и", pronunciation: "i", example: "Игра (o'yin)" },
  { letter: "Й й", pronunciation: "y", example: "Йогурт (yogurt)" },
  { letter: "К к", pronunciation: "k", example: "Кот (mushuk)" },
  { letter: "Л л", pronunciation: "l", example: "Луна (oy)" },
  { letter: "М м", pronunciation: "m", example: "Мама (ona)" },
  { letter: "Н н", pronunciation: "n", example: "Нос (burun)" },
  { letter: "О о", pronunciation: "o", example: "Окно (deraza)" },
  { letter: "П п", pronunciation: "p", example: "Папа (ota)" },
  { letter: "Р р", pronunciation: "r", example: "Рука (qo'l)" },
  { letter: "С с", pronunciation: "s", example: "Солнце (quyosh)" },
  { letter: "Т т", pronunciation: "t", example: "Торт (tort)" },
  { letter: "У у", pronunciation: "u", example: "Утка (o'rdak)" },
  { letter: "Ф ф", pronunciation: "f", example: "Фрукт (meva)" },
  { letter: "Х х", pronunciation: "x", example: "Хлеб (non)" },
  { letter: "Ц ц", pronunciation: "ts", example: "Цветок (gul)" },
  { letter: "Ч ч", pronunciation: "ch", example: "Чай (choy)" },
  { letter: "Ш ш", pronunciation: "sh", example: "Школа (maktab)" },
  { letter: "Щ щ", pronunciation: "shch", example: "Щука (cho'rttan)" },
  { letter: "Ъ ъ", pronunciation: "qattiq belgi", example: "Объект (obyekt)" },
  { letter: "Ы ы", pronunciation: "ı (qattiq i)", example: "Рыба (baliq)" },
  { letter: "Ь ь", pronunciation: "yumshoq belgi", example: "Соль (tuz)" },
  { letter: "Э э", pronunciation: "e", example: "Эхо (aks-sado)" },
  { letter: "Ю ю", pronunciation: "yu", example: "Юла (g'ildirak)" },
  { letter: "Я я", pronunciation: "ya", example: "Яблоко (olma)" },
];

const grammarTopics = [
  {
    id: "nouns",
    title: "Otlar (Существительные)",
    icon: "📝",
    content: [
      {
        subtitle: "Jinsi bo'yicha",
        rules: [
          "Erkak jinsi: -ый, -ой, -ий tugaydi yoki undosh bilan tugaydi. Masalan: стол (stol), дом (uy), мальчик (o'g'il bola)",
          "Ayol jinsi: -а, -я, -ь tugaydi. Masalan: мама (ona), земля (yer), ночь (tun)",
          "O'rta jinsi: -о, -е tugaydi. Masalan: окно (deraza), море (dengiz), солнце (quyosh)",
        ],
      },
      {
        subtitle: "Ko'plik shakli",
        rules: [
          "Erkak va ayol jinsi: -ы, -и qo'shiladi. Masalan: стол → столы, книга → книги",
          "O'rta jinsi: -а, -я ga o'zgaradi. Masalan: окно → окна, море → моря",
          "Istisno so'zlar: человек → люди, ребёнок → дети",
        ],
      },
    ],
  },
  {
    id: "verbs",
    title: "Fe'llar (Глаголы)",
    icon: "🏃",
    content: [
      {
        subtitle: "Hozirgi zamon",
        rules: [
          "Я (men): -ю, -у. Masalan: я читаю (men o'qiyman), я пишу (men yozaman)",
          "Ты (sen): -ешь, -ишь. Masalan: ты читаешь, ты пишешь",
          "Он/она (u): -ет, -ит. Masalan: он читает, она пишет",
          "Мы (biz): -ем, -им. Masalan: мы читаем, мы пишем",
          "Вы (siz): -ете, -ите. Masalan: вы читаете, вы пишете",
          "Они (ular): -ют, -ут, -ат, -ят. Masalan: они читают, они пишут",
        ],
      },
      {
        subtitle: "O'tgan zamon",
        rules: [
          "Erkak jinsi: -л. Masalan: он читал (u o'qidi)",
          "Ayol jinsi: -ла. Masalan: она читала (u o'qidi)",
          "O'rta jinsi: -ло. Masalan: оно читало",
          "Ko'plik: -ли. Masalan: они читали (ular o'qishdi)",
        ],
      },
    ],
  },
  {
    id: "sentences",
    title: "Gap tuzilishi",
    icon: "💬",
    content: [
      {
        subtitle: "Oddiy gap tartibi",
        rules: [
          "Rus tilida gap tartibi: Ega + Kesim + Boshqa bo'laklar",
          "Masalan: Я читаю книгу (Men kitob o'qiyman)",
          "So'roq gaplar: intonatsiya orqali yoki so'roq so'zlari bilan",
          "Masalan: Ты читаешь? (Sen o'qiyapsanmi?) Что ты читаешь? (Nima o'qiyapsan?)",
        ],
      },
      {
        subtitle: "Bo'lishsiz gap",
        rules: [
          "Не so'zi fe'ldan oldin qo'yiladi",
          "Masalan: Я не читаю (Men o'qimayman)",
          "Masalan: Он не знает (U bilmaydi)",
        ],
      },
    ],
  },
  {
    id: "pronouns",
    title: "Olmoshlar (Местоимения)",
    icon: "👤",
    content: [
      {
        subtitle: "Shaxs olmoshlari",
        rules: [
          "Я - men, Ты - sen, Он - u (erkak), Она - u (ayol), Оно - u (narsa)",
          "Мы - biz, Вы - siz, Они - ular",
          "Вы - hurmat shakli ham bo'lishi mumkin",
        ],
      },
      {
        subtitle: "Egalik olmoshlari",
        rules: [
          "Мой/моя/моё - mening, Твой/твоя/твоё - sening",
          "Его - uning (erkak), Её - uning (ayol)",
          "Наш/наша/наше - bizning, Ваш/ваша/ваше - sizning",
          "Их - ularning",
        ],
      },
    ],
  },
];

const Grammar = () => {
  const [activeTab, setActiveTab] = useState<"alphabet" | "grammar">("alphabet");
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ru-RU";
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl animate-pulse-glow" />
          <div className="absolute right-10 top-20 h-32 w-32 rounded-full bg-secondary/15 blur-2xl animate-bounce-soft" />
          <div className="absolute left-1/3 bottom-0 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
          
          {/* Floating letters */}
          <div className="absolute left-[10%] top-[20%] text-6xl font-bold text-primary/10 animate-bounce-soft" style={{ animationDelay: "0s" }}>А</div>
          <div className="absolute right-[15%] top-[30%] text-5xl font-bold text-secondary/15 animate-bounce-soft" style={{ animationDelay: "0.5s" }}>Б</div>
          <div className="absolute left-[20%] bottom-[20%] text-4xl font-bold text-accent/10 animate-bounce-soft" style={{ animationDelay: "1s" }}>В</div>
          <div className="absolute right-[25%] bottom-[30%] text-5xl font-bold text-primary/10 animate-bounce-soft" style={{ animationDelay: "1.5s" }}>Г</div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            {/* Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm border border-primary/20 animate-fade-in">
              <BookOpen className="h-4 w-4" />
              33 ta harf • 4 ta mavzu
            </div>
            
            {/* Title with gradient */}
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl animate-fade-in" style={{ animationDelay: "100ms" }}>
              <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                Grammatika
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="mb-6 text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: "200ms" }}>
              Rus tili grammatikasi asoslarini o'rganing - alifbodan boshlab grammatik qoidalargacha
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-6 animate-fade-in" style={{ animationDelay: "300ms" }}>
              <div className="flex items-center gap-2 rounded-xl bg-card/80 backdrop-blur-sm px-4 py-2 shadow-sm">
                <span className="text-2xl">🔤</span>
                <div className="text-left">
                  <p className="text-lg font-bold text-foreground">33</p>
                  <p className="text-xs text-muted-foreground">Harflar</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-card/80 backdrop-blur-sm px-4 py-2 shadow-sm">
                <span className="text-2xl">📚</span>
                <div className="text-left">
                  <p className="text-lg font-bold text-foreground">4</p>
                  <p className="text-xs text-muted-foreground">Mavzu</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-card/80 backdrop-blur-sm px-4 py-2 shadow-sm">
                <span className="text-2xl">🎯</span>
                <div className="text-left">
                  <p className="text-lg font-bold text-foreground">15+</p>
                  <p className="text-xs text-muted-foreground">Qoidalar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8">

        {/* Tabs */}
        <div className="mb-8 flex gap-2">
          <button
            onClick={() => setActiveTab("alphabet")}
            className={cn(
              "rounded-xl px-6 py-3 font-medium transition-all",
              activeTab === "alphabet"
                ? "bg-primary text-primary-foreground shadow-soft"
                : "bg-card text-muted-foreground hover:bg-muted"
            )}
          >
            <BookOpen className="inline-block h-4 w-4 mr-2" />
            Rus alifbosi
          </button>
          <button
            onClick={() => setActiveTab("grammar")}
            className={cn(
              "rounded-xl px-6 py-3 font-medium transition-all",
              activeTab === "grammar"
                ? "bg-primary text-primary-foreground shadow-soft"
                : "bg-card text-muted-foreground hover:bg-muted"
            )}
          >
            📚 Grammatika qoidalari
          </button>
        </div>

        {activeTab === "alphabet" ? (
          <div>
            <div className="mb-6 rounded-xl bg-primary/5 p-4 border border-primary/20">
              <p className="text-sm text-foreground">
                💡 <strong>Maslahat:</strong> Harfni bosib talaffuzini eshiting. Rus alifbosida 33 ta harf bor.
              </p>
            </div>
            
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {cyrillicAlphabet.map((item, index) => (
                <button
                  key={item.letter}
                  onClick={() => speak(item.letter.split(" ")[0])}
                  className={cn(
                    "group flex items-center gap-4 rounded-xl bg-card p-4 text-left shadow-sm transition-all duration-300",
                    "hover:shadow-card hover:-translate-y-0.5 animate-fade-in"
                  )}
                  style={{ animationDelay: `${index * 20}ms` }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-xl font-bold text-primary">
                    {item.letter.split(" ")[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{item.letter}</span>
                      <span className="text-sm text-muted-foreground">[{item.pronunciation}]</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{item.example}</p>
                  </div>
                  <Volume2 className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {grammarTopics.map((topic, index) => (
              <div
                key={topic.id}
                className={cn(
                  "rounded-2xl bg-card shadow-sm overflow-hidden transition-all duration-300 animate-fade-in",
                  expandedTopic === topic.id && "shadow-card"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <button
                  onClick={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{topic.icon}</span>
                    <h3 className="text-xl font-semibold text-foreground">{topic.title}</h3>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 text-muted-foreground transition-transform duration-300",
                      expandedTopic === topic.id && "rotate-180"
                    )}
                  />
                </button>
                
                {expandedTopic === topic.id && (
                  <div className="border-t border-border px-6 pb-6 animate-fade-in">
                    {topic.content.map((section, idx) => (
                      <div key={idx} className="mt-4">
                        <h4 className="font-semibold text-primary mb-3">{section.subtitle}</h4>
                        <ul className="space-y-2">
                          {section.rules.map((rule, ruleIdx) => (
                            <li
                              key={ruleIdx}
                              className="flex items-start gap-2 text-foreground bg-muted/30 rounded-lg p-3"
                            >
                              <span className="text-primary mt-1">•</span>
                              <span>{rule}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Grammar;
