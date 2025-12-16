import { useState } from "react";
import { Header } from "@/components/Header";
import { Volume2, MessageCircle, ChevronRight, User, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const dialogues = [
  {
    id: "greeting",
    title: "Знакомство",
    icon: "👋",
    description: "Первое знакомство и приветствие",
    conversation: [
      { speaker: "A", russian: "Здравствуйте!", uzbek: "Assalomu alaykum!" },
      { speaker: "B", russian: "Здравствуйте! Как вас зовут?", uzbek: "Assalomu alaykum! Ismingiz nima?" },
      { speaker: "A", russian: "Меня зовут Алишер. А вас?", uzbek: "Mening ismim Alisher. Sizniki-chi?" },
      { speaker: "B", russian: "Меня зовут Анна. Очень приятно!", uzbek: "Mening ismim Anna. Tanishganimdan xursandman!" },
      { speaker: "A", russian: "Мне тоже очень приятно. Откуда вы?", uzbek: "Men ham xursandman. Siz qayerdansiz?" },
      { speaker: "B", russian: "Я из Москвы. А вы?", uzbek: "Men Moskvadanman. Siz-chi?" },
      { speaker: "A", russian: "Я из Ташкента.", uzbek: "Men Toshkentdanman." },
    ],
  },
  {
    id: "shopping",
    title: "В магазине",
    icon: "🛒",
    description: "Покупки и вопрос о цене",
    conversation: [
      { speaker: "A", russian: "Добрый день! Сколько стоит этот хлеб?", uzbek: "Hayrli kun! Bu non qancha turadi?" },
      { speaker: "B", russian: "Здравствуйте! Этот хлеб стоит пятьдесят рублей.", uzbek: "Assalomu alaykum! Bu non ellik rubl turadi." },
      { speaker: "A", russian: "А молоко есть?", uzbek: "Sut bormi?" },
      { speaker: "B", russian: "Да, есть. Вам какое? Литр или пол-литра?", uzbek: "Ha, bor. Sizga qaysi? Bir litrmi yoki yarim litrmi?" },
      { speaker: "A", russian: "Один литр, пожалуйста.", uzbek: "Bir litr, iltimos." },
      { speaker: "B", russian: "Вот, пожалуйста. С вас сто двадцать рублей.", uzbek: "Mana, marhamat. Sizdan 120 rubl." },
      { speaker: "A", russian: "Спасибо! До свидания!", uzbek: "Rahmat! Xayr!" },
    ],
  },
  {
    id: "restaurant",
    title: "В ресторане",
    icon: "🍽️",
    description: "Заказ еды",
    conversation: [
      { speaker: "A", russian: "Здравствуйте! Столик на двоих, пожалуйста.", uzbek: "Assalomu alaykum! Ikki kishilik stol, iltimos." },
      { speaker: "B", russian: "Конечно! Вот меню.", uzbek: "Albatta! Mana menyu." },
      { speaker: "A", russian: "Спасибо. Что вы рекомендуете?", uzbek: "Rahmat. Nima tavsiya qilasiz?" },
      { speaker: "B", russian: "Сегодня очень вкусный борщ.", uzbek: "Bugun borscht juda mazali." },
      { speaker: "A", russian: "Хорошо, два борща и хлеб.", uzbek: "Yaxshi, ikkita borscht va non." },
      { speaker: "B", russian: "Что будете пить?", uzbek: "Nima ichasiz?" },
      { speaker: "A", russian: "Два чая, пожалуйста.", uzbek: "Ikkita choy, iltimos." },
      { speaker: "B", russian: "Хорошо, подождите, пожалуйста.", uzbek: "Yaxshi, kutib turing, iltimos." },
    ],
  },
  {
    id: "directions",
    title: "Спросить дорогу",
    icon: "🗺️",
    description: "Найти нужное место",
    conversation: [
      { speaker: "A", russian: "Извините, как пройти к метро?", uzbek: "Kechirasiz, metroga qanday borsa bo'ladi?" },
      { speaker: "B", russian: "Идите прямо, потом поверните налево.", uzbek: "To'g'ri boring, keyin chapga buriling." },
      { speaker: "A", russian: "Это далеко?", uzbek: "Bu uzoqmi?" },
      { speaker: "B", russian: "Нет, пять минут пешком.", uzbek: "Yo'q, piyoda besh daqiqa." },
      { speaker: "A", russian: "А автобусная остановка где?", uzbek: "Avtobus bekati qayerda?" },
      { speaker: "B", russian: "Остановка напротив магазина.", uzbek: "Bekat do'konning qarshisida." },
      { speaker: "A", russian: "Спасибо большое!", uzbek: "Katta rahmat!" },
      { speaker: "B", russian: "Пожалуйста!", uzbek: "Arzimaydi!" },
    ],
  },
  {
    id: "phone",
    title: "Телефонный звонок",
    icon: "📞",
    description: "Разговор по телефону",
    conversation: [
      { speaker: "A", russian: "Алло! Здравствуйте!", uzbek: "Allo! Assalomu alaykum!" },
      { speaker: "B", russian: "Здравствуйте! Кто это?", uzbek: "Assalomu alaykum! Bu kim?" },
      { speaker: "A", russian: "Это Саша. Можно Олега?", uzbek: "Bu Sasha. Olegni chaqirsa bo'ladimi?" },
      { speaker: "B", russian: "Олега сейчас нет дома.", uzbek: "Oleg hozir uyda yo'q." },
      { speaker: "A", russian: "Когда он будет?", uzbek: "U qachon keladi?" },
      { speaker: "B", russian: "Вечером, после шести.", uzbek: "Kechqurun, oltidan keyin." },
      { speaker: "A", russian: "Хорошо, я перезвоню. Спасибо!", uzbek: "Yaxshi, qayta qo'ng'iroq qilaman. Rahmat!" },
    ],
  },
  {
    id: "doctor",
    title: "У врача",
    icon: "🏥",
    description: "Объяснить болезнь",
    conversation: [
      { speaker: "A", russian: "Здравствуйте, доктор.", uzbek: "Assalomu alaykum, doktor." },
      { speaker: "B", russian: "Здравствуйте. На что жалуетесь?", uzbek: "Assalomu alaykum. Nima shikoyatingiz bor?" },
      { speaker: "A", russian: "У меня болит голова и горло.", uzbek: "Boshim va tomog'im og'riyapti." },
      { speaker: "B", russian: "Давно болит?", uzbek: "Qachondan beri og'riyapti?" },
      { speaker: "A", russian: "Два дня.", uzbek: "Ikki kundan beri." },
      { speaker: "B", russian: "Температура есть?", uzbek: "Isitmangiz bormi?" },
      { speaker: "A", russian: "Да, тридцать семь и пять.", uzbek: "Ha, 37,5." },
      { speaker: "B", russian: "Вам нужно лежать и пить много воды.", uzbek: "Sizga yotish va ko'p suv ichish kerak." },
    ],
  },
];

const Dialogues = () => {
  const [selectedDialogue, setSelectedDialogue] = useState<string | null>(null);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ru-RU";
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  };

  const speakAll = () => {
    const dialogue = dialogues.find((d) => d.id === selectedDialogue);
    if (!dialogue) return;
    
    dialogue.conversation.forEach((line, index) => {
      setTimeout(() => {
        speak(line.russian);
      }, index * 3000);
    });
  };

  const currentDialogue = dialogues.find((d) => d.id === selectedDialogue);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Диалоги</h1>
          <p className="text-muted-foreground">Изучайте повседневные разговоры</p>
        </div>

        {!selectedDialogue ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dialogues.map((dialogue, index) => (
              <button
                key={dialogue.id}
                onClick={() => setSelectedDialogue(dialogue.id)}
                className={cn(
                  "group flex flex-col rounded-2xl bg-card p-6 text-left shadow-card transition-all duration-300",
                  "hover:shadow-xl hover:-translate-y-1 animate-fade-in"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-4xl">{dialogue.icon}</span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{dialogue.title}</h3>
                <p className="text-sm text-muted-foreground">{dialogue.description}</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <MessageCircle className="h-4 w-4" />
                  <span>{dialogue.conversation.length} реплик</span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <button
                onClick={() => setSelectedDialogue(null)}
                className="flex items-center gap-2 text-primary hover:underline"
              >
                ← Вернуться к списку диалогов
              </button>
              <button
                onClick={speakAll}
                className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Volume2 className="h-4 w-4" />
                Прослушать всё
              </button>
            </div>

            <div className="mb-6 flex items-center gap-4">
              <span className="text-4xl">{currentDialogue?.icon}</span>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{currentDialogue?.title}</h2>
                <p className="text-muted-foreground">{currentDialogue?.description}</p>
              </div>
            </div>

            <div className="space-y-4">
              {currentDialogue?.conversation.map((line, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex gap-4 animate-fade-in",
                    line.speaker === "B" && "flex-row-reverse"
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                      line.speaker === "A" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                    )}
                  >
                    {line.speaker === "A" ? <User className="h-5 w-5" /> : <Users className="h-5 w-5" />}
                  </div>
                  <div
                    className={cn(
                      "flex-1 rounded-2xl p-4",
                      line.speaker === "A" ? "bg-primary/10 rounded-tl-none" : "bg-secondary/20 rounded-tr-none"
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-foreground text-lg">{line.russian}</p>
                        <p className="text-muted-foreground mt-1">{line.uzbek}</p>
                      </div>
                      <button
                        onClick={() => speak(line.russian)}
                        className="shrink-0 rounded-full bg-background p-2 text-primary shadow-sm hover:bg-muted transition-colors"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dialogues;