import { Flame, BookOpen, Trophy, Clock } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay?: number;
}

function StatCard({ icon, value, label, delay = 0 }: StatCardProps) {
  return (
    <div 
      className="flex items-center gap-3 rounded-xl bg-card p-4 shadow-card animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="rounded-lg bg-primary/10 p-2 text-primary">
        {icon}
      </div>
      <div>
        <div className="text-xl font-bold text-foreground">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

export function ProgressStats() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <StatCard
        icon={<Flame className="h-5 w-5" />}
        value="7"
        label="Дней подряд"
        delay={0}
      />
      <StatCard
        icon={<BookOpen className="h-5 w-5" />}
        value="24"
        label="Изучено слов"
        delay={100}
      />
      <StatCard
        icon={<Trophy className="h-5 w-5" />}
        value="3"
        label="Завершено уроков"
        delay={200}
      />
      <StatCard
        icon={<Clock className="h-5 w-5" />}
        value="45 мин"
        label="Общее время"
        delay={300}
      />
    </div>
  );
}
