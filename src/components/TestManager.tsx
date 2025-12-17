import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Save, X, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface TestData {
  id?: string;
  title: string;
  description: string;
  questions: Question[];
  is_published: boolean;
}

interface TestManagerProps {
  test?: TestData;
  onSave: () => void;
  onCancel: () => void;
}

const TestManager = ({ test, onSave, onCancel }: TestManagerProps) => {
  const [title, setTitle] = useState(test?.title || "");
  const [description, setDescription] = useState(test?.description || "");
  const [questions, setQuestions] = useState<Question[]>(
    test?.questions || []
  );
  const [isPublished, setIsPublished] = useState(test?.is_published || false);
  const [isSaving, setIsSaving] = useState(false);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: ["", "", "", ""],
        correct: 0,
        explanation: "",
      },
    ]);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuestions(updated);
  };

  const updateOption = (qIndex: number, optIndex: number, value: string) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Test nomini kiriting");
      return;
    }

    if (questions.length === 0) {
      toast.error("Kamida bitta savol qo'shing");
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].question.trim()) {
        toast.error(`${i + 1}-savol matnini kiriting`);
        return;
      }
      if (questions[i].options.some((opt) => !opt.trim())) {
        toast.error(`${i + 1}-savol variantlarini to'ldiring`);
        return;
      }
    }

    setIsSaving(true);

    try {
      if (test?.id) {
        const { error } = await supabase
          .from("tests")
          .update({
            title,
            description,
            questions: questions as any,
            is_published: isPublished,
          })
          .eq("id", test.id);

        if (error) throw error;
        toast.success("Test yangilandi");
      } else {
        const { error } = await supabase.from("tests").insert({
          title,
          description,
          questions: questions as any,
          is_published: isPublished,
        });

        if (error) throw error;
        toast.success("Test yaratildi");
      }

      onSave();
    } catch (error: any) {
      toast.error(error.message || "Xatolik yuz berdi");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {test?.id ? "Testni tahrirlash" : "Yangi test"}
        </h2>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Test nomi</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masalan: Падежи бўйича тест"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Tavsif</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Test haqida qisqacha ma'lumot"
            rows={2}
          />
        </div>

        <div className="flex items-center gap-2">
          <Switch
            id="published"
            checked={isPublished}
            onCheckedChange={setIsPublished}
          />
          <Label htmlFor="published">Testni e'lon qilish</Label>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Savollar ({questions.length})</h3>
          <Button variant="outline" size="sm" onClick={addQuestion}>
            <Plus className="h-4 w-4 mr-1" />
            Savol qo'shish
          </Button>
        </div>

        {questions.map((q, qIndex) => (
          <div
            key={qIndex}
            className="rounded-xl border bg-card p-4 space-y-4"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <GripVertical className="h-4 w-4" />
                <span className="font-medium">{qIndex + 1}-savol</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeQuestion(qIndex)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Savol matni</Label>
              <Textarea
                value={q.question}
                onChange={(e) =>
                  updateQuestion(qIndex, "question", e.target.value)
                }
                placeholder="Savolni kiriting"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label>Javob variantlari</Label>
              <div className="grid gap-2">
                {q.options.map((opt, optIndex) => (
                  <div key={optIndex} className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateQuestion(qIndex, "correct", optIndex)}
                      className={cn(
                        "h-6 w-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
                        q.correct === optIndex
                          ? "border-accent bg-accent"
                          : "border-muted-foreground hover:border-accent"
                      )}
                    >
                      {q.correct === optIndex && (
                        <div className="h-2 w-2 rounded-full bg-accent-foreground" />
                      )}
                    </button>
                    <Input
                      value={opt}
                      onChange={(e) =>
                        updateOption(qIndex, optIndex, e.target.value)
                      }
                      placeholder={`${optIndex + 1}-variant`}
                    />
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                To'g'ri javobni tanlash uchun doirachani bosing
              </p>
            </div>

            <div className="space-y-2">
              <Label>Izoh (ixtiyoriy)</Label>
              <Input
                value={q.explanation}
                onChange={(e) =>
                  updateQuestion(qIndex, "explanation", e.target.value)
                }
                placeholder="Javob uchun izoh"
              />
            </div>
          </div>
        ))}

        {questions.length === 0 && (
          <div className="rounded-xl border border-dashed p-8 text-center">
            <p className="text-muted-foreground">Hali savollar yo'q</p>
            <Button variant="outline" className="mt-4" onClick={addQuestion}>
              <Plus className="h-4 w-4 mr-1" />
              Birinchi savolni qo'shish
            </Button>
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-4 border-t">
        <Button variant="outline" onClick={onCancel} className="flex-1">
          Bekor qilish
        </Button>
        <Button onClick={handleSave} disabled={isSaving} className="flex-1">
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saqlanmoqda..." : "Saqlash"}
        </Button>
      </div>
    </div>
  );
};

export default TestManager;
