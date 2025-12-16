import { useState } from "react";
import { Header } from "@/components/Header";
import { BookOpen, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const grammarTopics = [
  {
    id: "cases",
    title: "Падежи",
    icon: "📋",
    content: [
      {
        subtitle: "Именительный падеж - Кто? Что?",
        rules: [
          "Используется как подлежащее в предложении",
          "Например: Мальчик читает",
          "Например: Книга лежит на столе",
        ],
      },
      {
        subtitle: "Родительный падеж - Кого? Чего?",
        rules: [
          "Обозначает принадлежность, отсутствие, количество",
          "Мужской род: -а, -я. Например: брат → брата, учитель → учителя",
          "Женский род: -ы, -и. Например: сестра → сестры, книга → книги",
          "Например: У меня нет брата",
        ],
      },
      {
        subtitle: "Дательный падеж - Кому? Чему?",
        rules: [
          "Обозначает направление действия к кому/чему-либо",
          "Мужской род: -у, -ю. Например: брат → брату, учитель → учителю",
          "Женский род: -е. Например: сестра → сестре, мама → маме",
          "Например: Я дал книгу брату",
        ],
      },
      {
        subtitle: "Винительный падеж - Кого? Что?",
        rules: [
          "Используется как прямое дополнение",
          "Одушевлённый мужской род: -а, -я (как родительный)",
          "Неодушевлённый мужской род: не изменяется (как именительный)",
          "Женский род: -у, -ю. Например: сестра → сестру, книга → книгу",
          "Например: Я вижу брата",
        ],
      },
      {
        subtitle: "Творительный падеж - Кем? Чем?",
        rules: [
          "Обозначает инструмент, совместность",
          "Мужской род: -ом, -ем. Например: брат → братом, учитель → учителем",
          "Женский род: -ой, -ей. Например: сестра → сестрой, книга → книгой",
          "Например: Я пишу ручкой",
        ],
      },
      {
        subtitle: "Предложный падеж - О ком? О чём? Где?",
        rules: [
          "Используется только с предлогами (в, на, о, об)",
          "Мужской род: -е. Например: брат → о брате, стол → на столе",
          "Женский род: -е. Например: сестра → о сестре, книга → в книге",
          "Например: Я думаю о маме",
        ],
      },
    ],
  },
  {
    id: "nouns",
    title: "Существительные",
    icon: "📝",
    content: [
      {
        subtitle: "Род существительных",
        rules: [
          "Мужской род: оканчивается на согласную или -й. Например: стол, дом, мальчик",
          "Женский род: оканчивается на -а, -я, -ь. Например: мама, земля, ночь",
          "Средний род: оканчивается на -о, -е. Например: окно, море, солнце",
        ],
      },
      {
        subtitle: "Множественное число",
        rules: [
          "Мужской и женский род: добавляется -ы, -и. Например: стол → столы, книга → книги",
          "Средний род: меняется на -а, -я. Например: окно → окна, море → моря",
          "Исключения: человек → люди, ребёнок → дети",
        ],
      },
    ],
  },
  {
    id: "verbs",
    title: "Глаголы",
    icon: "🏃",
    content: [
      {
        subtitle: "Настоящее время",
        rules: [
          "Я: -ю, -у. Например: я читаю, я пишу",
          "Ты: -ешь, -ишь. Например: ты читаешь, ты пишешь",
          "Он/она: -ет, -ит. Например: он читает, она пишет",
          "Мы: -ем, -им. Например: мы читаем, мы пишем",
          "Вы: -ете, -ите. Например: вы читаете, вы пишете",
          "Они: -ют, -ут, -ат, -ят. Например: они читают, они пишут",
        ],
      },
      {
        subtitle: "Прошедшее время",
        rules: [
          "Мужской род: -л. Например: он читал",
          "Женский род: -ла. Например: она читала",
          "Средний род: -ло. Например: оно читало",
          "Множественное число: -ли. Например: они читали",
        ],
      },
    ],
  },
  {
    id: "sentences",
    title: "Построение предложений",
    icon: "💬",
    content: [
      {
        subtitle: "Порядок слов в предложении",
        rules: [
          "В русском языке: Подлежащее + Сказуемое + Другие члены",
          "Например: Я читаю книгу",
          "Вопросительные предложения: с помощью интонации или вопросительных слов",
          "Например: Ты читаешь? Что ты читаешь?",
        ],
      },
      {
        subtitle: "Отрицательные предложения",
        rules: [
          "Частица «не» ставится перед глаголом",
          "Например: Я не читаю",
          "Например: Он не знает",
        ],
      },
    ],
  },
  {
    id: "pronouns",
    title: "Местоимения",
    icon: "👤",
    content: [
      {
        subtitle: "Личные местоимения",
        rules: [
          "Я, Ты, Он, Она, Оно",
          "Мы, Вы, Они",
          "«Вы» также используется как форма вежливости",
        ],
      },
      {
        subtitle: "Притяжательные местоимения",
        rules: [
          "Мой/моя/моё, Твой/твоя/твоё",
          "Его, Её",
          "Наш/наша/наше, Ваш/ваша/ваше",
          "Их",
        ],
      },
    ],
  },
];


const Grammar = () => {
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl animate-pulse-glow" />
          <div className="absolute right-10 top-20 h-32 w-32 rounded-full bg-secondary/15 blur-2xl animate-bounce-soft" />
          <div className="absolute left-1/3 bottom-0 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
          
          <div className="absolute left-[10%] top-[20%] text-4xl font-bold text-primary/10 animate-bounce-soft" style={{ animationDelay: "0s" }}>Им.</div>
          <div className="absolute right-[15%] top-[30%] text-3xl font-bold text-secondary/15 animate-bounce-soft" style={{ animationDelay: "0.5s" }}>Род.</div>
          <div className="absolute left-[20%] bottom-[20%] text-3xl font-bold text-accent/10 animate-bounce-soft" style={{ animationDelay: "1s" }}>Дат.</div>
          <div className="absolute right-[25%] bottom-[30%] text-4xl font-bold text-primary/10 animate-bounce-soft" style={{ animationDelay: "1.5s" }}>Вин.</div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm border border-primary/20 animate-fade-in">
              <BookOpen className="h-4 w-4" />
              6 падежей • 5 тем
            </div>
            
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl animate-fade-in" style={{ animationDelay: "100ms" }}>
              <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                Грамматика
              </span>
            </h1>
            
            <p className="mb-6 text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: "200ms" }}>
              Изучайте основы русской грамматики - от падежей до грамматических правил
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap animate-fade-in" style={{ animationDelay: "300ms" }}>
              <div className="flex items-center gap-2 rounded-xl bg-card/80 backdrop-blur-sm px-4 py-2 shadow-sm">
                <span className="text-2xl">📋</span>
                <div className="text-left">
                  <p className="text-lg font-bold text-foreground">6</p>
                  <p className="text-xs text-muted-foreground">Падежей</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-card/80 backdrop-blur-sm px-4 py-2 shadow-sm">
                <span className="text-2xl">📚</span>
                <div className="text-left">
                  <p className="text-lg font-bold text-foreground">5</p>
                  <p className="text-xs text-muted-foreground">Тем</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-card/80 backdrop-blur-sm px-4 py-2 shadow-sm">
                <span className="text-2xl">🎯</span>
                <div className="text-left">
                  <p className="text-lg font-bold text-foreground">20+</p>
                  <p className="text-xs text-muted-foreground">Правил</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8">
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
                      {topic.content.length} {topic.content.length === 1 ? "раздел" : topic.content.length < 5 ? "раздела" : "разделов"}
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
