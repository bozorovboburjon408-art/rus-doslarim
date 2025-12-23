import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, FileText, GraduationCap, MessageSquare, PenTool } from "lucide-react";

const notesData = [
  {
    title: "Алфавит и фонетика",
    icon: BookOpen,
    color: "from-primary to-primary/80",
    sections: [
      {
        subtitle: "Русский алфавит",
        content: "Русский алфавит состоит из 33 букв: 10 гласных (а, е, ё, и, о, у, ы, э, ю, я), 21 согласных и 2 знака (ъ, ь)."
      },
      {
        subtitle: "Гласные буквы",
        content: "А, О, У, Ы, Э - твёрдые гласные. Я, Ё, Ю, И, Е - мягкие гласные. Мягкие гласные смягчают предшествующий согласный."
      },
      {
        subtitle: "Согласные буквы",
        content: "Звонкие: б, в, г, д, ж, з. Глухие: п, ф, к, т, ш, с. Парные согласные могут оглушаться в конце слова."
      }
    ]
  },
  {
    title: "Существительные",
    icon: FileText,
    color: "from-secondary to-secondary/80",
    sections: [
      {
        subtitle: "Род существительных",
        content: "Мужской род: -∅, -й, -ь (стол, музей, день). Женский род: -а, -я, -ь (книга, земля, ночь). Средний род: -о, -е (окно, море)."
      },
      {
        subtitle: "Падежи",
        content: "И.п. (кто? что?), Р.п. (кого? чего?), Д.п. (кому? чему?), В.п. (кого? что?), Т.п. (кем? чем?), П.п. (о ком? о чём?)"
      },
      {
        subtitle: "Множественное число",
        content: "Мужской род: -ы/-и (столы, музеи). Женский род: -ы/-и (книги, земли). Средний род: -а/-я (окна, моря)."
      }
    ]
  },
  {
    title: "Глаголы",
    icon: PenTool,
    color: "from-primary to-primary/80",
    sections: [
      {
        subtitle: "Настоящее время",
        content: "I спряжение: -у/-ю, -ешь, -ет, -ем, -ете, -ут/-ют. II спряжение: -у/-ю, -ишь, -ит, -им, -ите, -ат/-ят."
      },
      {
        subtitle: "Прошедшее время",
        content: "Образуется от основы инфинитива + суффикс -л-. Мужской род: читал. Женский род: читала. Средний род: читало. Множ. число: читали."
      },
      {
        subtitle: "Будущее время",
        content: "Простое (сов. вид): прочитаю, напишу. Составное (несов. вид): буду + инфинитив (буду читать, буду писать)."
      }
    ]
  },
  {
    title: "Прилагательные",
    icon: GraduationCap,
    color: "from-secondary to-secondary/80",
    sections: [
      {
        subtitle: "Окончания прилагательных",
        content: "Мужской род: -ый/-ий/-ой (красный, синий, большой). Женский род: -ая/-яя (красная, синяя). Средний род: -ое/-ее (красное, синее)."
      },
      {
        subtitle: "Краткая форма",
        content: "Муж. род: красив. Жен. род: красива. Ср. род: красиво. Множ. число: красивы. Краткие прилагательные не склоняются."
      },
      {
        subtitle: "Степени сравнения",
        content: "Сравнительная: красивее, более красивый. Превосходная: красивейший, самый красивый, наиболее красивый."
      }
    ]
  },
  {
    title: "Полезные фразы",
    icon: MessageSquare,
    color: "from-primary to-primary/80",
    sections: [
      {
        subtitle: "Приветствия",
        content: "Здравствуйте! Привет! Доброе утро! Добрый день! Добрый вечер! Как дела? Как поживаете?"
      },
      {
        subtitle: "Прощания",
        content: "До свидания! Пока! До встречи! До завтра! Всего хорошего! Удачи! Спокойной ночи!"
      },
      {
        subtitle: "Благодарность и извинения",
        content: "Спасибо! Большое спасибо! Благодарю вас! Пожалуйста! Не за что! Извините! Простите! Ничего страшного!"
      }
    ]
  }
];

const Notes = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Конспекты</h1>
          <p className="text-muted-foreground">Краткие справочные материалы по русскому языку</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {notesData.map((note, index) => {
            const Icon = note.icon;
            return (
              <Card 
                key={note.title} 
                className="overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className={`bg-gradient-to-r ${note.color} text-white`}>
                  <CardTitle className="flex items-center gap-3">
                    <div className="rounded-lg bg-white/20 p-2">
                      <Icon className="h-5 w-5" />
                    </div>
                    {note.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {note.sections.map((section, sIdx) => (
                    <div 
                      key={section.subtitle}
                      className={`p-4 ${sIdx !== note.sections.length - 1 ? 'border-b border-border' : ''}`}
                    >
                      <h4 className="font-semibold text-foreground mb-2">{section.subtitle}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Notes;
