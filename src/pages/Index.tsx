import { Link } from "react-router-dom";
import { BookOpen, GraduationCap, Sparkles, PenTool, FileCheck, ChevronRight } from "lucide-react";
import { Header } from "@/components/Header";
import { ProgressStats } from "@/components/ProgressStats";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sections = [
  {
    title: "Словарь",
    description: "Самые употребляемые русские слова и выражения",
    icon: BookOpen,
    path: "/vocabulary",
    color: "from-primary to-primary/80",
    textColor: "text-primary-foreground",
  },
  {
    title: "Грамматика",
    description: "Русский алфавит и грамматические правила",
    icon: GraduationCap,
    path: "/grammar",
    color: "from-secondary to-secondary/80",
    textColor: "text-secondary-foreground",
  },
  {
    title: "Упражнения",
    description: "Заполнение пропусков и выбор ответа",
    icon: PenTool,
    path: "/exercises",
    color: "from-primary to-primary/80",
    textColor: "text-primary-foreground",
  },
  {
    title: "Тесты",
    description: "Тесты по каждой теме с результатами",
    icon: FileCheck,
    path: "/tests",
    color: "from-secondary to-secondary/80",
    textColor: "text-secondary-foreground",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary animate-fade-in">
              <Sparkles className="h-4 w-4" />
              Не забудьте выполнить ежедневные упражнения!
            </div>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl animate-fade-in" style={{ animationDelay: "100ms" }}>
              Изучайте русский язык <span className="text-primary">легко</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: "200ms" }}>
              Учите русский язык быстро и эффективно с интерактивными уроками, карточками слов и упражнениями
            </p>
            <Link to="/vocabulary">
              <Button variant="hero" size="lg" className="animate-fade-in" style={{ animationDelay: "300ms" }}>
                Начать обучение
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-secondary/5 blur-3xl" />
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Progress Stats */}
        <section className="mb-10">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Ваши результаты</h2>
          <ProgressStats />
        </section>

        {/* Sections Grid */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-foreground">Разделы</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <Link
                  key={section.path}
                  to={section.path}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl p-6 transition-all duration-300",
                    "bg-gradient-to-br shadow-card hover:shadow-xl hover:-translate-y-1",
                    "animate-fade-in",
                    section.color,
                    section.textColor
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative z-10">
                    <div className="mb-4 inline-flex rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold">{section.title}</h3>
                    <p className="text-sm opacity-90 mb-4">{section.description}</p>
                    <div className="flex items-center gap-1 text-sm font-medium">
                      <span>Начать</span>
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                  
                  {/* Decorative circle */}
                  <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-white/10 transition-transform duration-300 group-hover:scale-110" />
                </Link>
              );
            })}
          </div>
        </section>

        {/* Quick Info */}
        <section className="mt-12 rounded-2xl bg-card p-6 shadow-card">
          <h3 className="text-xl font-bold text-foreground mb-4">О приложении</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Большой словарь</h4>
                <p className="text-sm text-muted-foreground">100+ слов и выражений</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-secondary/10 p-2 text-secondary">
                <PenTool className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Упражнения</h4>
                <p className="text-sm text-muted-foreground">Практические задания</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-accent/10 p-2 text-accent">
                <FileCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Интерактивные тесты</h4>
                <p className="text-sm text-muted-foreground">Проверка знаний</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 РусТил - Приложение для изучения русского языка
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;