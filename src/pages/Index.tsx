import { Link } from "react-router-dom";
import { BookOpen, GraduationCap, Sparkles, PenTool, FileCheck, ChevronRight } from "lucide-react";
import { Header } from "@/components/Header";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

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

// Floating elements for background
const floatingElements = [
  { text: "А", top: "10%", left: "5%", delay: "0s", size: "text-6xl" },
  { text: "Б", top: "20%", left: "85%", delay: "2s", size: "text-5xl" },
  { text: "В", top: "60%", left: "10%", delay: "4s", size: "text-4xl" },
  { text: "Г", top: "70%", left: "90%", delay: "6s", size: "text-5xl" },
  { text: "дом", top: "30%", left: "15%", delay: "3s", size: "text-3xl" },
  { text: "книга", top: "80%", left: "75%", delay: "5s", size: "text-2xl" },
  { text: "язык", top: "15%", left: "70%", delay: "1s", size: "text-3xl" },
  { text: "?", top: "50%", left: "5%", delay: "7s", size: "text-5xl" },
  { text: "!", top: "40%", left: "92%", delay: "8s", size: "text-4xl" },
  { text: "Д", top: "85%", left: "20%", delay: "9s", size: "text-4xl" },
];

const Index = () => {
  const [typedText, setTypedText] = useState("");
  const fullText = "легко";
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 150);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section with Animated Gradient */}
      <section className="relative overflow-hidden py-20">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 animated-gradient opacity-10" />
        
        {/* Floating Russian Letters */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {floatingElements.map((el, index) => (
            <div
              key={index}
              className={cn(
                "absolute font-bold text-primary/5 dark:text-primary/10 float-slow select-none",
                el.size
              )}
              style={{
                top: el.top,
                left: el.left,
                animationDelay: el.delay,
              }}
            >
              {el.text}
            </div>
          ))}
        </div>

        {/* Blur orbs */}
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-[100px] animate-pulse" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-secondary/20 blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-accent/10 blur-[80px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 px-5 py-2.5 text-sm font-medium text-primary animate-fade-in">
              <Sparkles className="h-4 w-4 animate-pulse" />
              Не забудьте выполнить ежедневные упражнения!
            </div>
            
            {/* Main Title with Typing Effect */}
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-foreground md:text-6xl animate-fade-in" style={{ animationDelay: "100ms" }}>
              Изучайте русский язык{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  {typedText}
                </span>
                <span className="animate-pulse text-primary">|</span>
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="mb-10 text-lg md:text-xl text-muted-foreground animate-fade-in leading-relaxed" style={{ animationDelay: "200ms" }}>
              Учите русский язык быстро и эффективно с интерактивными уроками, карточками слов и упражнениями
            </p>
            
            {/* CTA Button with Glow */}
            <Link to="/vocabulary">
              <Button 
                variant="hero" 
                size="lg" 
                className="animate-fade-in btn-glow text-lg px-8 py-6 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/25"
                style={{ animationDelay: "300ms" }}
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Начать обучение
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">

        {/* Sections Grid */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-foreground">Разделы</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <Link
                  key={section.path}
                  to={section.path}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl p-6 transition-all duration-500",
                    "bg-gradient-to-br shadow-card",
                    "hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]",
                    "animate-fade-in",
                    section.color,
                    section.textColor
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative z-10">
                    <div className="mb-4 inline-flex rounded-xl bg-white/20 p-3 backdrop-blur-sm transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold">{section.title}</h3>
                    <p className="text-sm opacity-90 mb-4">{section.description}</p>
                    <div className="flex items-center gap-1 text-sm font-medium">
                      <span>Начать</span>
                      <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
                    </div>
                  </div>
                  
                  {/* Decorative circle with enhanced animation */}
                  <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-white/10 transition-all duration-500 group-hover:scale-150 group-hover:bg-white/20" />
                  <div className="absolute -top-8 -left-8 h-24 w-24 rounded-full bg-white/5 transition-all duration-700 group-hover:scale-125" />
                </Link>
              );
            })}
          </div>
        </section>

        {/* Quick Info */}
        <section className="mt-12 rounded-2xl bg-card p-6 shadow-card hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-xl font-bold text-foreground mb-4">О приложении</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-start gap-3 p-3 rounded-xl transition-all duration-300 hover:bg-muted/50">
              <div className="rounded-lg bg-primary/10 p-2 text-primary transition-transform duration-300 hover:scale-110">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Большой словарь</h4>
                <p className="text-sm text-muted-foreground">100+ слов и выражений</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl transition-all duration-300 hover:bg-muted/50">
              <div className="rounded-lg bg-secondary/10 p-2 text-secondary transition-transform duration-300 hover:scale-110">
                <PenTool className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Упражнения</h4>
                <p className="text-sm text-muted-foreground">Практические задания</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl transition-all duration-300 hover:bg-muted/50">
              <div className="rounded-lg bg-accent/10 p-2 text-accent transition-transform duration-300 hover:scale-110">
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
            © 2024 Русский язык - Приложение для изучения русского языка
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;