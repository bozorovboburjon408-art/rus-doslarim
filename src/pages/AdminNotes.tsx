import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { notesData as staticNotesData } from "@/data/notesData";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  FileText,
  Upload,
  LogOut,
  ArrowLeft,
} from "lucide-react";

interface VocabularyItem {
  russian: string;
  uzbek: string;
}

interface GrammarRule {
  rule: string;
  example: string;
}

interface Note {
  id: string;
  lesson_number: number;
  title: string;
  lexical_topic: string;
  grammar_topic: string;
  vocabulary: VocabularyItem[];
  grammar_rules: GrammarRule[];
  exercises: string[];
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

const emptyNote = {
  lesson_number: 1,
  title: "",
  lexical_topic: "",
  grammar_topic: "",
  vocabulary: [{ russian: "", uzbek: "" }],
  grammar_rules: [{ rule: "", example: "" }],
  exercises: [""],
  is_published: false,
};

const AdminNotes = () => {
  const navigate = useNavigate();
  const { isAdmin, isLoading: adminLoading, logout } = useAdmin();
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [formData, setFormData] = useState(emptyNote);
  const [adminPassword, setAdminPassword] = useState<string | null>(null);

  useEffect(() => {
    const storedPassword = sessionStorage.getItem("admin_password");
    if (storedPassword) {
      setAdminPassword(storedPassword);
    }
  }, []);

  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      navigate("/admin");
    }
  }, [isAdmin, adminLoading, navigate]);

  useEffect(() => {
    if (adminPassword) {
      fetchNotes();
    }
  }, [adminPassword]);

  const fetchNotes = async () => {
    if (!adminPassword) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-notes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ password: adminPassword, action: "list" }),
        }
      );

      const data = await response.json();
      if (data.success) {
        setNotes(data.data || []);
      } else {
        toast.error(data.error || "Konspektlarni yuklashda xatolik");
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
      toast.error("Xatolik yuz berdi");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSeedData = async () => {
    if (!adminPassword) return;
    
    setIsSeeding(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-notes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            password: adminPassword,
            action: "seed",
            noteData: { notesData: staticNotesData },
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        toast.success("24 ta konspekt muvaffaqiyatli yuklandi!");
        fetchNotes();
      } else {
        toast.error(data.error || "Yuklashda xatolik");
      }
    } catch (error) {
      console.error("Error seeding data:", error);
      toast.error("Xatolik yuz berdi");
    } finally {
      setIsSeeding(false);
    }
  };

  const handleSave = async () => {
    if (!adminPassword) return;
    
    if (!formData.title || !formData.lexical_topic || !formData.grammar_topic) {
      toast.error("Barcha maydonlarni to'ldiring");
      return;
    }

    setIsSaving(true);
    try {
      const action = editingNote ? "update" : "create";
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-notes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            password: adminPassword,
            action,
            noteData: formData,
            noteId: editingNote?.id,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        toast.success(editingNote ? "Konspekt yangilandi" : "Konspekt yaratildi");
        setIsDialogOpen(false);
        setEditingNote(null);
        setFormData(emptyNote);
        fetchNotes();
      } else {
        toast.error(data.error || "Saqlashda xatolik");
      }
    } catch (error) {
      console.error("Error saving note:", error);
      toast.error("Xatolik yuz berdi");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (noteId: string) => {
    if (!adminPassword) return;
    if (!confirm("Konspektni o'chirishni tasdiqlaysizmi?")) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-notes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            password: adminPassword,
            action: "delete",
            noteId,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        toast.success("Konspekt o'chirildi");
        fetchNotes();
      } else {
        toast.error(data.error || "O'chirishda xatolik");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Xatolik yuz berdi");
    }
  };

  const openEditDialog = (note: Note) => {
    setEditingNote(note);
    setFormData({
      lesson_number: note.lesson_number,
      title: note.title,
      lexical_topic: note.lexical_topic,
      grammar_topic: note.grammar_topic,
      vocabulary: note.vocabulary,
      grammar_rules: note.grammar_rules,
      exercises: note.exercises,
      is_published: note.is_published,
    });
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingNote(null);
    setFormData({
      ...emptyNote,
      lesson_number: notes.length + 1,
    });
    setIsDialogOpen(true);
  };

  const addVocabularyItem = () => {
    setFormData({
      ...formData,
      vocabulary: [...formData.vocabulary, { russian: "", uzbek: "" }],
    });
  };

  const updateVocabularyItem = (index: number, field: "russian" | "uzbek", value: string) => {
    const newVocabulary = [...formData.vocabulary];
    newVocabulary[index] = { ...newVocabulary[index], [field]: value };
    setFormData({ ...formData, vocabulary: newVocabulary });
  };

  const removeVocabularyItem = (index: number) => {
    setFormData({
      ...formData,
      vocabulary: formData.vocabulary.filter((_, i) => i !== index),
    });
  };

  const addGrammarRule = () => {
    setFormData({
      ...formData,
      grammar_rules: [...formData.grammar_rules, { rule: "", example: "" }],
    });
  };

  const updateGrammarRule = (index: number, field: "rule" | "example", value: string) => {
    const newRules = [...formData.grammar_rules];
    newRules[index] = { ...newRules[index], [field]: value };
    setFormData({ ...formData, grammar_rules: newRules });
  };

  const removeGrammarRule = (index: number) => {
    setFormData({
      ...formData,
      grammar_rules: formData.grammar_rules.filter((_, i) => i !== index),
    });
  };

  const addExercise = () => {
    setFormData({
      ...formData,
      exercises: [...formData.exercises, ""],
    });
  };

  const updateExercise = (index: number, value: string) => {
    const newExercises = [...formData.exercises];
    newExercises[index] = value;
    setFormData({ ...formData, exercises: newExercises });
  };

  const removeExercise = (index: number) => {
    setFormData({
      ...formData,
      exercises: formData.exercises.filter((_, i) => i !== index),
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  if (adminLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/notes")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Konspektlar boshqaruvi</h1>
              <p className="text-muted-foreground">Admin panel</p>
            </div>
          </div>
          <div className="flex gap-2">
            {notes.length === 0 && (
              <Button onClick={handleSeedData} disabled={isSeeding} variant="secondary">
                {isSeeding ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Upload className="h-4 w-4 mr-2" />
                )}
                24 ta konspektni yuklash
              </Button>
            )}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={openCreateDialog}>
                  <Plus className="h-4 w-4 mr-2" />
                  Yangi konspekt
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingNote ? "Konspektni tahrirlash" : "Yangi konspekt"}
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                  {/* Basic Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Dars raqami</Label>
                      <Input
                        type="number"
                        value={formData.lesson_number}
                        onChange={(e) =>
                          setFormData({ ...formData, lesson_number: parseInt(e.target.value) || 1 })
                        }
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={formData.is_published}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, is_published: checked })
                        }
                      />
                      <Label>Nashr qilingan</Label>
                    </div>
                  </div>

                  <div>
                    <Label>Sarlavha</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Практическое занятие № 1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Leksik mavzu</Label>
                      <Input
                        value={formData.lexical_topic}
                        onChange={(e) => setFormData({ ...formData, lexical_topic: e.target.value })}
                        placeholder="Знакомство. Рассказ о себе"
                      />
                    </div>
                    <div>
                      <Label>Grammatik mavzu</Label>
                      <Input
                        value={formData.grammar_topic}
                        onChange={(e) => setFormData({ ...formData, grammar_topic: e.target.value })}
                        placeholder="Фонетика. Алфавит"
                      />
                    </div>
                  </div>

                  {/* Vocabulary */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center justify-between">
                        Lug'at
                        <Button size="sm" variant="outline" onClick={addVocabularyItem}>
                          <Plus className="h-3 w-3 mr-1" /> Qo'shish
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {formData.vocabulary.map((item, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <Input
                            value={item.russian}
                            onChange={(e) => updateVocabularyItem(index, "russian", e.target.value)}
                            placeholder="Ruscha"
                            className="flex-1"
                          />
                          <Input
                            value={item.uzbek}
                            onChange={(e) => updateVocabularyItem(index, "uzbek", e.target.value)}
                            placeholder="O'zbekcha"
                            className="flex-1"
                          />
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => removeVocabularyItem(index)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Grammar Rules */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center justify-between">
                        Grammatik qoidalar
                        <Button size="sm" variant="outline" onClick={addGrammarRule}>
                          <Plus className="h-3 w-3 mr-1" /> Qo'shish
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {formData.grammar_rules.map((item, index) => (
                        <div key={index} className="flex gap-2 items-start">
                          <Textarea
                            value={item.rule}
                            onChange={(e) => updateGrammarRule(index, "rule", e.target.value)}
                            placeholder="Qoida"
                            className="flex-1"
                            rows={2}
                          />
                          <Textarea
                            value={item.example}
                            onChange={(e) => updateGrammarRule(index, "example", e.target.value)}
                            placeholder="Misol"
                            className="flex-1"
                            rows={2}
                          />
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => removeGrammarRule(index)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Exercises */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center justify-between">
                        Mashqlar
                        <Button size="sm" variant="outline" onClick={addExercise}>
                          <Plus className="h-3 w-3 mr-1" /> Qo'shish
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {formData.exercises.map((item, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <Input
                            value={item}
                            onChange={(e) => updateExercise(index, e.target.value)}
                            placeholder="Mashq"
                            className="flex-1"
                          />
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => removeExercise(index)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Bekor qilish
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                      {isSaving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                      Saqlash
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Chiqish
            </Button>
          </div>
        </div>

        {/* Notes List */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">#</TableHead>
                  <TableHead>Sarlavha</TableHead>
                  <TableHead>Leksik mavzu</TableHead>
                  <TableHead>Grammatik mavzu</TableHead>
                  <TableHead className="w-24">Holat</TableHead>
                  <TableHead className="w-24">Amallar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      Konspektlar topilmadi
                    </TableCell>
                  </TableRow>
                ) : (
                  notes.map((note) => (
                    <TableRow key={note.id}>
                      <TableCell className="font-medium">{note.lesson_number}</TableCell>
                      <TableCell>{note.title}</TableCell>
                      <TableCell className="text-muted-foreground">{note.lexical_topic}</TableCell>
                      <TableCell className="text-muted-foreground">{note.grammar_topic}</TableCell>
                      <TableCell>
                        <Badge variant={note.is_published ? "default" : "secondary"}>
                          {note.is_published ? "Nashr" : "Qoralama"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="icon" variant="ghost" onClick={() => openEditDialog(note)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDelete(note.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminNotes;
