import { useState } from "react";
import { Header } from "@/components/Header";
import { Volume2, Search, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const vocabularyCategories = [
  {
    id: "greetings",
    name: "Приветствия",
    icon: "👋",
    words: [
      { russian: "Привет", uzbek: "Salom", pronunciation: "Привет", example: "Привет, как дела? - Salom, qanday ahvol?" },
      { russian: "Здравствуйте", uzbek: "Assalomu alaykum", pronunciation: "Здравствуйте", example: "Здравствуйте, меня зовут Анна. - Assalomu alaykum, mening ismim Anna." },
      { russian: "До свидания", uzbek: "Xayr", pronunciation: "До свидания", example: "До свидания, до завтра! - Xayr, ertaga ko'rishguncha!" },
      { russian: "Доброе утро", uzbek: "Xayrli tong", pronunciation: "Доброе утро", example: "Доброе утро! Как спалось? - Xayrli tong! Qanday uxladingiz?" },
      { russian: "Добрый вечер", uzbek: "Xayrli kech", pronunciation: "Добрый вечер", example: "Добрый вечер, друзья! - Xayrli kech, do'stlar!" },
    ],
  },
  {
    id: "numbers",
    name: "Числа",
    icon: "🔢",
    words: [
      { russian: "Один", uzbek: "Bir", pronunciation: "Один", example: "У меня один брат. - Mening bitta akam bor." },
      { russian: "Два", uzbek: "Ikki", pronunciation: "Два", example: "Два плюс два - четыре. - Ikki qo'shish ikki - to'rt." },
      { russian: "Три", uzbek: "Uch", pronunciation: "Три", example: "Три часа дня. - Kunduzi soat uch." },
      { russian: "Четыре", uzbek: "To'rt", pronunciation: "Четыре", example: "Четыре сезона года. - Yilning to'rt fasli." },
      { russian: "Пять", uzbek: "Besh", pronunciation: "Пять", example: "Пять пальцев на руке. - Qo'lda beshta barmoq." },
      { russian: "Десять", uzbek: "O'n", pronunciation: "Десять", example: "Десять минут. - O'n daqiqa." },
      { russian: "Сто", uzbek: "Yuz", pronunciation: "Сто", example: "Сто рублей. - Yuz rubl." },
    ],
  },
  {
    id: "family",
    name: "Семья",
    icon: "👨‍👩‍👧‍👦",
    words: [
      { russian: "Мама", uzbek: "Ona", pronunciation: "Мама", example: "Моя мама - учительница. - Mening onam o'qituvchi." },
      { russian: "Папа", uzbek: "Ota", pronunciation: "Папа", example: "Папа читает газету. - Ota gazeta o'qiyapti." },
      { russian: "Брат", uzbek: "Aka/Uka", pronunciation: "Брат", example: "Мой брат - студент. - Mening akam talaba." },
      { russian: "Сестра", uzbek: "Opa/Singil", pronunciation: "Сестра", example: "Сестра живёт в Москве. - Opam Moskvada yashaydi." },
      { russian: "Бабушка", uzbek: "Buvi", pronunciation: "Бабушка", example: "Бабушка готовит вкусно. - Buvi mazali ovqat tayyorlaydi." },
      { russian: "Дедушка", uzbek: "Bobo", pronunciation: "Дедушка", example: "Дедушка рассказывает истории. - Bobo hikoyalar aytib beradi." },
    ],
  },
  {
    id: "food",
    name: "Еда",
    icon: "🍽️",
    words: [
      { russian: "Хлеб", uzbek: "Non", pronunciation: "Хлеб", example: "Свежий хлеб очень вкусный. - Yangi non juda mazali." },
      { russian: "Вода", uzbek: "Suv", pronunciation: "Вода", example: "Дайте, пожалуйста, воды. - Iltimos, suv bering." },
      { russian: "Чай", uzbek: "Choy", pronunciation: "Чай", example: "Я люблю зелёный чай. - Men ko'k choyni yaxshi ko'raman." },
      { russian: "Мясо", uzbek: "Go'sht", pronunciation: "Мясо", example: "Мясо нужно хорошо варить. - Go'shtni yaxshi pishirish kerak." },
      { russian: "Рис", uzbek: "Guruch", pronunciation: "Рис", example: "Плов готовят из риса. - Palovni guruchdan tayyorlashadi." },
      { russian: "Яблоко", uzbek: "Olma", pronunciation: "Яблоко", example: "Красное яблоко сладкое. - Qizil olma shirin." },
    ],
  },
  {
    id: "colors",
    name: "Цвета",
    icon: "🎨",
    words: [
      { russian: "Красный", uzbek: "Qizil", pronunciation: "Красный", example: "Красный цветок. - Qizil gul." },
      { russian: "Синий", uzbek: "Ko'k", pronunciation: "Синий", example: "Синее небо. - Ko'k osmon." },
      { russian: "Зелёный", uzbek: "Yashil", pronunciation: "Зелёный", example: "Зелёная трава. - Yashil maysalar." },
      { russian: "Жёлтый", uzbek: "Sariq", pronunciation: "Жёлтый", example: "Жёлтое солнце. - Sariq quyosh." },
      { russian: "Белый", uzbek: "Oq", pronunciation: "Белый", example: "Белый снег. - Oq qor." },
      { russian: "Чёрный", uzbek: "Qora", pronunciation: "Чёрный", example: "Чёрная кошка. - Qora mushuk." },
    ],
  },
  {
    id: "days",
    name: "Дни недели",
    icon: "📅",
    words: [
      { russian: "Понедельник", uzbek: "Dushanba", pronunciation: "Понедельник", example: "В понедельник я работаю. - Dushanba kuni ishlayman." },
      { russian: "Вторник", uzbek: "Seshanba", pronunciation: "Вторник", example: "Во вторник у нас урок. - Seshanba kuni darsimiz bor." },
      { russian: "Среда", uzbek: "Chorshanba", pronunciation: "Среда", example: "Среда - середина недели. - Chorshanba - haftaning o'rtasi." },
      { russian: "Четверг", uzbek: "Payshanba", pronunciation: "Четверг", example: "В четверг идём в кино. - Payshanba kuni kinoga boramiz." },
      { russian: "Пятница", uzbek: "Juma", pronunciation: "Пятница", example: "Пятница - любимый день. - Juma - sevimli kun." },
      { russian: "Суббота", uzbek: "Shanba", pronunciation: "Суббота", example: "В субботу отдыхаем. - Shanba kuni dam olamiz." },
      { russian: "Воскресенье", uzbek: "Yakshanba", pronunciation: "Воскресенье", example: "Воскресенье - выходной. - Yakshanba - dam olish kuni." },
    ],
  },
];

const Vocabulary = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedWord, setExpandedWord] = useState<string | null>(null);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ru-RU";
    speechSynthesis.speak(utterance);
  };

  const currentCategory = vocabularyCategories.find((c) => c.id === selectedCategory);
  
  const filteredWords = currentCategory?.words.filter(
    (word) =>
      word.russian.toLowerCase().includes(searchQuery.toLowerCase()) ||
      word.uzbek.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Словарь</h1>
          <p className="text-muted-foreground">Изучайте самые употребляемые русские слова</p>
        </div>

        {!selectedCategory ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {vocabularyCategories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "group flex items-center gap-4 rounded-2xl bg-card p-6 text-left shadow-card transition-all duration-300",
                  "hover:shadow-xl hover:-translate-y-1 animate-fade-in"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-3xl">
                  {category.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.words.length} слов</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </button>
            ))}
          </div>
        ) : (
          <div>
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSearchQuery("");
              }}
              className="mb-6 flex items-center gap-2 text-primary hover:underline"
            >
              ← Вернуться к категориям
            </button>

            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-2xl">
                {currentCategory?.icon}
              </div>
              <h2 className="text-2xl font-bold text-foreground">{currentCategory?.name}</h2>
            </div>

            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Поиск слова..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 rounded-xl"
              />
            </div>

            <div className="space-y-3">
              {filteredWords?.map((word, index) => (
                <div
                  key={word.russian}
                  className={cn(
                    "rounded-2xl bg-card p-4 shadow-sm transition-all duration-300 animate-fade-in",
                    expandedWord === word.russian && "shadow-card"
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setExpandedWord(expandedWord === word.russian ? null : word.russian)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-xl font-bold text-foreground">{word.russian}</span>
                        <span className="text-sm text-muted-foreground">({word.pronunciation})</span>
                      </div>
                      <span className="text-lg text-primary font-medium">{word.uzbek}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speak(word.russian);
                      }}
                      className="rounded-full bg-primary/10 p-3 text-primary transition-colors hover:bg-primary/20"
                    >
                      <Volume2 className="h-5 w-5" />
                    </button>
                  </div>
                  
                  {expandedWord === word.russian && (
                    <div className="mt-4 pt-4 border-t border-border animate-fade-in">
                      <p className="text-sm font-medium text-muted-foreground mb-2">Пример:</p>
                      <p className="text-foreground bg-muted/50 rounded-lg p-3">{word.example}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Vocabulary;