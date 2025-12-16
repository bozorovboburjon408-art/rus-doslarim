import { useState } from "react";
import { Header } from "@/components/Header";
import { BookOpen, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const grammarTopics = [
  {
    id: "cases",
    title: "Padejlar (Падежи)",
    icon: "📋",
    content: [
      {
        subtitle: "Именительный падеж (Bosh kelishik) - Ким? Нима?",
        rules: [
          "Gap egasi sifatida ishlatiladi",
          "Masalan: Мальчик читает (O'g'il bola o'qiyapti)",
          "Masalan: Книга лежит на столе (Kitob stolda yotibdi)",
        ],
      },
      {
        subtitle: "Родительный падеж (Qaratqich kelishik) - Кого? Чего?",
        rules: [
          "Egalik, yo'qlik, miqdor bildiradi",
          "Erkak jinsi: -а, -я. Masalan: брат → брата, учитель → учителя",
          "Ayol jinsi: -ы, -и. Masalan: сестра → сестры, книга → книги",
          "Masalan: У меня нет брата (Mening akam yo'q)",
        ],
      },
      {
        subtitle: "Дательный падеж (Jo'nalish kelishik) - Кому? Чему?",
        rules: [
          "Kimga/nimaga yo'nalganlikni bildiradi",
          "Erkak jinsi: -у, -ю. Masalan: брат → брату, учитель → учителю",
          "Ayol jinsi: -е. Masalan: сестра → сестре, мама → маме",
          "Masalan: Я дал книгу брату (Men akamga kitob berdim)",
        ],
      },
      {
        subtitle: "Винительный падеж (Tushum kelishik) - Кого? Что?",
        rules: [
          "To'g'ri to'ldiruvchi sifatida ishlatiladi",
          "Jonli erkak jinsi: -а, -я (qaratqich bilan bir xil)",
          "Jonsiz erkak jinsi: o'zgarmaydi (bosh kelishik bilan bir xil)",
          "Ayol jinsi: -у, -ю. Masalan: сестра → сестру, книга → книгу",
          "Masalan: Я вижу брата (Men akamni ko'ryapman)",
        ],
      },
      {
        subtitle: "Творительный падеж (Vosita kelishik) - Кем? Чем?",
        rules: [
          "Vosita, birga bo'lishni bildiradi",
          "Erkak jinsi: -ом, -ем. Masalan: брат → братом, учитель → учителем",
          "Ayol jinsi: -ой, -ей. Masalan: сестра → сестрой, книга → книгой",
          "Masalan: Я пишу ручкой (Men ruchka bilan yozyapman)",
        ],
      },
      {
        subtitle: "Предложный падеж (O'rin kelishik) - О ком? О чём? Где?",
        rules: [
          "Faqat predloglar bilan ishlatiladi (в, на, о, об)",
          "Erkak jinsi: -е. Masalan: брат → о брате, стол → на столе",
          "Ayol jinsi: -е. Masalan: сестра → о сестре, книга → в книге",
          "Masalan: Я думаю о маме (Men onam haqida o'ylayapman)",
        ],
      },
    ],
  },
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

// Cases summary table
const casesTable = [
  { case: "Именительный", question: "Кто? Что?", example: "брат, сестра", uzbek: "Bosh kelishik" },
  { case: "Родительный", question: "Кого? Чего?", example: "брата, сестры", uzbek: "Qaratqich" },
  { case: "Дательный", question: "Кому? Чему?", example: "брату, сестре", uzbek: "Jo'nalish" },
  { case: "Винительный", question: "Кого? Что?", example: "брата, сестру", uzbek: "Tushum" },
  { case: "Творительный", question: "Кем? Чем?", example: "братом, сестрой", uzbek: "Vosita" },
  { case: "Предложный", question: "О ком? О чём?", example: "о брате, о сестре", uzbek: "O'rin" },
];

const Grammar = () => {
  const [expandedTopic, setExpandedTopic] = useState<string | null>("cases");

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
          
          {/* Floating case names */}
          <div className="absolute left-[10%] top-[20%] text-4xl font-bold text-primary/10 animate-bounce-soft" style={{ animationDelay: "0s" }}>Им.</div>
          <div className="absolute right-[15%] top-[30%] text-3xl font-bold text-secondary/15 animate-bounce-soft" style={{ animationDelay: "0.5s" }}>Род.</div>
          <div className="absolute left-[20%] bottom-[20%] text-3xl font-bold text-accent/10 animate-bounce-soft" style={{ animationDelay: "1s" }}>Дат.</div>
          <div className="absolute right-[25%] bottom-[30%] text-4xl font-bold text-primary/10 animate-bounce-soft" style={{ animationDelay: "1.5s" }}>Вин.</div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            {/* Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm border border-primary/20 animate-fade-in">
              <BookOpen className="h-4 w-4" />
              6 ta padej • 5 ta mavzu
            </div>
            
            {/* Title with gradient */}
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl animate-fade-in" style={{ animationDelay: "100ms" }}>
              <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                Grammatika
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="mb-6 text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: "200ms" }}>
              Rus tili grammatikasi asoslarini o'rganing - padejlardan boshlab grammatik qoidalargacha
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-4 flex-wrap animate-fade-in" style={{ animationDelay: "300ms" }}>
              <div className="flex items-center gap-2 rounded-xl bg-card/80 backdrop-blur-sm px-4 py-2 shadow-sm">
                <span className="text-2xl">📋</span>
                <div className="text-left">
                  <p className="text-lg font-bold text-foreground">6</p>
                  <p className="text-xs text-muted-foreground">Padejlar</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-card/80 backdrop-blur-sm px-4 py-2 shadow-sm">
                <span className="text-2xl">📚</span>
                <div className="text-left">
                  <p className="text-lg font-bold text-foreground">5</p>
                  <p className="text-xs text-muted-foreground">Mavzu</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-card/80 backdrop-blur-sm px-4 py-2 shadow-sm">
                <span className="text-2xl">🎯</span>
                <div className="text-left">
                  <p className="text-lg font-bold text-foreground">20+</p>
                  <p className="text-xs text-muted-foreground">Qoidalar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8">
        {/* Cases Quick Reference Table */}
        <div className="mb-8 rounded-2xl bg-card p-6 shadow-card animate-fade-in">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="text-2xl">📋</span>
            Padejlar jadvali
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 font-semibold text-foreground">Padej</th>
                  <th className="text-left py-3 px-2 font-semibold text-foreground">Savol</th>
                  <th className="text-left py-3 px-2 font-semibold text-foreground">Misol</th>
                  <th className="text-left py-3 px-2 font-semibold text-foreground">O'zbekcha</th>
                </tr>
              </thead>
              <tbody>
                {casesTable.map((row, index) => (
                  <tr 
                    key={row.case} 
                    className={cn(
                      "border-b border-border/50 transition-colors hover:bg-muted/30",
                      index % 2 === 0 && "bg-muted/10"
                    )}
                  >
                    <td className="py-3 px-2 font-medium text-primary">{row.case}</td>
                    <td className="py-3 px-2 text-muted-foreground">{row.question}</td>
                    <td className="py-3 px-2 text-foreground">{row.example}</td>
                    <td className="py-3 px-2 text-secondary font-medium">{row.uzbek}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Grammar Topics */}
        <div className="space-y-4">
          {grammarTopics.map((topic, index) => (
            <div
              key={topic.id}
              className={cn(
                "rounded-2xl bg-card shadow-sm overflow-hidden transition-all duration-300 animate-fade-in",
                expandedTopic === topic.id && "shadow-card ring-2 ring-primary/20"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)}
                className={cn(
                  "flex w-full items-center justify-between p-6 text-left transition-colors",
                  expandedTopic === topic.id && "bg-primary/5"
                )}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{topic.icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{topic.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {topic.content.length} ta bo'lim
                    </p>
                  </div>
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
                      <h4 className="font-semibold text-primary mb-3 text-lg">{section.subtitle}</h4>
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
      </main>
    </div>
  );
};

export default Grammar;
