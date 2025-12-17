import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/Header";
import { ShieldCheck, Mail, Lock, Loader2 } from "lucide-react";
import { toast } from "sonner";

const AdminAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn, signUp, user, isAdmin, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && user && isAdmin) {
      navigate("/tests");
    }
  }, [user, isAdmin, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Email va parolni kiriting");
      return;
    }

    if (password.length < 6) {
      toast.error("Parol kamida 6 ta belgidan iborat bo'lishi kerak");
      return;
    }

    setIsLoading(true);

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password);
        if (error) {
          if (error.message.includes("already registered")) {
            toast.error("Bu email allaqachon ro'yxatdan o'tgan");
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success("Ro'yxatdan o'tdingiz! Admin huquqlari berilishi kerak.");
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes("Invalid login")) {
            toast.error("Email yoki parol noto'g'ri");
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success("Tizimga kirdingiz!");
        }
      }
    } catch (err) {
      toast.error("Xatolik yuz berdi");
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
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
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Admin paneli
            </h1>
            <p className="text-muted-foreground">
              Test yaratish va boshqarish uchun tizimga kiring
            </p>
          </div>

          <div className="rounded-2xl bg-card p-6 shadow-card">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Parol</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                {isSignUp ? "Ro'yxatdan o'tish" : "Kirish"}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-primary hover:underline"
                disabled={isLoading}
              >
                {isSignUp
                  ? "Hisobingiz bormi? Kirish"
                  : "Hisobingiz yo'qmi? Ro'yxatdan o'tish"}
              </button>
            </div>
          </div>

          {user && !isAdmin && (
            <div className="mt-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <p className="text-sm text-amber-600 dark:text-amber-400 text-center">
                Siz tizimga kirdingiz, lekin admin huquqlaringiz yo'q. 
                Admin huquqlari berilishi kerak.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminAuth;
