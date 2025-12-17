import { useState } from "react";
import { Header } from "@/components/Header";
import { BookOpen, ChevronDown, TableProperties, FileText, Zap, MessageSquare, User, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Case colors for distinct styling
const caseColors = [
  { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-600 dark:text-blue-400", accent: "bg-blue-500", ring: "ring-blue-500/20" },
  { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-600 dark:text-emerald-400", accent: "bg-emerald-500", ring: "ring-emerald-500/20" },
  { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-600 dark:text-amber-400", accent: "bg-amber-500", ring: "ring-amber-500/20" },
  { bg: "bg-rose-500/10", border: "border-rose-500/30", text: "text-rose-600 dark:text-rose-400", accent: "bg-rose-500", ring: "ring-rose-500/20" },
  { bg: "bg-violet-500/10", border: "border-violet-500/30", text: "text-violet-600 dark:text-violet-400", accent: "bg-violet-500", ring: "ring-violet-500/20" },
  { bg: "bg-cyan-500/10", border: "border-cyan-500/30", text: "text-cyan-600 dark:text-cyan-400", accent: "bg-cyan-500", ring: "ring-cyan-500/20" },
];

const grammarTopics: Array<{
  id: string;
  title: string;
  icon: LucideIcon;
  iconColor: string;
  content: Array<{ subtitle: string; rules: string[]; colorIndex?: number }>;
}> = [
  {
    id: "cases",
    title: "Падежи",
    icon: TableProperties,
    iconColor: "text-blue-500",
    content: [
      {
        subtitle: "Именительный падеж - Кто? Что?",
        colorIndex: 0,
        rules: [
          "Используется как подлежащее в предложении",
          "Например: Мальчик читает",
          "Например: Книга лежит на столе",
          "🔗 Предлоги: не используются (именительный падеж - начальная форма слова)",
        ],
      },
      {
        subtitle: "Родительный падеж - Кого? Чего?",
        colorIndex: 1,
        rules: [
          "Обозначает принадлежность, отсутствие, количество",
          "Мужской род: -а, -я. Например: брат → брата, учитель → учителя",
          "Женский род: -ы, -и. Например: сестра → сестры, книга → книги",
          "Например: У меня нет брата",
          "🔗 Предлоги: без, для, до, из, из-за, из-под, кроме, от, около, после, ради, среди, у",
        ],
      },
      {
        subtitle: "Дательный падеж - Кому? Чему?",
        colorIndex: 2,
        rules: [
          "Обозначает направление действия к кому/чему-либо",
          "Мужской род: -у, -ю. Например: брат → брату, учитель → учителю",
          "Женский род: -е. Например: сестра → сестре, мама → маме",
          "Например: Я дал книгу брату",
          "🔗 Предлоги: к, по, благодаря, вопреки, согласно, навстречу, подобно",
        ],
      },
      {
        subtitle: "Винительный падеж - Кого? Что?",
        colorIndex: 3,
        rules: [
          "Используется как прямое дополнение",
          "Одушевлённый мужской род: -а, -я (как родительный)",
          "Неодушевлённый мужской род: не изменяется (как именительный)",
          "Женский род: -у, -ю. Например: сестра → сестру, книга → книгу",
          "Например: Я вижу брата",
          "🔗 Предлоги: в, на, за, под, про, через, сквозь, несмотря на",
        ],
      },
      {
        subtitle: "Творительный падеж - Кем? Чем?",
        colorIndex: 4,
        rules: [
          "Обозначает инструмент, совместность",
          "Мужской род: -ом, -ем. Например: брат → братом, учитель → учителем",
          "Женский род: -ой, -ей. Например: сестра → сестрой, книга → книгой",
          "Например: Я пишу ручкой",
          "🔗 Предлоги: с (со), за, под, над, перед, между, рядом с",
        ],
      },
      {
        subtitle: "Предложный падеж - О ком? О чём? Где?",
        colorIndex: 5,
        rules: [
          "Используется только с предлогами (в, на, о, об)",
          "Мужской род: -е. Например: брат → о брате, стол → на столе",
          "Женский род: -е. Например: сестра → о сестре, книга → в книге",
          "Например: Я думаю о маме",
          "🔗 Предлоги: в, на, о (об, обо), при",
        ],
      },
    ],
  },
  {
    id: "nouns",
    title: "Существительные",
    icon: FileText,
    iconColor: "text-green-500",
    content: [
      {
        subtitle: "Род существительных",
        colorIndex: 0,
        rules: [
          "Мужской род: оканчивается на согласную или -й. Например: стол, дом, мальчик",
          "Женский род: оканчивается на -а, -я, -ь. Например: мама, земля, ночь",
          "Средний род: оканчивается на -о, -е. Например: окно, море, солнце",
        ],
      },
      {
        subtitle: "Множественное число",
        colorIndex: 1,
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
    icon: Zap,
    iconColor: "text-orange-500",
    content: [
      {
        subtitle: "Настоящее время",
        colorIndex: 2,
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
        colorIndex: 3,
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
    icon: MessageSquare,
    iconColor: "text-purple-500",
    content: [
      {
        subtitle: "Порядок слов в предложении",
        colorIndex: 4,
        rules: [
          "В русском языке: Подлежащее + Сказуемое + Другие члены",
          "Например: Я читаю книгу",
          "Вопросительные предложения: с помощью интонации или вопросительных слов",
          "Например: Ты читаешь? Что ты читаешь?",
        ],
      },
      {
        subtitle: "Отрицательные предложения",
        colorIndex: 5,
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
    icon: User,
    iconColor: "text-pink-500",
    content: [
      {
        subtitle: "Личные местоимения",
        colorIndex: 0,
        rules: [
          "Я, Ты, Он, Она, Оно",
          "Мы, Вы, Они",
          "«Вы» также используется как форма вежливости",
        ],
      },
      {
        subtitle: "Притяжательные местоимения",
        colorIndex: 1,
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
  const [expandedCases, setExpandedCases] = useState<Set<number>>(new Set());

  const toggleCase = (index: number) => {
    setExpandedCases(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

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
                "rounded-2xl bg-card shadow-sm overflow-hidden transition-all duration-500 animate-fade-in group",
                expandedTopic === topic.id 
                  ? "shadow-lg ring-2 ring-primary/30 scale-[1.01]" 
                  : "hover:shadow-md hover:scale-[1.005] hover:ring-1 hover:ring-primary/10"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)}
                className={cn(
                  "flex w-full items-center justify-between p-6 text-left transition-all duration-300",
                  expandedTopic === topic.id 
                    ? "bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" 
                    : "hover:bg-muted/30"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "p-3 rounded-xl transition-all duration-300",
                    expandedTopic === topic.id 
                      ? "bg-primary/20 scale-110 shadow-md" 
                      : "bg-muted/50 group-hover:bg-muted group-hover:scale-105",
                    topic.iconColor
                  )}>
                    <topic.icon className={cn(
                      "h-6 w-6 transition-transform duration-300",
                      expandedTopic === topic.id && "animate-pulse"
                    )} />
                  </div>
                  <div>
                    <h3 className={cn(
                      "text-xl font-semibold transition-colors duration-300",
                      expandedTopic === topic.id ? "text-primary" : "text-foreground group-hover:text-primary/80"
                    )}>{topic.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {topic.content.length} {topic.content.length === 1 ? "раздел" : topic.content.length < 5 ? "раздела" : "разделов"}
                    </p>
                  </div>
                </div>
                <div className={cn(
                  "p-2 rounded-full transition-all duration-300",
                  expandedTopic === topic.id 
                    ? "bg-primary/20 rotate-180" 
                    : "bg-muted/50 group-hover:bg-muted"
                )}>
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                </div>
              </button>
              
              <div className={cn(
                "grid transition-all duration-500 ease-in-out",
                expandedTopic === topic.id 
                  ? "grid-rows-[1fr] opacity-100" 
                  : "grid-rows-[0fr] opacity-0"
              )}>
                <div className="overflow-hidden">
                  <div className="border-t border-border px-6 pb-6 bg-gradient-to-b from-primary/5 to-transparent">
                    {topic.id === "cases" ? (
                      // Special rendering for cases - individual expandable items
                      <div className="grid gap-3 mt-6">
                        {topic.content.map((section, idx) => {
                          const colors = caseColors[section.colorIndex ?? idx % caseColors.length];
                          const isExpanded = expandedCases.has(idx);
                          return (
                            <div 
                              key={idx} 
                              className={cn(
                                "rounded-2xl overflow-hidden transition-all duration-500 animate-fade-in",
                                colors.border, "border-2", colors.ring, "ring-2",
                                isExpanded ? "shadow-xl scale-[1.01]" : "hover:shadow-lg hover:scale-[1.005]"
                              )}
                              style={{ animationDelay: `${idx * 80}ms` }}
                            >
                              <button
                                onClick={() => toggleCase(idx)}
                                className={cn(
                                  "w-full flex items-center justify-between p-4 transition-all duration-300",
                                  isExpanded ? colors.bg : "bg-card hover:bg-muted/30"
                                )}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg transition-all duration-300",
                                    colors.accent,
                                    isExpanded && "scale-110 shadow-lg"
                                  )}>
                                    {idx + 1}
                                  </div>
                                  <h4 className={cn(
                                    "font-bold text-base transition-all duration-300",
                                    isExpanded ? colors.text : "text-foreground"
                                  )}>
                                    {section.subtitle}
                                  </h4>
                                </div>
                                <div className={cn(
                                  "p-2 rounded-full transition-all duration-500",
                                  isExpanded ? `${colors.bg} rotate-180` : "bg-muted/50"
                                )}>
                                  <ChevronDown className={cn(
                                    "h-5 w-5 transition-colors duration-300",
                                    isExpanded ? colors.text : "text-muted-foreground"
                                  )} />
                                </div>
                              </button>
                              
                              <div className={cn(
                                "grid transition-all duration-500 ease-in-out",
                                isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                              )}>
                                <div className="overflow-hidden">
                                  <div className={cn("p-4 pt-0", colors.bg)}>
                                    <ul className="space-y-2">
                                      {section.rules.map((rule, ruleIdx) => (
                                        <li
                                          key={ruleIdx}
                                          className={cn(
                                            "flex items-start gap-2 text-sm text-foreground/90",
                                            "bg-background/60 backdrop-blur-sm rounded-xl p-3 transition-all duration-300",
                                            "hover:bg-background/80 hover:shadow-sm hover:translate-x-1",
                                            isExpanded && "animate-fade-in"
                                          )}
                                          style={{ animationDelay: `${ruleIdx * 60}ms` }}
                                        >
                                          <span className={cn("mt-0.5 transition-transform", colors.text, isExpanded && "animate-pulse")}>
                                            {rule.startsWith("📌") ? "" : rule.startsWith("🔗") ? "" : "•"}
                                          </span>
                                          <span className="leading-relaxed">{rule}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      // Regular rendering for other topics
                      <div className={cn(
                        "grid gap-4 mt-6",
                        topic.content.length > 2 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"
                      )}>
                        {topic.content.map((section, idx) => {
                          const colors = caseColors[section.colorIndex ?? idx % caseColors.length];
                          return (
                            <div 
                              key={idx} 
                              className={cn(
                                "rounded-2xl p-5 animate-fade-in transition-all duration-300",
                                "hover:scale-[1.02] hover:shadow-lg cursor-default",
                                colors.bg, colors.border, "border-2", colors.ring, "ring-2"
                              )}
                              style={{ animationDelay: `${idx * 100}ms` }}
                            >
                              <div className="flex items-center gap-3 mb-4">
                                <div className={cn("w-3 h-3 rounded-full", colors.accent)} />
                                <h4 className={cn("font-bold text-base", colors.text)}>
                                  {section.subtitle}
                                </h4>
                              </div>
                              <ul className="space-y-2">
                                {section.rules.map((rule, ruleIdx) => (
                                  <li
                                    key={ruleIdx}
                                    className={cn(
                                      "flex items-start gap-2 text-sm text-foreground/90 animate-fade-in",
                                      "bg-background/50 rounded-lg p-3 transition-all duration-200",
                                      "hover:bg-background/80"
                                    )}
                                    style={{ animationDelay: `${(idx * 100) + (ruleIdx * 50)}ms` }}
                                  >
                                    <span className={cn("mt-0.5", colors.text)}>•</span>
                                    <span className="leading-relaxed">{rule}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Grammar;
